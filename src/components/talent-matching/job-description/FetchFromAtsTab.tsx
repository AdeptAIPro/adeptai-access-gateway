
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database } from "lucide-react";

interface FetchFromAtsTabProps {
  setJobDescription: (text: string) => void;
}

const FetchFromAtsTab: React.FC<FetchFromAtsTabProps> = ({
  setJobDescription
}) => {
  const [selectedSystem, setSelectedSystem] = React.useState<string>("");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium mb-2 block">Select ATS/VMS System</label>
          <Select value={selectedSystem} onValueChange={setSelectedSystem}>
            <SelectTrigger>
              <SelectValue placeholder="Select system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ceipal">Ceipal</SelectItem>
              <SelectItem value="stafferlink">Stafferlink</SelectItem>
              <SelectItem value="sapfieldglass">SAP Fieldglass</SelectItem>
              <SelectItem value="beeline">Beeline</SelectItem>
              <SelectItem value="pontoon">Pontoon</SelectItem>
              <SelectItem value="jobdiva">JobDiva</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Job ID/Reference</label>
          <Input placeholder="Enter job ID or reference" />
        </div>
      </div>
      <Button className="w-full md:w-auto">
        <Database className="mr-2 h-4 w-4" />
        Fetch Job Details
      </Button>
    </div>
  );
};

export default FetchFromAtsTab;
