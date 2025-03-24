
# AdeptAI Integration API (Python)

This is a Python-based API for integrating AdeptAI platform with third-party services like Ceipal and LinkedIn.

## Setup Instructions

1. Install Python 3.8+ if not already installed
2. Install dependencies: `pip install -r requirements.txt`
3. Run the API server: `uvicorn main:app --reload`
4. API will be available at http://localhost:8000
5. Documentation will be available at http://localhost:8000/docs

## Configuration

Create a `.env` file with the following settings:

```
CEIPAL_API_KEY=your_ceipal_api_key
CEIPAL_API_URL=https://api.ceipal.com/v1
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

## Endpoints

- `/api/v1/ceipal/jobs`: Fetch and sync jobs from Ceipal
- `/api/v1/ceipal/candidates`: Send candidate data to Ceipal
- `/api/v1/linkedin/jobs`: Fetch and post jobs to LinkedIn
- `/api/v1/linkedin/profile`: Get profile information from LinkedIn

## Security

- All endpoints require API key authentication
- LinkedIn authentication uses OAuth 2.0
