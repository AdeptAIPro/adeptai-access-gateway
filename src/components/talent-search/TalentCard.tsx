
import React from 'react';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Talent } from '@/services/talent/TalentSearchService';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  Calendar, 
  ExternalLink
} from 'lucide-react';

interface TalentCardProps {
  talent: Talent;
}

const TalentCard: React.FC<TalentCardProps> = ({ talent }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:w-64 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r bg-gray-50 dark:bg-gray-800">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={talent.avatar} alt={talent.name} />
              <AvatarFallback>{talent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-center">{talent.name}</h3>
            <p className="text-sm text-center text-gray-500 mb-2">{talent.title}</p>
            <Badge variant="outline" className="mt-1">
              Source: {talent.source}
            </Badge>
          </div>
          
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{talent.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                <span>{talent.experience} years experience</span>
              </div>
              <div className="flex items-center text-sm">
                <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                <span>{talent.education}</span>
              </div>
              {talent.availability && (
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>Available: {talent.availability}</span>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {talent.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {talent.bio}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-4 justify-end">
              {talent.email && (
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              )}
              {talent.phone && (
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              )}
              <Button>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentCard;
