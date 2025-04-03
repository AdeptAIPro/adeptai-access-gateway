
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download, FileSpreadsheet, FileText, Files } from "lucide-react";
import PlanRestriction from "@/components/shared/PlanRestriction";
import { getFeatureRequirement } from "@/utils/planUtils";

interface DataExportOptionsProps {
  data: any[];
  filename?: string;
  exportTypes?: Array<"csv" | "excel" | "pdf" | "json">;
}

const DataExportOptions: React.FC<DataExportOptionsProps> = ({ 
  data, 
  filename = "analytics-export", 
  exportTypes = ["csv", "excel", "pdf", "json"] 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "excel" | "pdf" | "json">("csv");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  
  // Initialize selected columns
  React.useEffect(() => {
    if (columns.length > 0 && selectedColumns.length === 0) {
      setSelectedColumns(columns);
    }
  }, [columns]);
  
  // Toggle column selection
  const toggleColumn = (column: string) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };
  
  // Handle export
  const handleExport = async () => {
    if (selectedColumns.length === 0) {
      toast.error("Please select at least one column to export");
      return;
    }
    
    setIsExporting(true);
    
    try {
      // Filter data to only include selected columns
      const filteredData = data.map(row => {
        const filteredRow: Record<string, any> = {};
        selectedColumns.forEach(col => {
          filteredRow[col] = row[col];
        });
        return filteredRow;
      });
      
      // Different export formats
      switch (exportFormat) {
        case "csv":
          // CSV Export
          const csvContent = convertToCSV(filteredData);
          downloadFile(csvContent, `${filename}.csv`, "text/csv");
          break;
        case "excel":
          // Mock Excel export - in a real app would use a library like xlsx
          toast.info("Excel export would be processed here");
          break;
        case "pdf":
          // Mock PDF export - in a real app would use a library like jspdf
          toast.info("PDF export would be processed here");
          break;
        case "json":
          // JSON Export
          const jsonContent = JSON.stringify(filteredData, null, 2);
          downloadFile(jsonContent, `${filename}.json`, "application/json");
          break;
      }
      
      toast.success("Export successful", {
        description: `Data exported as ${exportFormat.toUpperCase()}`
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Export failed", {
        description: "There was an error exporting your data"
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  // Convert data to CSV
  const convertToCSV = (data: any[]) => {
    const header = selectedColumns.join(',');
    const rows = data.map(row => 
      selectedColumns.map(col => {
        let value = row[col];
        // Handle values with commas by wrapping in quotes
        if (typeof value === 'string' && value.includes(',')) {
          value = `"${value}"`;
        }
        return value;
      }).join(',')
    );
    
    return [header, ...rows].join('\n');
  };
  
  // Download helper
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Icon mapping
  const formatIcons = {
    csv: <Files className="h-4 w-4 mr-2" />,
    excel: <FileSpreadsheet className="h-4 w-4 mr-2" />,
    pdf: <FileText className="h-4 w-4 mr-2" />,
    json: <FileText className="h-4 w-4 mr-2" />
  };

  // Get feature requirement
  const requirement = getFeatureRequirement("advanced_analytics");
  
  return (
    <PlanRestriction 
      feature="Data Export" 
      description="Export your analytics data in various formats for further analysis."
      requiredPlan={requirement}
      showCard={false}
    >
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Data...
              </DropdownMenuItem>
            </DialogTrigger>
            {exportTypes.map((type) => (
              <DropdownMenuItem 
                key={type}
                onClick={() => {
                  setExportFormat(type);
                  setIsDialogOpen(true);
                }}
              >
                {formatIcons[type]}
                Export as {type.toUpperCase()}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>
              Choose which columns to include in your {exportFormat.toUpperCase()} export.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2 block">Export Format</Label>
              <RadioGroup 
                value={exportFormat} 
                onValueChange={(val) => setExportFormat(val as any)}
                className="flex flex-wrap gap-4"
              >
                {exportTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`format-${type}`} />
                    <Label htmlFor={`format-${type}`} className="flex items-center">
                      {formatIcons[type]}
                      {type.toUpperCase()}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Columns to Export 
                <span className="text-xs ml-1 text-muted-foreground">
                  ({selectedColumns.length}/{columns.length})
                </span>
              </Label>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                {columns.map((column) => (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`column-${column}`} 
                      checked={selectedColumns.includes(column)}
                      onCheckedChange={() => toggleColumn(column)}
                    />
                    <Label htmlFor={`column-${column}`} className="text-sm truncate">
                      {column}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleExport} 
              disabled={isExporting || selectedColumns.length === 0}
            >
              {isExporting ? (
                <><span className="animate-spin mr-2">◌</span> Exporting...</>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export as {exportFormat.toUpperCase()}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PlanRestriction>
  );
};

export default DataExportOptions;
