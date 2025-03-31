
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Lead } from "@/services/crm/types";
import LeadScoreIndicator from "./LeadScoreIndicator";

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
  handleStatusChange: (id: string, status: string) => Promise<void>;
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  loading,
  handleStatusChange,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Loading leads...
              </TableCell>
            </TableRow>
          ) : leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No leads found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name || "—"}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.company || "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {lead.source}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lead.created_at
                    ? format(new Date(lead.created_at), "MMM dd, yyyy")
                    : "—"}
                </TableCell>
                <TableCell>
                  {lead.score !== undefined ? (
                    <LeadScoreIndicator 
                      score={lead.score} 
                      factors={lead.scoringFactors} 
                    />
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={lead.status || "new"}
                    onValueChange={(value) =>
                      handleStatusChange(lead.id as string, value)
                    }
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadTable;
