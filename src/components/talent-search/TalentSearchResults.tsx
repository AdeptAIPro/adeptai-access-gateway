
import React from 'react';
import { 
  Card, 
  CardContent,
  CardFooter
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
  ExternalLink,
  Download
} from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface TalentSearchResultsProps {
  results: Talent[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const TalentSearchResults: React.FC<TalentSearchResultsProps> = ({
  results,
  totalResults,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-t-blue-600 border-b-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Loading talent results...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No candidates found</h3>
          <p className="text-gray-500 text-center max-w-md">
            Try adjusting your search criteria or clear some filters to see more results.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {totalResults} {totalResults === 1 ? 'Candidate' : 'Candidates'} Found
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {results.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNumber)}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationLink>...</PaginationLink>
              </PaginationItem>
            )}
            
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(totalPages)}
                  isActive={totalPages === currentPage}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

const TalentCard: React.FC<{ talent: Talent }> = ({ talent }) => {
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

// Need to import at the end to avoid circular dependency
import { Search } from 'lucide-react';

export default TalentSearchResults;
