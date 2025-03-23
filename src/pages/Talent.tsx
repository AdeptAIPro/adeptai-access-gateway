
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Star, 
  Mail, 
  Phone,
  Download,
  UserPlus,
  Calendar,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TalentProfile {
  id: string;
  name: string;
  title: string;
  skills: string[];
  experience: number;
  rating: number;
  availability: string;
  photo: string;
  location: string;
  hourlyRate: number;
}

const Talent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  if (!user) {
    navigate("/login");
    return null;
  }

  const allSkills = [
    "React", "JavaScript", "TypeScript", "Python", "Java", "UI/UX", 
    "SQL", "Data Analysis", "Product Management", "DevOps", "AWS", 
    "Azure", "Machine Learning", "Blockchain", "Finance", "Marketing"
  ];

  const talentProfiles: TalentProfile[] = [
    {
      id: "t1",
      name: "Alex Johnson",
      title: "Senior Full Stack Developer",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      experience: 7,
      rating: 4.8,
      availability: "Immediate",
      photo: "",
      location: "San Francisco, CA",
      hourlyRate: 85
    },
    {
      id: "t2",
      name: "Sarah Williams",
      title: "UX/UI Designer",
      skills: ["UI/UX", "Figma", "Adobe XD", "Sketch"],
      experience: 5,
      rating: 4.7,
      availability: "2 weeks",
      photo: "",
      location: "New York, NY",
      hourlyRate: 75
    },
    {
      id: "t3",
      name: "Michael Chen",
      title: "Data Scientist",
      skills: ["Python", "Machine Learning", "SQL", "Data Analysis"],
      experience: 6,
      rating: 4.9,
      availability: "1 week",
      photo: "",
      location: "Boston, MA",
      hourlyRate: 90
    },
    {
      id: "t4",
      name: "Emily Rodriguez",
      title: "Product Manager",
      skills: ["Product Management", "Agile", "JIRA", "Marketing"],
      experience: 8,
      rating: 4.6,
      availability: "Immediate",
      photo: "",
      location: "Austin, TX",
      hourlyRate: 95
    },
    {
      id: "t5",
      name: "David Kim",
      title: "DevOps Engineer",
      skills: ["DevOps", "AWS", "Docker", "Kubernetes"],
      experience: 5,
      rating: 4.5,
      availability: "2 weeks",
      photo: "",
      location: "Seattle, WA",
      hourlyRate: 88
    },
    {
      id: "t6",
      name: "Lisa Wang",
      title: "Blockchain Developer",
      skills: ["Blockchain", "Solidity", "JavaScript", "React"],
      experience: 4,
      rating: 4.7,
      availability: "Immediate",
      photo: "",
      location: "Denver, CO",
      hourlyRate: 92
    }
  ];

  // Filter talent based on search and skills
  const filteredTalent = talentProfiles.filter(profile => {
    // Search filter
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          profile.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Skills filter
    const matchesSkills = selectedSkills.length === 0 || 
                          selectedSkills.some(skill => profile.skills.includes(skill));
    
    return matchesSearch && matchesSkills;
  });

  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <DashboardLayout title="Talent Matchmaking">
      <div className="space-y-6">
        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, title, or skills..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" /> 
                Filter by skills
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <div className="grid grid-cols-2 gap-1">
                {allSkills.map(skill => (
                  <DropdownMenuItem
                    key={skill}
                    className={selectedSkills.includes(skill) ? "bg-primary/10" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSkill(skill);
                    }}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Selected skills display */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map(skill => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
                <button 
                  className="ml-2 text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSkill(skill)}
                >
                  ×
                </button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedSkills([])}
              className="text-xs text-muted-foreground"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Talent profiles */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTalent.map((profile) => (
            <Card key={profile.id} className="hover:shadow-md transition-all overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={profile.photo} alt={profile.name} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{profile.name}</CardTitle>
                  <CardDescription>{profile.title}</CardDescription>
                  <div className="flex items-center text-sm mt-1">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                    <span>{profile.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{profile.experience} yrs exp</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Availability:</span>
                    <Badge 
                      variant="outline" 
                      className={profile.availability === "Immediate" ? "bg-green-50 text-green-700" : ""}
                    >
                      {profile.availability}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Hourly Rate:</span>
                    <span className="text-sm font-medium">${profile.hourlyRate}/hr</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {profile.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 border-t pt-4">
                <Button variant="outline" className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" /> Schedule
                </Button>
                <Button className="flex-1">
                  <UserPlus className="mr-2 h-4 w-4" /> Contact
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Talent;
