
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Info } from 'lucide-react';

interface TalentSearchInfoProps {
  useAgenticIntelligence?: boolean;
}

const TalentSearchInfo: React.FC<TalentSearchInfoProps> = ({ 
  useAgenticIntelligence = false 
}) => {
  return (
    <Card className={useAgenticIntelligence ? "border-amber-400/50 bg-amber-50/30" : ""}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              {useAgenticIntelligence ? (
                <>
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <h3 className="font-semibold text-lg flex items-center">
                    Cross-Source Talent Intelligence
                    <Badge className="ml-2 bg-amber-500" variant="secondary">Premium</Badge>
                  </h3>
                </>
              ) : (
                <>
                  <Info className="h-5 w-5" />
                  <h3 className="font-semibold text-lg">Talent Search</h3>
                </>
              )}
            </div>
            
            {useAgenticIntelligence ? (
              <p className="text-muted-foreground">
                Our AI agents are actively searching multiple sources to find verified candidates, 
                cross-referencing information, and analyzing market position to help you make the best hiring decisions.
              </p>
            ) : (
              <p className="text-muted-foreground">
                Search across our talent database to find candidates matching your requirements.
                Use filters to narrow down your search results.
              </p>
            )}
          </div>
          
          {useAgenticIntelligence && (
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="bg-white">Cross-Source Verification</Badge>
              <Badge variant="outline" className="bg-white">Market Position Analysis</Badge>
              <Badge variant="outline" className="bg-white">Custom Outreach Strategies</Badge>
              <Badge variant="outline" className="bg-white">AI-Powered Insights</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentSearchInfo;
