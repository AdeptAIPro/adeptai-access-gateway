
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { BarChart3 } from "lucide-react";

interface SourceMatchingData {
  source: string;
  efficiency: number;
}

interface MatchingEfficiencyChartProps {
  data: SourceMatchingData[];
}

const MatchingEfficiencyChart: React.FC<MatchingEfficiencyChartProps> = ({ data }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-adept" />
          Matching Efficiency by Source
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="source" />
              <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
              <Bar 
                dataKey="efficiency" 
                name="Matching Efficiency" 
                fill="#5E19E6"
                background={{ fill: '#eee' }}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchingEfficiencyChart;
