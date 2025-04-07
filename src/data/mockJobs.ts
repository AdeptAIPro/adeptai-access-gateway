export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";
  postedDate: string;
  salaryRange?: string;
  tags?: string[];
  experience?: number | string;
}

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    description: "We're looking for a skilled frontend developer with 5+ years of experience working with React, TypeScript, and modern web technologies. You'll be responsible for building innovative user interfaces and ensuring a seamless user experience.",
    jobType: "Full-time",
    postedDate: "2 days ago",
    salaryRange: "$120,000 - $150,000",
    tags: ["React", "TypeScript", "Frontend", "JavaScript", "UI/UX"],
    experience: 5
  },
  {
    id: "job-2",
    title: "DevOps Engineer",
    company: "Cloud Solutions LLC",
    location: "Remote",
    description: "Join our team of DevOps professionals to build and maintain scalable cloud infrastructure. Experience with AWS, Kubernetes, and CI/CD pipelines is required. You'll be working with cross-functional teams to optimize deployment processes.",
    jobType: "Full-time",
    postedDate: "1 week ago",
    salaryRange: "$130,000 - $160,000",
    tags: ["AWS", "Kubernetes", "CI/CD", "Infrastructure", "Docker"],
    experience: 3
  },
  {
    id: "job-3",
    title: "UX/UI Designer",
    company: "Creative Design Agency",
    location: "New York, NY",
    description: "We're seeking a talented UX/UI designer to create beautiful, intuitive interfaces for our clients. You should have a strong portfolio demonstrating your design skills and experience with tools like Figma and Adobe Creative Suite.",
    jobType: "Full-time",
    postedDate: "3 days ago",
    salaryRange: "$90,000 - $120,000",
    tags: ["UI/UX", "Figma", "Adobe XD", "User Research", "Prototyping"]
  },
  {
    id: "job-4",
    title: "Backend Developer",
    company: "FinTech Innovations",
    location: "Austin, TX",
    description: "Looking for a backend developer with strong skills in Node.js, Express, and database design. You'll be responsible for developing robust APIs and maintaining our microservices architecture.",
    jobType: "Full-time",
    postedDate: "5 days ago",
    salaryRange: "$110,000 - $140,000",
    tags: ["Node.js", "Express", "MongoDB", "API Design", "Microservices"]
  },
  {
    id: "job-5",
    title: "Data Scientist",
    company: "Analytics Pros",
    location: "Remote",
    description: "Join our data science team to build machine learning models and extract valuable insights from large datasets. Experience with Python, ML frameworks, and statistical analysis is required.",
    jobType: "Full-time",
    postedDate: "1 day ago",
    salaryRange: "$125,000 - $155,000",
    tags: ["Python", "Machine Learning", "Data Analysis", "Statistics", "TensorFlow"]
  },
  {
    id: "job-6",
    title: "Project Manager",
    company: "Global Solutions Inc.",
    location: "Chicago, IL",
    description: "We're looking for an experienced project manager to oversee software development projects from inception to delivery. You'll coordinate with stakeholders, manage timelines, and ensure project success.",
    jobType: "Full-time",
    postedDate: "2 weeks ago",
    salaryRange: "$100,000 - $130,000",
    tags: ["Project Management", "Agile", "Scrum", "Team Leadership", "Software Development"]
  },
  {
    id: "job-7",
    title: "Mobile App Developer",
    company: "AppWorks Studio",
    location: "Seattle, WA",
    description: "Seeking a talented mobile developer with experience in React Native or Flutter. You'll be responsible for building cross-platform mobile applications for our clients across various industries.",
    jobType: "Full-time",
    postedDate: "4 days ago",
    salaryRange: "$95,000 - $125,000",
    tags: ["React Native", "Flutter", "Mobile Development", "iOS", "Android"]
  },
  {
    id: "job-8",
    title: "QA Engineer",
    company: "Quality First Software",
    location: "Remote",
    description: "Join our QA team to ensure the highest quality of our software products. Experience with manual and automated testing methodologies is required. You'll create test plans, execute tests, and report bugs.",
    jobType: "Full-time",
    postedDate: "1 week ago",
    salaryRange: "$85,000 - $110,000",
    tags: ["QA", "Testing", "Selenium", "Test Automation", "CI/CD"]
  },
  {
    id: "job-9",
    title: "Content Marketing Specialist",
    company: "Digital Marketing Agency",
    location: "Boston, MA",
    description: "We're looking for a creative content marketer to develop engaging content strategies for our clients. You should have excellent writing skills and experience with SEO, social media, and content management systems.",
    jobType: "Full-time",
    postedDate: "3 days ago",
    salaryRange: "$70,000 - $90,000",
    tags: ["Content Marketing", "SEO", "Social Media", "Copywriting", "Content Strategy"]
  },
  {
    id: "job-10",
    title: "Product Manager",
    company: "Innovative Products Inc.",
    location: "Remote",
    description: "Join our product team to drive the development of innovative software solutions. You'll gather requirements, define product roadmaps, and work closely with development and design teams to deliver exceptional products.",
    jobType: "Full-time",
    postedDate: "6 days ago",
    salaryRange: "$115,000 - $145,000",
    tags: ["Product Management", "User Stories", "Roadmapping", "Agile", "Market Research"]
  },
  {
    id: "job-11",
    title: "Sales Representative",
    company: "Enterprise Solutions",
    location: "Dallas, TX",
    description: "Looking for an energetic sales professional to join our team. You'll identify and pursue new business opportunities, maintain client relationships, and meet or exceed sales targets.",
    jobType: "Full-time",
    postedDate: "1 week ago",
    salaryRange: "$60,000 - $100,000 (base + commission)",
    tags: ["Sales", "Business Development", "Client Relations", "Negotiation", "CRM"]
  },
  {
    id: "job-12",
    title: "Cybersecurity Analyst",
    company: "SecureTech Solutions",
    location: "Washington, DC",
    description: "Join our security team to protect our systems and data from cyber threats. You'll monitor security measures, investigate incidents, and implement security best practices.",
    jobType: "Full-time",
    postedDate: "5 days ago",
    salaryRange: "$105,000 - $135,000",
    tags: ["Cybersecurity", "Network Security", "Incident Response", "Risk Assessment", "Security Auditing"]
  }
];
