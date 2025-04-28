
// This is a partial update just to fix the specific errors with formatDistanceToNow
// Import the formatDistanceToNow function with correct usage
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Lead as ServiceLead } from "@/services/crm/types";

// Define the Lead type that matches what LeadManagementCard expects
interface Lead extends ServiceLead {
  createdAt: Date;
  lastActivity: Date;
  status: 'Open' | 'In Progress' | 'Closed';
}

// Define columns for the table
const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const lead = row.original;
      return (
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(lead.createdAt))} ago
        </p>
      );
    },
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lead = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(lead.id || '')}
            >
              Copy lead ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

// Mock data for leads
const data: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Corp",
    createdAt: new Date(),
    lastActivity: new Date(),
    status: "Open",
    source: "website"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    company: "Beta Inc",
    createdAt: new Date(),
    lastActivity: new Date(),
    status: "In Progress",
    source: "referral"
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    company: "Gamma Ltd",
    createdAt: new Date(),
    lastActivity: new Date(),
    status: "Closed",
    source: "email"
  },
];

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
  handleStatusChange: (id: string, status: string) => Promise<void>;
}

const LeadTable: React.FC<LeadTableProps> = ({ leads = data, loading, handleStatusChange }) => {
  const tableData = leads.length > 0 ? leads : data;
  
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div className="flex justify-center py-8">Loading leads...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadTable;
