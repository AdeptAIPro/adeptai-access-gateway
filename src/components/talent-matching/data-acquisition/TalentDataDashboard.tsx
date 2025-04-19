
import React, { useState } from "react";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { Database, Upload, History } from "lucide-react";
import { useTalentData } from "@/hooks/use-talent-data";
import { DataSource, ImportStats } from "@/components/talent-matching/types";
import StateHandler from "@/components/shared/StateHandler";
import DataSourcesList from "./table/DataSourcesList";
import ImportForm from "./ImportForm";
import ImportHistory from "./ImportHistory";

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

  const handleImportComplete = (stats: ImportStats) => {
    addImportStats(stats);
    refreshDataSources();
  };

  const handleStartScraper = async (sourceId: string) => {
    await startScraper(sourceId);
    refreshDataSources();
  };

  const handleUpdateSource = async (id: string) => {
    await handleStartScraper(id);
  };

  const handleDeleteSource = async (id: string) => {
    // TODO: Implement delete functionality
    console.log("Delete source:", id);
  };

  const handleEditSource = (id: string) => {
    const source = dataSources.find(s => s.id === id);
    if (source) {
      setSelectedSource(source);
    }
  };

  const handleExportSource = (id: string) => {
    // TODO: Implement export functionality
    console.log("Export source:", id);
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
