
import { useState, useMemo } from 'react';
import { DataSource } from '@/components/talent-matching/types';

export type SortDirection = 'asc' | 'desc';

export const useDataSourceSorting = (dataSources: DataSource[]) => {
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedSources = useMemo(() => {
    return [...dataSources].sort((a, b) => {
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
  }, [dataSources, sortColumn, sortDirection]);

  return {
    sortColumn,
    sortDirection,
    handleSort,
    sortedSources
  };
};
