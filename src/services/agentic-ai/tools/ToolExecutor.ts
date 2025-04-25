
import { generateText } from "../../llm/OpenAIService";

export const searchCandidates = async (criteria: any): Promise<any> => {
  const prompt = `Generate JSON data for 5 realistic candidates matching these criteria:
    Skills: ${criteria.skills.join(", ")}
    Experience: ${criteria.experience || "any"} years
    Location: ${criteria.location || "any"}
    Format as a JSON array with name, title, skills array, years of experience, location.`;
  
  const jsonResponse = await generateText(prompt, "gpt-4o");
  try {
    const jsonMatch = jsonResponse.match(/```json\n([\s\S]*?)\n```/) || 
                     jsonResponse.match(/```\n([\s\S]*?)\n```/) || 
                     [null, jsonResponse];
    const jsonString = jsonMatch[1] || jsonResponse;
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse candidate search results:", e);
    return [];
  }
};

export const analyzeJobDescription = async (text: string): Promise<any> => {
  const prompt = `Analyze this job description and extract the following information as JSON:
    - required_skills: Array of required skills
    - preferred_skills: Array of preferred/nice-to-have skills
    - min_experience: Minimum years of experience required (number)
    - education: Education requirements
    - job_title: The position title
    - seniority_level: Junior, Mid, Senior, etc.
    - key_responsibilities: Array of key responsibilities
    
    Job description:
    ${text}`;
  
  const jsonResponse = await generateText(prompt, "gpt-4o");
  try {
    const jsonMatch = jsonResponse.match(/```json\n([\s\S]*?)\n```/) || 
                     jsonResponse.match(/```\n([\s\S]*?)\n```/) || 
                     [null, jsonResponse];
    const jsonString = jsonMatch[1] || jsonResponse;
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse job description analysis:", e);
    return {};
  }
};

export const generateComplianceReport = async (args: any): Promise<any> => {
  const prompt = `Generate a compliance report for hiring a ${args.role} in the ${args.industry} industry${args.location ? ` in ${args.location}` : ''}.
    Include sections on:
    - Required certifications
    - Legal requirements
    - Industry standards
    - Compliance risks
    - Recommended verification steps
    Format as a JSON object with these sections as keys.`;
  
  const jsonResponse = await generateText(prompt, "gpt-4o");
  try {
    const jsonMatch = jsonResponse.match(/```json\n([\s\S]*?)\n```/) || 
                     jsonResponse.match(/```\n([\s\S]*?)\n```/) || 
                     [null, jsonResponse];
    const jsonString = jsonMatch[1] || jsonResponse;
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse compliance report:", e);
    return {};
  }
};

export const executeToolFunction = async (functionName: string, args: any): Promise<any> => {
  console.log(`Executing tool function: ${functionName}`, args);
  
  switch(functionName) {
    case "search_candidates":
      return await searchCandidates(args);
    case "analyze_job_description":
      return await analyzeJobDescription(args.text);
    case "generate_compliance_report":
      return await generateComplianceReport(args);
    default:
      throw new Error(`Unknown function: ${functionName}`);
  }
};
