
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataSource } from "@/components/talent-matching/types";
import { Calendar, Play, Eye } from "lucide-react";

interface DataSourcesListProps {
  dataSources: DataSource[];
  onStartScraper: (sourceId: string) => void;
  isLoading: boolean;
  onSelectSource: (source: DataSource) => void;
}

const DataSourcesList: React.FC<DataSourcesListProps> = ({ 
  dataSources, 
  onStartScraper,
  isLoading, 
  onSelectSource
}) => {
  const getSourceIcon = (type: DataSource['type']) => {
    switch (type) {
      case 'github':
        return <span className="text-gray-700">GH</span>;
      case 'linkedin':
        return <span className="text-blue-600">LI</span>;
      case 'indeed':
        return <span className="text-blue-500">IN</span>;
      case 'monster':
        return <span className="text-purple-600">MO</span>;
      case 'naukri':
        return <span className="text-orange-500">NK</span>;
      case 'portfolio':
        return <span className="text-green-600">PF</span>;
      case 'dataset':
        return <span className="text-amber-600">DS</span>;
      default:
        return <span className="text-gray-500">?</span>;
    }
  };
  
  const getStatusBadge = (status: DataSource['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Type</TableHead>
            <TableHead>Source Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Candidates</TableHead>
            <TableHead className="w-24">Last Update</TableHead>
            <TableHead className="text-right w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSources.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No data sources configured. Add your first data source to start collecting candidate data.
              </TableCell>
            </TableRow>
          ) : (
            dataSources.map((source) => (
              <TableRow key={source.id}>
                <TableCell className="font-medium">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {getSourceIcon(source.type)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{source.name}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-xs">
                    {source.description || source.url || "N/A"}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(source.status)}</TableCell>
                <TableCell className="text-right font-medium">
                  {source.candidatesCount.toLocaleString()}
                </TableCell>
                <TableCell>
                  {source.lastScraped ? (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(source.lastScraped).toLocaleDateString()}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Never</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSelectSource(source)}
                      title="View Source Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={isLoading || source.status !== 'active'}
                      onClick={() => onStartScraper(source.id)}
                      title="Start Data Collection"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataSourcesList;
