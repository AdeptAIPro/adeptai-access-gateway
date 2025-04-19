import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ChevronDown,
  Check,
  Clock,
  AlertCircle,
  XCircle,
  Trash,
  Edit,
  FileSpreadsheet,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataSource } from "@/components/talent-matching/types";

interface DataSourcesListProps {
  dataSources: DataSource[];
  onStartScraper: (id: string) => void;
  isLoading: boolean;
  onSelectSource: (source: DataSource | null) => void;
  onUpdateSource?: (id: string) => void;
  onDeleteSource?: (id: string) => void;
  onEditSource?: (id: string) => void;
  onExportSource?: (id: string) => void;
}

const DataSourcesList: React.FC<DataSourcesListProps> = ({
  dataSources,
  onStartScraper,
  isLoading,
  onSelectSource,
  onUpdateSource = (id) => onStartScraper(id),
  onDeleteSource = () => {},
  onEditSource = () => {},
  onExportSource = () => {},
}) => {
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedSources = [...dataSources].sort((a, b) => {
    let comparison = 0;
    
    if (sortColumn === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortColumn === "type") {
      comparison = a.type.localeCompare(b.type);
    } else if (sortColumn === "count") {
      comparison = a.candidatesCount - b.candidatesCount;
    } else if (sortColumn === "lastUpdated") {
      comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
    } else if (sortColumn === "status") {
      const statusOrder = { active: 0, pending: 1, inactive: 2, error: 3 };
      comparison = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const renderStatus = (status: 'active' | 'inactive' | 'pending' | 'error') => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" className="font-normal">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="font-normal text-yellow-600 border-yellow-200 bg-yellow-50">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="font-normal">
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive" className="font-normal">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Name
                {sortColumn === "name" && (
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} 
                  />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("type")}
            >
              <div className="flex items-center">
                Type
                {sortColumn === "type" && (
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} 
                  />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("count")}
            >
              <div className="flex items-center">
                Candidates
                {sortColumn === "count" && (
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} 
                  />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("lastUpdated")}
            >
              <div className="flex items-center">
                Last Updated
                {sortColumn === "lastUpdated" && (
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} 
                  />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status
                {sortColumn === "status" && (
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} 
                  />
                )}
              </div>
            </TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSources.map((source) => (
            <TableRow key={source.id}>
              <TableCell className="font-medium">{source.name}</TableCell>
              <TableCell>{source.type}</TableCell>
              <TableCell>{source.candidatesCount.toLocaleString()}</TableCell>
              <TableCell>
                {new Date(source.lastUpdated).toLocaleDateString()}
                {source.lastScraped && (
                  <div className="text-xs text-muted-foreground">
                    Scraped: {new Date(source.lastScraped).toLocaleDateString()}
                  </div>
                )}
              </TableCell>
              <TableCell>{renderStatus(source.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onUpdateSource(source.id)}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditSource(source.id)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExportSource(source.id)}>
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> Export
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDeleteSource(source.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {sortedSources.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No data sources available. Add a source to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataSourcesList;
