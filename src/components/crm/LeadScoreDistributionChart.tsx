
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Lead } from '@/services/crm/types';
import { getLeadPriority } from '@/services/crm/LeadScoringService';

interface LeadScoreDistributionChartProps {
  leads: Lead[];
}

const LeadScoreDistributionChart: React.FC<LeadScoreDistributionChartProps> = ({ leads }) => {
  const scoreData = useMemo(() => {
    // Filter out leads without scores
    const scoredLeads = leads.filter(lead => lead.score !== undefined);
    
    // Count leads by priority
    const counts = {
      high: 0,
      medium: 0,
      low: 0
    };
    
    scoredLeads.forEach(lead => {
      if (lead.score !== undefined) {
        const priority = getLeadPriority(lead.score);
        counts[priority]++;
      }
    });
    
    // Format for chart
    return [
      { name: 'High Priority', value: counts.high, color: '#22c55e' },
      { name: 'Medium Priority', value: counts.medium, color: '#f59e0b' },
      { name: 'Low Priority', value: counts.low, color: '#6b7280' }
    ];
  }, [leads]);
  
  const hasData = scoreData.some(item => item.value > 0);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-md">Lead Score Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            No scored leads to display
          </div>
        ) : (
          <div className="h-[200px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} leads`, '']}
                  contentStyle={{ borderRadius: '8px' }}
                  wrapperStyle={{ zIndex: 20 }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadScoreDistributionChart;
