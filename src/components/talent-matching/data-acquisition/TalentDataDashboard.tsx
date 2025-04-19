
import React from "react";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { Database, Upload, History } from "lucide-react";
import { useTalentData } from "@/hooks/use-talent-data";
import { ImportStats } from "@/components/talent-matching/types";
import StateHandler from "@/components/shared/StateHandler";
import DataSourcesList from "./DataSourcesList";
import ImportForm from "./ImportForm";
import ImportHistory from "./ImportHistory";
import { useSourceActions } from "@/hooks/talent-matching/use-source-actions";

const TalentDataDashboard: React.FC = () => {
  const {
    isLoading,
    dataSources,
    selectedSource,
    setSelectedSource,
    importHistory,
    addImportStats,
    startScraper,
    refreshDataSources
  } = useTalentData();

  const {
    handleUpdateSource,
    handleDeleteSource,
    handleEditSource,
    handleExportSource
  } = useSourceActions(dataSources, setSelectedSource, startScraper, refreshDataSources);

  const handleImportComplete = (stats: ImportStats) => {
    addImportStats(stats);
    refreshDataSources();
  };

  return (
    <div className="space-y-6">
      <SectionCard>
        <SectionHeader
          title="Data Sources"
          icon={<Database className="h-5 w-5" />}
        />
        <StateHandler
          isLoading={isLoading}
          isEmpty={dataSources.length === 0}
          emptyState={
            <div className="text-center py-8">
              <Database className="h-12 w-12 mx-auto text-muted-foreground opacity-30" />
              <p className="mt-2 text-muted-foreground">
                No data sources found. Add a source to get started.
              </p>
            </div>
          }
        >
          <DataSourcesList
            dataSources={dataSources}
            isLoading={isLoading}
            onSelectSource={setSelectedSource}
            onUpdateSource={handleUpdateSource}
            onDeleteSource={handleDeleteSource}
            onEditSource={handleEditSource}
            onExportSource={handleExportSource}
          />
        </StateHandler>
      </SectionCard>

      <SectionCard>
        <SectionHeader
          title="Import Data"
          icon={<Upload className="h-5 w-5" />}
        />
        <ImportForm
          dataSources={dataSources}
          onImportComplete={handleImportComplete}
          selectedSource={selectedSource}
        />
      </SectionCard>

      <SectionCard>
        <SectionHeader
          title="Import History"
          icon={<History className="h-5 w-5" />}
        />
        <ImportHistory importStats={importHistory} />
      </SectionCard>
    </div>
  );
};

export default TalentDataDashboard;
