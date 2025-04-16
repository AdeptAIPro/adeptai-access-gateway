
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const ImportFormHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center">
        <Upload className="mr-2 h-5 w-5" />
        Import Talent Data
      </CardTitle>
    </CardHeader>
  );
};

export default ImportFormHeader;
