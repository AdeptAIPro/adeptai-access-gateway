
/**
 * Helper functions to generate random enrichment data
 */

// Generate random industry data
export function getRandomIndustry(): string {
  const industries = [
    "Information Technology", "Financial Services", "Healthcare", 
    "Manufacturing", "Retail", "Education", "Real Estate"
  ];
  return industries[Math.floor(Math.random() * industries.length)];
}

// Generate random technology data
export function getRandomTechnologies(): string[] {
  const technologies = [
    "AWS", "Azure", "React", "Angular", "Vue", "Node.js", 
    "MongoDB", "PostgreSQL", "Docker", "Kubernetes", "TensorFlow"
  ];
  const count = Math.floor(Math.random() * 6) + 2;
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const tech = technologies[Math.floor(Math.random() * technologies.length)];
    if (!result.includes(tech)) {
      result.push(tech);
    }
  }
  
  return result;
}

// Generate random skills
export function getRandomSkills(): string[] {
  const skills = [
    "JavaScript", "React", "TypeScript", "Node.js", "Python", "Java", 
    "SQL", "GraphQL", "AWS", "Docker", "CI/CD", "TDD"
  ];
  const count = Math.floor(Math.random() * 6) + 3;
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const skill = skills[Math.floor(Math.random() * skills.length)];
    if (!result.includes(skill)) {
      result.push(skill);
    }
  }
  
  return result;
}

// Generate random language proficiency data
export function getRandomLanguages(): { language: string; proficiency: string }[] {
  const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese"];
  const proficiencies = ["Native", "Fluent", "Intermediate", "Basic"];
  
  const count = Math.floor(Math.random() * 3) + 1;
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const language = languages[Math.floor(Math.random() * languages.length)];
    const proficiency = proficiencies[Math.floor(Math.random() * proficiencies.length)];
    
    if (!result.some(l => l.language === language)) {
      result.push({ language, proficiency });
    }
  }
  
  return result;
}

// Generate random certification data
export function getRandomCertifications(): string[] {
  const certifications = [
    "AWS Certified Solutions Architect", "Google Cloud Professional", 
    "Microsoft Azure Administrator", "Cisco CCNA", "CompTIA Security+", 
    "PMP", "Scrum Master", "ITIL Foundation"
  ];
  
  const count = Math.floor(Math.random() * 3);
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const cert = certifications[Math.floor(Math.random() * certifications.length)];
    if (!result.includes(cert)) {
      result.push(cert);
    }
  }
  
  return result;
}

// Generate random education data
export function getRandomUniversity(): string {
  const universities = [
    "Stanford University", "MIT", "University of California", 
    "Harvard University", "University of Michigan", "Georgia Tech", 
    "University of Texas", "Cornell University"
  ];
  
  return universities[Math.floor(Math.random() * universities.length)];
}

export function getRandomDegree(): string {
  const degrees = ["Bachelor's", "Master's", "Ph.D.", "Associate's"];
  return degrees[Math.floor(Math.random() * degrees.length)];
}

export function getRandomField(): string {
  const fields = [
    "Computer Science", "Information Technology", "Software Engineering", 
    "Data Science", "Electrical Engineering", "Business Administration", 
    "Mathematics", "Information Systems"
  ];
  
  return fields[Math.floor(Math.random() * fields.length)];
}

// Generate random company experience data
export function getRandomCompanies(): { name: string; years: string }[] {
  const companies = [
    "Google", "Microsoft", "Amazon", "Facebook", "Apple", "IBM", 
    "Oracle", "Salesforce", "Intel", "Cisco", "Adobe", "Netflix"
  ];
  
  const count = Math.floor(Math.random() * 3) + 1;
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const name = companies[Math.floor(Math.random() * companies.length)];
    const startYear = 2010 + Math.floor(Math.random() * 10);
    const endYear = startYear + Math.floor(Math.random() * 5) + 1;
    const years = `${startYear}-${endYear < 2023 ? endYear : 'Present'}`;
    
    if (!result.some(c => c.name === name)) {
      result.push({ name, years });
    }
  }
  
  return result;
}
