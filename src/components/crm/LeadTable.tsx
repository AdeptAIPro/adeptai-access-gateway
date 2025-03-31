
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Phone } from "lucide-react";
import { Lead } from "@/services/crm/types";

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
  handleStatusChange: (id: string, status: string) => Promise<void>;
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, loading, handleStatusChange }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex justify-center items-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2">Loading leads...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  {lead.name || "Unknown"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span className="text-sm">{lead.email}</span>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-sm">{lead.phone}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{lead.company || "—"}</TableCell>
                <TableCell>
                  <span className="capitalize">{lead.source}</span>
                </TableCell>
                <TableCell>
                  {lead.created_at 
                    ? new Date(lead.created_at).toLocaleDateString() 
                    : "—"
                  }
                </TableCell>
                <TableCell>
                  <Select 
                    value={lead.status} 
                    onValueChange={(value) => handleStatusChange(lead.id!, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
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
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
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
