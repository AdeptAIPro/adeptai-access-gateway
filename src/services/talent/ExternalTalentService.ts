
import { TalentSearchParams, Talent } from './types';

// Function to fetch talent data from external job boards via API
export const searchTalentsFromExternalSource = async (
  source: string,
  params: TalentSearchParams
): Promise<Talent[]> => {
  // In a real application, this would call different API endpoints based on the source
  // For now, we'll return mock data to simulate external API calls
  console.log(`Searching talents from ${source} with params:`, params);
  
  // Create some mock data based on the source
  const mockTalents: Talent[] = [];
  
  // Generate mock candidates with random skills matching the search
  const possibleSkills = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'SQL', 'AWS', 'Docker'];
  const possibleTitles = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer'];
  const possibleLocations = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Remote', 'Chicago, IL'];
  
  // Generate a unique ID based on timestamp and random number
  const generateId = () => `ext-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Create 3-8 mock candidates
  const candidateCount = Math.floor(Math.random() * 6) + 3;
  
  for (let i = 0; i < candidateCount; i++) {
    // Randomly select skills, ensuring at least one match if skills were specified
    const candidateSkills = [];
    
    // If search params include skills, make sure to include at least one of them
    if (params.skills && params.skills.length > 0) {
      const randomSkillFromSearch = params.skills[Math.floor(Math.random() * params.skills.length)];
      candidateSkills.push(randomSkillFromSearch);
    }
    
    // Add some random skills
    for (let j = 0; j < Math.floor(Math.random() * 4) + 2; j++) {
      const randomSkill = possibleSkills[Math.floor(Math.random() * possibleSkills.length)];
      if (!candidateSkills.includes(randomSkill)) {
        candidateSkills.push(randomSkill);
      }
    }
    
    // Create a random experience level that's at least the minimum if specified
    const minExperience = params.experience || 0;
    const randomExperience = minExperience + Math.floor(Math.random() * 8);
    
    // If location is specified, use it sometimes; otherwise, use a random location
    let candidateLocation = possibleLocations[Math.floor(Math.random() * possibleLocations.length)];
    if (params.location && Math.random() > 0.3) {
      candidateLocation = params.location;
    }
    
    mockTalents.push({
      id: generateId(),
      name: `External Candidate ${i + 1}`,
      title: possibleTitles[Math.floor(Math.random() * possibleTitles.length)],
      location: candidateLocation,
      skills: candidateSkills,
      experience: randomExperience,
      education: 'Bachelor\'s Degree',
      source: source,
      avatar: `https://i.pravatar.cc/150?u=${generateId()}`,
      email: `candidate${i + 1}@example.com`,
      phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      availability: 'Immediate',
      rate: `$${Math.floor(Math.random() * 50) + 50}/hr`,
      bio: `Experienced professional with expertise in ${candidateSkills.join(', ')}.`
    });
  }
  
  return mockTalents;
};
