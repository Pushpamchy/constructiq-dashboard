export default function ConstructIQDashboard() {
  const React = require('react');
  const { useEffect, useState } = React;
  const { motion } = require('framer-motion');
  const {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area,
    BarChart,
    Bar,
    CartesianGrid,
  } = require('recharts');

  const initialProjects = [
    {
      id: 1,
      name: 'Cardiff Central Redevelopment',
      risk: 42,
      budget: '£12.4M',
      delay: '11 days',
      status: 'Stable',
    },
    {
      id: 2,
      name: 'Bristol Green Towers',
      risk: 67,
      budget: '£31.8M',
      delay: '24 days',
      status: 'At Risk',
    },
    {
      id: 3,
      name: 'London Smart Rail Phase 2',
      risk: 81,
      budget: '£102M',
      delay: '42 days',
      status: 'Critical',
    },
  ];

  const createChartData = () =>
    Array.from({ length: 12 }, (_, i) => ({
      time: `${i + 1}`,
      risk: Math.floor(Math.random() * 40) + 40,
      cost: Math.floor(Math.random() * 300) + 500,
      delay: Math.floor(Math.random() * 30) + 10,
    }));

  const [projects, setProjects] = useState(initialProjects);
  const [chartData, setChartData] = useState(createChartData());

  useEffect(() => {
    const interval = setInterval(() => {
      setProjects((prev) =>
        prev.map((p) => ({
          ...p,
          risk: Math.max(20, Math.min(95, p.risk + Math.floor(Math.random() * 11) - 5)),
        }))
      );

      setChartData((prev) => {
        const updated = [...prev.slice(1)];
        updated.push({
          time: `${Number(prev[prev.length - 1].time) + 1}`,
          risk: Math.floor(Math.random() * 40) + 40,
          cost: Math.floor(Math.random() * 300) + 500,
          delay: Math.floor(Math.random() * 30) + 10,
        });
        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#08111f] text-white p-6">
      <h1 className="text-4xl font-bold">CONSTRUCTIQ Dashboard</h1>
      <p className="text-slate-400 mt-2">Predict. Prevent. Deliver.</p>

      <div className="h-96 mt-8 bg-slate-900 rounded-2xl p-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
