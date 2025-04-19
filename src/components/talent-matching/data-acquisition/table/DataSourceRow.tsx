
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCw, Edit, FileSpreadsheet, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataSource } from "@/components/talent-matching/types";
import DataSourceStatusBadge from "./DataSourceStatusBadge";

interface DataSourceRowProps {
  source: DataSource;
  onUpdateSource: (id: string) => void;
  onDeleteSource: (id: string) => void;
  onEditSource: (id: string) => void;
  onExportSource: (id: string) => void;
}

const DataSourceRow: React.FC<DataSourceRowProps> = ({
  source,
  onUpdateSource,
  onDeleteSource,
  onEditSource,
  onExportSource,
}) => {
  return (
    <TableRow>
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
      <TableCell>
        <DataSourceStatusBadge status={source.status} />
      </TableCell>
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
  );
};

export default DataSourceRow;
