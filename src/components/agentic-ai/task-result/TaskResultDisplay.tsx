
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AgentTask } from '@/services/agentic-ai/AgenticService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Clock, AlertCircle, ThumbsUp, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TaskResultDisplayProps {
  task: AgentTask;
}

const TaskResultDisplay: React.FC<TaskResultDisplayProps> = ({ task }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!task.result) return null;

  const renderTaskResult = () => {
    // Different display based on task type
    switch (task.taskType) {
      case 'talent-matching':
        return renderTalentMatchingResult();
      case 'cross-source-talent-intelligence':
        return renderCrossSourceIntelligenceResult();
      case 'payroll-processing':
        return renderPayrollResult();
      default:
        return renderGenericResult();
    }
  };

  const renderTalentMatchingResult = () => {
    const result = task.result as any;
    const candidates = result.candidates || [];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsUp className="h-5 w-5 text-green-500" />
          <span>Found {candidates.length} matching candidates</span>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Skills</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>
                    <Badge variant={candidate.matchScore > 80 ? "success" : "outline"}>
                      {candidate.matchScore}%
                    </Badge>
                  </TableCell>
                  <TableCell>{candidate.skills?.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {result.insights && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md p-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <span className="font-medium">Matching Insights</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-2 text-sm">
                {result.insights.talentPoolQuality && (
                  <p>Talent Pool Quality: <span className="font-medium">{result.insights.talentPoolQuality}</span></p>
                )}
                {result.insights.recommendedSourcingStrategy?.mostEffectiveSources && (
                  <p>Most Effective Sources: <span className="font-medium">
                    {result.insights.recommendedSourcingStrategy.mostEffectiveSources.join(', ')}
                  </span></p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    );
  };

  const renderCrossSourceIntelligenceResult = () => {
    const result = task.result as any;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsUp className="h-5 w-5 text-green-500" />
          <span>Cross-source intelligence analysis completed</span>
        </div>
        
        <div className="border rounded-md p-4 bg-amber-50">
          <h4 className="font-medium mb-2">Cross-Source Verification</h4>
          <p className="text-sm">
            Found {result.crossSourceValidation?.candidatesFound || 'multiple'} candidates across {result.crossSourceValidation?.sourcesSearched?.length || 'several'} sources
          </p>
          {result.crossSourceValidation?.verificationRate && (
            <p className="text-sm mt-2">
              Verification Rate: <Badge variant="outline" className="ml-1">{result.crossSourceValidation.verificationRate}%</Badge>
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderPayrollResult = () => {
    const result = task.result as any;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Check className="h-5 w-5 text-green-500" />
          <span>Payroll processing completed successfully</span>
        </div>
        
        <div className="rounded-md border p-4">
          <p className="font-medium">Summary:</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <p>Employees processed: <span className="font-medium">{result.employeesProcessed || 0}</span></p>
            <p>Total amount: <span className="font-medium">${result.totalAmount?.toFixed(2) || '0.00'}</span></p>
            <p>Processing date: <span className="font-medium">{result.processingDate || 'N/A'}</span></p>
            <p>Status: <span className="font-medium text-green-600">Complete</span></p>
          </div>
        </div>
      </div>
    );
  };

  const renderGenericResult = () => {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Check className="h-5 w-5 text-green-500" />
          <span>Task completed successfully</span>
        </div>
        
        {task.result.message && (
          <p className="text-sm">{task.result.message}</p>
        )}
        
        {task.result.completedAt && (
          <p className="text-xs text-muted-foreground">
            Completed at: {new Date(task.result.completedAt).toLocaleString()}
          </p>
        )}
      </div>
    );
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {task.status === 'completed' ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : task.status === 'failed' ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : (
            <Clock className="h-5 w-5 text-blue-500" />
          )}
          Task Result
        </CardTitle>
        <CardDescription>
          Results for {task.taskType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderTaskResult()}
      </CardContent>
    </Card>
  );
};

export default TaskResultDisplay;
