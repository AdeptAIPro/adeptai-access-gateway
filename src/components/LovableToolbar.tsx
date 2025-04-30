
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Download, Save, Settings, Info } from '@/utils/misc-icons';

interface ToolbarProps {
  onShare?: () => void;
  onExport?: () => void;
  onSave?: () => void;
  onSettings?: () => void;
  onInfo?: () => void;
}

const LovableToolbar = ({
  onShare,
  onExport,
  onSave,
  onSettings,
  onInfo
}: ToolbarProps) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-background border rounded-lg shadow-sm">
      {onShare && (
        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      )}
      
      {onExport && (
        <Button variant="ghost" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      )}
      
      {onSave && (
        <Button variant="ghost" size="sm" onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      )}
      
      {onSettings && (
        <Button variant="ghost" size="sm" onClick={onSettings}>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      )}
      
      {onInfo && (
        <Button variant="ghost" size="sm" onClick={onInfo}>
          <Info className="h-4 w-4 mr-2" />
          Info
        </Button>
      )}
    </div>
  );
};

export default LovableToolbar;
