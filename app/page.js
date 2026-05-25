'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
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
} from 'recharts';

export default function ConstructIQDashboard() {
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
      <h1 className="text-4xl font-bold">CONSTRUCTIQ</h1>
      <p className="text-slate-400 mt-2">Predict. Prevent. Deliver.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>

            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span>Risk Score</span>
                <span>{project.risk}%</span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-3 mt-2 overflow-hidden">
                <motion.div
                  animate={{ width: `${project.risk}%` }}
                  transition={{ duration: 1 }}
                  className={`h-3 rounded-full ${
                    project.risk > 75
                      ? 'bg-red-500'
                      : project.risk > 55
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                />
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-300">
              Budget: {project.budget}
            </div>

            <div className="text-sm text-slate-300">
              Delay Forecast: {project.delay}
            </div>

            <div className="text-sm text-slate-300">
              Status: {project.status}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-6">
          Live Risk Volatility
        </h2>

        <div className="h-96">
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
    </div>
  );
}
