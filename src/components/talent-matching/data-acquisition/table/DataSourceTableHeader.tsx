
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

interface DataSourceTableHeaderProps {
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
}

const DataSourceTableHeader: React.FC<DataSourceTableHeaderProps> = ({
  sortColumn,
  sortDirection,
  onSort,
}) => {
  const renderSortIcon = (column: string) => {
    if (sortColumn === column) {
      return (
        <ChevronDown 
          className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} 
        />
      );
    }
    return null;
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="cursor-pointer" onClick={() => onSort("name")}>
          <div className="flex items-center">
            Name
            {renderSortIcon("name")}
          </div>
        </TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort("type")}>
          <div className="flex items-center">
            Type
            {renderSortIcon("type")}
          </div>
        </TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort("count")}>
          <div className="flex items-center">
            Candidates
            {renderSortIcon("count")}
          </div>
        </TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort("lastUpdated")}>
          <div className="flex items-center">
            Last Updated
            {renderSortIcon("lastUpdated")}
          </div>
        </TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort("status")}>
          <div className="flex items-center">
            Status
            {renderSortIcon("status")}
          </div>
        </TableHead>
        <TableHead className="w-[100px] text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default DataSourceTableHeader;
