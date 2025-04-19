
import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { DataSource } from "@/components/talent-matching/types";
import DataSourceTableHeader from "./table/DataSourceTableHeader";
import DataSourceRow from "./table/DataSourceRow";
import { useDataSourceSorting } from "@/hooks/talent-matching/use-data-source-sorting";

interface DataSourcesListProps {
  dataSources: DataSource[];
  isLoading: boolean;
  onSelectSource: (source: DataSource | null) => void;
  onUpdateSource: (id: string) => void;
  onDeleteSource: (id: string) => void;
  onEditSource: (id: string) => void;
  onExportSource: (id: string) => void;
  onStartScraper: (id: string) => void;
}

const DataSourcesList: React.FC<DataSourcesListProps> = ({
  dataSources,
  onStartScraper,
  onUpdateSource = (id) => onStartScraper(id),
  onDeleteSource = () => {},
  onEditSource = () => {},
  onExportSource = () => {},
}) => {
  const {
    sortColumn,
    sortDirection,
    handleSort,
    sortedSources
  } = useDataSourceSorting(dataSources);

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
