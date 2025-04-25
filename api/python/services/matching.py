
from typing import List, Optional, Dict
from pydantic import BaseModel
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class MatchingOptions(BaseModel):
    matchingModel: str
    weightSkills: float
    weightExperience: float
    weightEducation: float
    threshold: float
    includePartialMatches: bool
    minMatchScore: float
    useComplianceVerification: bool
    prioritizeCulturalFit: bool
    useSemanticMatching: bool
    useRAG: bool
    useSkillBasedFiltering: bool
    targetSources: Optional[List[str]]
    model: Optional[str]

class Candidate(BaseModel):
    id: str
    name: str
    skills: List[str]
    experience: float
    education: str
    location: str
    match_score: Optional[float] = None
    source: str

def calculate_skill_match(candidate_skills: List[str], required_skills: List[str]) -> float:
    """Calculate skill match score using TF-IDF and cosine similarity"""
    if not candidate_skills or not required_skills:
        return 0.0
        
    # Convert skills lists to space-separated strings
    candidate_text = " ".join(candidate_skills)
    required_text = " ".join(required_skills)
    
    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer()
    try:
        tfidf_matrix = vectorizer.fit_transform([candidate_text, required_text])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return float(similarity)
    except:
        return 0.0

def semantic_matching(candidate_text: str, job_description: str) -> float:
    """Semantic matching using TF-IDF and cosine similarity"""
    vectorizer = TfidfVectorizer()
    try:
        tfidf_matrix = vectorizer.fit_transform([candidate_text, job_description])
        return float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0])
    except:
        return 0.0

def match_candidates(
    candidates: List[Candidate],
    job_description: str,
    required_skills: List[str],
    options: MatchingOptions
) -> List[Candidate]:
    """Match candidates based on provided options and return scored results"""
    
    matched_candidates = []
    
    for candidate in candidates:
        total_score = 0.0
        weights_sum = 0.0
        
        # Skills matching
        if options.useSkillBasedFiltering:
            skill_score = calculate_skill_match(candidate.skills, required_skills)
            total_score += skill_score * options.weightSkills
            weights_sum += options.weightSkills
            
        # Semantic matching if enabled
        if options.useSemanticMatching:
            candidate_text = f"{' '.join(candidate.skills)} {candidate.education}"
            semantic_score = semantic_matching(candidate_text, job_description)
            total_score += semantic_score * 0.3  # 30% weight for semantic matching
            weights_sum += 0.3
            
        # Experience matching
        experience_score = min(1.0, candidate.experience / 10.0)  # Normalize to 0-1
        total_score += experience_score * options.weightExperience
        weights_sum += options.weightExperience
        
        # Normalize final score
        if weights_sum > 0:
            final_score = (total_score / weights_sum) * 100
        else:
            final_score = 0
            
        # Apply minimum score threshold
        if final_score >= options.minMatchScore:
            candidate.match_score = final_score
            matched_candidates.append(candidate)
    
    # Sort by match score
    matched_candidates.sort(key=lambda x: x.match_score or 0, reverse=True)
    
    return matched_candidates

