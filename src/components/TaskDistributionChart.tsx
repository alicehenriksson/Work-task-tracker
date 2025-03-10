'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TaskStatus } from "@/lib/data";

const COLORS = {
  "Completed": "#10B981",
  "Ongoing": "#EAB308",
  "Not started": "#6B7280",
  "Deprecated": "#EF4444",
};

interface TaskDistributionChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 border rounded-lg shadow-sm p-2 text-sm">
        <p className="font-medium">{data.name}</p>
        <p className="text-muted-foreground">
          {data.value} tasks ({((data.value / data.total) * 100).toFixed(0)}%)
        </p>
      </div>
    );
  }
  return null;
};

export function TaskDistributionChart({ data }: TaskDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Add total to each data point for percentage calculation in tooltip
  const dataWithTotal = data.map(item => ({ ...item, total }));

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Task Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-center gap-4">
          <div className="w-[320px] h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataWithTotal}
                  cx="50%"
                  cy="50%"
                  innerRadius={120}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={0}
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.name as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 min-w-[140px]">
            <div className="space-y-3">
              {data.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] }}
                  />
                  <span className="text-sm font-medium whitespace-nowrap">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 