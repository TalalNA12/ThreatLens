"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  Critical: '#EF4444', // Red
  High: '#F97316',     // Orange
  Medium: '#EAB308',   // Yellow
  Low: '#3B82F6'       // Blue
};

export default function SeverityChart({ findings }) {
  // 1. Calculate the counts for each severity
  const data = [
    { name: 'Critical', value: findings.filter(f => f.severity === 'Critical').length },
    { name: 'High', value: findings.filter(f => f.severity === 'High').length },
    { name: 'Medium', value: findings.filter(f => f.severity === 'Medium').length },
    { name: 'Low', value: findings.filter(f => f.severity === 'Low').length },
  ].filter(item => item.value > 0); // Only show segments that have data

  if (data.length === 0) {
    return <div className="text-gray-500 text-center py-10 font-mono text-xs">NO_DATA_AVAILABLE</div>;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%" // Center X
            cy="50%" // Center Y
            innerRadius={60} // Makes it a "Donut"
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} stroke="rgba(0,0,0,0.5)" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px' }}
            itemStyle={{ color: '#E5E7EB', fontFamily: 'monospace' }}
          />
          <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}