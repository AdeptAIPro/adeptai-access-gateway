
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ImportStats } from "@/components/talent-matching/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface ImportHistoryProps {
  importStats: ImportStats[];
}

const ImportHistory: React.FC<ImportHistoryProps> = ({ importStats }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getSuccessRate = (stats: ImportStats) => {
    if (stats.totalProcessed === 0) return 0;
    return (stats.successfulImports / stats.totalProcessed) * 100;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="mr-2 h-5 w-5" />
          Import History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {importStats.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No import history yet. Start importing candidates to see your history here.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Candidates</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {importStats.map((stats, index) => {
                // Calculate duration
                const startTime = new Date(stats.startTime);
                const endTime = new Date(stats.endTime);
                const durationMs = endTime.getTime() - startTime.getTime();
                const durationSeconds = Math.round(durationMs / 1000);
                
                const successRate = getSuccessRate(stats);
                let statusIcon;
                let statusColor;
                
                if (successRate === 100) {
                  statusIcon = <CheckCircle2 className="h-4 w-4 text-green-500" />;
                  statusColor = "bg-green-100 text-green-800 border-green-200";
                } else if (successRate > 80) {
                  statusIcon = <CheckCircle2 className="h-4 w-4 text-amber-500" />;
                  statusColor = "bg-amber-100 text-amber-800 border-amber-200";
                } else {
                  statusIcon = <AlertCircle className="h-4 w-4 text-red-500" />;
                  statusColor = "bg-red-100 text-red-800 border-red-200";
                }
                
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {formatDate(stats.startTime)}
                    </TableCell>
                    <TableCell>
                      {stats.sources.join(", ")}
                    </TableCell>
                    <TableCell className="text-right">
                      {stats.successfulImports} / {stats.totalProcessed}
                    </TableCell>
                    <TableCell className="text-right">
                      {Math.round(successRate)}%
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="flex items-center justify-end text-muted-foreground text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {durationSeconds}s
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColor}>
                        <div className="flex items-center gap-1">
                          {statusIcon}
                          {successRate === 100 ? "Complete" : 
                           successRate > 80 ? "Partial" : "Failed"}
                        </div>
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ImportHistory;
