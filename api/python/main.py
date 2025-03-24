
from fastapi import FastAPI, Depends, HTTPException, Header, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import httpx
import logging
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="AdeptAI Integration API",
    description="API for integrating AdeptAI with third-party services like Ceipal and LinkedIn",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class JobListing(BaseModel):
    title: str
    description: str
    location: str
    company: str
    salary_range: Optional[str] = None
    job_type: Optional[str] = None
    requirements: Optional[List[str]] = None
    posting_date: Optional[datetime] = None
    closing_date: Optional[datetime] = None
    external_id: Optional[str] = None
    source: str

class Candidate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    resume_url: Optional[str] = None
    linkedin_profile: Optional[str] = None
    skills: List[str]
    experience: Optional[int] = None
    education: Optional[List[Dict[str, Any]]] = None
    preferred_job_types: Optional[List[str]] = None
    notes: Optional[str] = None

# API Key validation
async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != os.getenv("API_KEY", "test_api_key"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key"
        )
    return x_api_key

# Routes for Ceipal integration
@app.get("/api/v1/ceipal/jobs", response_model=List[JobListing])
async def get_ceipal_jobs(api_key: str = Depends(verify_api_key)):
    """Fetch job listings from Ceipal"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{os.getenv('CEIPAL_API_URL')}/jobs",
                headers={
                    "Authorization": f"Bearer {os.getenv('CEIPAL_API_KEY')}"
                }
            )
            response.raise_for_status()
            
            # Transform the data to our model format
            ceipal_jobs = response.json()
            return [
                JobListing(
                    title=job.get("jobTitle"),
                    description=job.get("description"),
                    location=job.get("location"),
                    company="AdeptAI",  # Default company
                    salary_range=job.get("compensationDetails"),
                    job_type=job.get("employmentType"),
                    requirements=job.get("requirements", []),
                    external_id=job.get("id"),
                    source="ceipal"
                )
                for job in ceipal_jobs.get("data", [])
            ]
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP Status Error: {e}")
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Error fetching jobs from Ceipal: {e.response.text}"
        )
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}"
        )

@app.post("/api/v1/ceipal/candidates", status_code=status.HTTP_201_CREATED)
async def post_candidate_to_ceipal(candidate: Candidate, api_key: str = Depends(verify_api_key)):
    """Send candidate data to Ceipal"""
    try:
        # Transform our model to Ceipal's expected format
        ceipal_candidate = {
            "firstName": candidate.name.split()[0],
            "lastName": " ".join(candidate.name.split()[1:]) if len(candidate.name.split()) > 1 else "",
            "email": candidate.email,
            "phone": candidate.phone,
            "resumeUrl": candidate.resume_url,
            "linkedinProfile": candidate.linkedin_profile,
            "skills": candidate.skills,
            "totalExperience": candidate.experience,
            "education": candidate.education,
            "notes": candidate.notes
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{os.getenv('CEIPAL_API_URL')}/candidates",
                headers={
                    "Authorization": f"Bearer {os.getenv('CEIPAL_API_KEY')}",
                    "Content-Type": "application/json"
                },
                json=ceipal_candidate
            )
            response.raise_for_status()
            return {"status": "success", "message": "Candidate submitted to Ceipal", "data": response.json()}
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP Status Error: {e}")
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Error posting candidate to Ceipal: {e.response.text}"
        )
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}"
        )

# Routes for LinkedIn integration
@app.get("/api/v1/linkedin/jobs", response_model=List[JobListing])
async def get_linkedin_jobs(api_key: str = Depends(verify_api_key)):
    """Fetch job listings from LinkedIn"""
    try:
        # Implementation would require OAuth2 flow with LinkedIn
        # This is a simplified example
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.linkedin.com/v2/jobs",
                headers={
                    "Authorization": f"Bearer {os.getenv('LINKEDIN_ACCESS_TOKEN')}"
                }
            )
            response.raise_for_status()
            
            # Transform LinkedIn data to our model
            linkedin_jobs = response.json()
            return [
                JobListing(
                    title=job.get("title"),
                    description=job.get("description", {}).get("text", ""),
                    location=job.get("locationName", ""),
                    company=job.get("companyName", "AdeptAI"),
                    job_type=job.get("employmentStatus", ""),
                    external_id=job.get("id"),
                    source="linkedin"
                )
                for job in linkedin_jobs.get("elements", [])
            ]
    except Exception as e:
        logger.error(f"LinkedIn API error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching LinkedIn jobs: {str(e)}"
        )

@app.post("/api/v1/linkedin/jobs", status_code=status.HTTP_201_CREATED)
async def post_job_to_linkedin(job: JobListing, api_key: str = Depends(verify_api_key)):
    """Post a job to LinkedIn"""
    try:
        # Transform our model to LinkedIn's expected format
        linkedin_job = {
            "title": job.title,
            "description": {"text": job.description},
            "locationName": job.location,
            "employmentStatus": job.job_type
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.linkedin.com/v2/jobs",
                headers={
                    "Authorization": f"Bearer {os.getenv('LINKEDIN_ACCESS_TOKEN')}",
                    "Content-Type": "application/json"
                },
                json=linkedin_job
            )
            response.raise_for_status()
            return {"status": "success", "message": "Job posted to LinkedIn", "data": response.json()}
    except Exception as e:
        logger.error(f"LinkedIn API error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error posting job to LinkedIn: {str(e)}"
        )

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
