'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [risk, setRisk] = useState(64);
  const [projects, setProjects] = useState(58);
  const [savings, setSavings] = useState(8.4);
  const [alerts, setAlerts] = useState([
    {
      type: 'CRITICAL',
      text: 'Supplier payment delays detected on Project Atlas.'
    },
    {
      type: 'WARNING',
      text: 'Weather disruption probability elevated in South Wales.'
    },
    {
      type: 'AI',
      text: 'AI predicts 18-day delay risk escalation.'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRisk(prev => {
        let next = prev + Math.floor(Math.random() * 9 - 4);
        if (next < 38) next = 38;
        if (next > 92) next = 92;
        return next;
      });

      setProjects(prev => prev + (Math.random() > 0.8 ? 1 : 0));

      setSavings(prev =>
        Number((prev + (Math.random() * 0.4 - 0.15)).toFixed(1))
      );

      const feed = [
        'Steel price volatility increased 14%.',
        'Labour shortage threshold exceeded.',
        'Concrete supplier reliability weakening.',
        'AI confidence level recalibrated.',
        'Schedule variance anomaly detected.',
        'Risk cascade pattern identified.',
        'Project Orion entered high-risk state.'
      ];

      const types = ['AI', 'WARNING', 'CRITICAL'];

      setAlerts(prev => [
        {
          type: types[Math.floor(Math.random() * types.length)],
          text: feed[Math.floor(Math.random() * feed.length)]
        },
        ...prev.slice(0, 4)
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const projectsData = [
    {
      name: 'Project Atlas',
      budget: '£18.2M',
      risk: 74,
      delay: '16 days',
      status: 'High Risk'
    },
    {
      name: 'Cardiff Central',
      budget: '£9.1M',
      risk: 49,
      delay: '4 days',
      status: 'Stable'
    },
    {
      name: 'London Smart Rail',
      budget: '£104M',
      risk: 82,
      delay: '28 days',
      status: 'Critical'
    }
  ];

  return (
    <div
      style={{
        background: '#071223',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        fontFamily: 'Arial'
      }}
    >
      {/* SIDEBAR */}

      <div
        style={{
          width: '260px',
          background: '#0b172b',
          borderRight: '1px solid #1e293b',
          padding: '30px',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0
        }}
      >
        <h1
          style={{
            fontSize: '34px',
            marginBottom: '50px',
            fontWeight: '900'
          }}
        >
          CONSTRUCTIQ
        </h1>

        {[
          'Dashboard',
          'Projects',
          'AI Signals',
          'Forecasting',
          'Decision Logs',
          'Reports',
          'Risk Map',
          'Settings'
        ].map(item => (
          <div
            key={item}
            style={{
              padding: '16px',
              marginBottom: '10px',
              borderRadius: '14px',
              background:
                item === 'Dashboard'
                  ? '#12233f'
                  : 'transparent',
              color:
                item === 'Dashboard'
                  ? '#22d3ee'
                  : '#94a3b8',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* MAIN */}

      <div
        style={{
          marginLeft: '260px',
          width: '100%',
          padding: '40px'
        }}
      >
        {/* TOP */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                fontSize: '58px',
                fontWeight: '900'
              }}
            >
              AI RISK COMMAND CENTER
            </div>

            <div
              style={{
                color: '#94a3b8',
                marginTop: '10px',
                fontSize: '20px'
              }}
            >
              Predict. Prevent. Deliver.
            </div>
          </div>

          <div
            style={{
              background: '#111827',
              padding: '24px',
              borderRadius: '24px',
              minWidth: '220px',
              boxShadow: '0 0 30px rgba(34,211,238,0.1)'
            }}
          >
            <div style={{ color: '#94a3b8' }}>
              System Status
            </div>

            <div
              style={{
                marginTop: '12px',
                color: '#22c55e',
                fontWeight: 'bold',
                fontSize: '28px'
              }}
            >
              ● LIVE
            </div>
          </div>
        </div>

        {/* KPI */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(260px,1fr))',
            gap: '20px',
            marginTop: '40px'
          }}
        >
          <Metric
            title="Active Projects"
            value={projects}
          />

          <Metric
            title="Portfolio Risk"
            value={`${risk}%`}
          />

          <Metric
            title="Predicted Savings"
            value={`£${savings}M`}
          />

          <Metric
            title="AI Confidence"
            value={`${Math.floor(risk * 1.2)}%`}
          />
        </div>

        {/* GRID */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px',
            marginTop: '30px'
          }}
        >
          {/* RISK ENGINE */}

          <div
            style={{
              background: '#0f1b31',
              borderRadius: '30px',
              padding: '30px',
              boxShadow: '0 0 40px rgba(0,0,0,0.3)'
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              Live Risk Intelligence Engine
            </h2>

            <div
              style={{
                marginTop: '35px',
                height: '24px',
                background: '#1e293b',
                borderRadius: '999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${risk}%`,
                  height: '100%',
                  background:
                    risk > 75
                      ? '#ef4444'
                      : risk > 55
                      ? '#f59e0b'
                      : '#22c55e',
                  transition: '1s ease'
                }}
              />
            </div>

            <div
              style={{
                marginTop: '16px',
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            >
              Portfolio Risk Level: {risk}%
            </div>

            {/* LIVE GRAPH */}

            <div
              style={{
                marginTop: '50px',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '10px',
                height: '260px'
              }}
            >
              {Array.from({ length: 24 }).map((_, i) => {
                const h = 60 + Math.random() * 180;

                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      borderRadius: '10px',
                      height: h,
                      background:
                        i % 3 === 0
                          ? '#22d3ee'
                          : i % 3 === 1
                          ? '#f59e0b'
                          : '#ef4444',
                      transition: '1s ease',
                      boxShadow:
                        '0 0 20px rgba(255,255,255,0.08)'
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* ALERTS */}

          <div
            style={{
              background: '#0f1b31',
              borderRadius: '30px',
              padding: '30px'
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              AI Signal Feed
            </h2>

            <div style={{ marginTop: '30px' }}>
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  style={{
                    padding: '18px',
                    borderRadius: '18px',
                    marginBottom: '16px',
                    background: '#17263f',
                    borderLeft:
                      alert.type === 'CRITICAL'
                        ? '4px solid #ef4444'
                        : alert.type === 'WARNING'
                        ? '4px solid #f59e0b'
                        : '4px solid #22d3ee'
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      marginBottom: '8px',
                      color: '#94a3b8'
                    }}
                  >
                    {alert.type}
                  </div>

                  <div>{alert.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROJECT TABLE */}

        <div
          style={{
            marginTop: '30px',
            background: '#0f1b31',
            borderRadius: '30px',
            padding: '30px'
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Active Project Monitoring
          </h2>

          <table
            style={{
              width: '100%',
              marginTop: '30px',
              borderCollapse: 'collapse'
            }}
          >
            <thead>
              <tr style={{ color: '#94a3b8' }}>
                <th align="left">Project</th>
                <th align="left">Budget</th>
                <th align="left">Risk</th>
                <th align="left">Delay Forecast</th>
                <th align="left">Status</th>
              </tr>
            </thead>

            <tbody>
              {projectsData.map((p, i) => (
                <tr
                  key={i}
                  style={{
                    borderTop: '1px solid #1e293b',
                    height: '70px'
                  }}
                >
                  <td>{p.name}</td>
                  <td>{p.budget}</td>
                  <td>{p.risk}%</td>
                  <td>{p.delay}</td>
                  <td>
                    <span
                      style={{
                        padding: '8px 14px',
                        borderRadius: '999px',
                        background:
                          p.risk > 75
                            ? '#3b0d0d'
                            : p.risk > 55
                            ? '#3d2c09'
                            : '#0f3b22',
                        color:
                          p.risk > 75
                            ? '#ef4444'
                            : p.risk > 55
                            ? '#f59e0b'
                            : '#22c55e'
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div
      style={{
        background: '#0f1b31',
        padding: '28px',
        borderRadius: '24px',
        boxShadow: '0 0 20px rgba(0,0,0,0.3)'
      }}
    >
      <div
        style={{
          color: '#94a3b8',
          fontSize: '15px'
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: '18px',
          fontSize: '42px',
          fontWeight: 'bold'
        }}
      >
        {value}
      </div>
    </div>
  );
}
