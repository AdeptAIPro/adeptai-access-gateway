
import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { DataSource } from "@/components/talent-matching/types";
import DataSourceTableHeader from "./table/DataSourceTableHeader";
import DataSourceRow from "./table/DataSourceRow";

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

  return (
    <div className="rounded-md border">
      <Table>
        <DataSourceTableHeader
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        <TableBody>
          {sortedSources.map((source) => (
            <DataSourceRow
              key={source.id}
              source={source}
              onUpdateSource={onUpdateSource}
              onDeleteSource={onDeleteSource}
              onEditSource={onEditSource}
              onExportSource={onExportSource}
            />
          ))}
          {sortedSources.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-8 text-muted-foreground">
                No data sources available. Add a source to get started.
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataSourcesList;
