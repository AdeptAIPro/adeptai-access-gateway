
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Users, Code, Database, Stethoscope, FileSpreadsheet, Upload, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SourceItemProps {
  source: string;
  isSelected: boolean;
  onChange: (source: string, checked: boolean) => void;
  showBadge?: boolean;
  badgeText?: string;
}

const SourceItem: React.FC<SourceItemProps> = ({
  source,
  isSelected,
  onChange,
  showBadge = false,
  badgeText,
}) => {
  const getSourceIcon = (source: string) => {
    const sourceLC = source.toLowerCase();
    
    if (sourceLC.includes('linkedin')) return <Users className="h-4 w-4 text-blue-500" />;
    if (sourceLC.includes('github')) return <Code className="h-4 w-4 text-purple-500" />;
    if (sourceLC.includes('database') || sourceLC.includes('db')) return <Database className="h-4 w-4 text-green-500" />;
    if (sourceLC.includes('health') || sourceLC.includes('nurs') || sourceLC.includes('med')) return <Stethoscope className="h-4 w-4 text-red-500" />;
    if (sourceLC.includes('stack') || sourceLC.includes('hack')) return <Code className="h-4 w-4 text-orange-500" />;
    if (sourceLC.includes('spreadsheet') || sourceLC.includes('excel')) return <FileSpreadsheet className="h-4 w-4 text-green-700" />;
    if (sourceLC.includes('uploaded') || sourceLC.includes('resume')) return <Upload className="h-4 w-4 text-blue-600" />;
    
    return <Building className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`source-${source}`}
        checked={isSelected}
        onCheckedChange={(checked) => onChange(source, checked as boolean)}
        className="data-[state=checked]:bg-adept data-[state=checked]:border-adept"
      />
      <Label
        htmlFor={`source-${source}`}
        className="flex items-center text-sm font-medium cursor-pointer"
      >
        {getSourceIcon(source)}
        <span className="ml-2">{source}</span>
        {showBadge && badgeText && (
          <Badge variant="outline" className="ml-2 bg-green-50 text-green-800">{badgeText}</Badge>
        )}
      </Label>
    </div>
  );
};

export default SourceItem;
