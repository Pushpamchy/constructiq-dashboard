'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [risk, setRisk] = useState(67);
  const [projects, setProjects] = useState(42);
  const [alerts, setAlerts] = useState([
    'Supplier payment delays increasing.',
    'Weather disruption probability elevated.',
    'Concrete delivery running behind schedule.'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRisk(prev => {
        let next = prev + Math.floor(Math.random() * 9 - 4);
        if (next < 30) next = 30;
        if (next > 95) next = 95;
        return next;
      });

      setProjects(prev => prev + (Math.random() > 0.7 ? 1 : 0));

      const newAlerts = [
        'Steel price volatility increased.',
        'Labour shortage threshold exceeded.',
        'Schedule variance anomaly detected.',
        'AI predicts cost overrun risk spike.',
        'Supplier reliability trend weakening.'
      ];

      setAlerts(prev => [
        newAlerts[Math.floor(Math.random() * newAlerts.length)],
        ...prev.slice(0, 2)
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#071226',
        color: 'white',
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '72px',
              margin: 0,
              fontWeight: '900'
            }}
          >
            CONSTRUCTIQ
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '24px',
              marginTop: '20px'
            }}
          >
            Predict. Prevent. Deliver.
          </p>
        </div>

        <div
          style={{
            background: '#111827',
            padding: '20px',
            borderRadius: '20px',
            minWidth: '220px'
          }}
        >
          <div style={{ color: '#94a3b8' }}>
            System Status
          </div>

          <div
            style={{
              color: '#22c55e',
              marginTop: '10px',
              fontWeight: 'bold',
              fontSize: '22px'
            }}
          >
            ● LIVE
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
          gap: '20px',
          marginTop: '50px'
        }}
      >
        <MetricCard
          title="Active Projects"
          value={projects}
        />

        <MetricCard
          title="Risk Exposure"
          value={`£${(risk * 120000).toLocaleString()}`}
        />

        <MetricCard
          title="AI Confidence"
          value={`${risk}%`}
        />

        <MetricCard
          title="Delay Probability"
          value={`${Math.floor(risk * 0.7)}%`}
        />
      </div>

      <div
        style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px'
        }}
      >
        <div
          style={{
            background: '#111827',
            borderRadius: '24px',
            padding: '30px'
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Live Risk Engine
          </h2>

          <div
            style={{
              marginTop: '40px',
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
                transition: 'all 1s ease'
              }}
            />
          </div>

          <div
            style={{
              marginTop: '20px',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            Current Portfolio Risk: {risk}%
          </div>

          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '12px',
              height: '240px'
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => {
              const height = 40 + Math.random() * 180;

              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background:
                      i % 3 === 0
                        ? '#22d3ee'
                        : i % 3 === 1
                        ? '#f59e0b'
                        : '#ef4444',
                    height,
                    borderRadius: '8px',
                    transition: 'all 1s ease'
                  }}
                />
              );
            })}
          </div>
        </div>

        <div
          style={{
            background: '#111827',
            borderRadius: '24px',
            padding: '30px'
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            AI Alert Feed
          </h2>

          <div style={{ marginTop: '30px' }}>
            {alerts.map((alert, index) => (
              <div
                key={index}
                style={{
                  background: '#1e293b',
                  padding: '18px',
                  borderRadius: '16px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #ef4444'
                }}
              >
                {alert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div
      style={{
        background: '#111827',
        padding: '30px',
        borderRadius: '24px'
      }}
    >
      <div
        style={{
          color: '#94a3b8',
          fontSize: '16px'
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: '16px',
          fontSize: '38px',
          fontWeight: 'bold'
        }}
      >
        {value}
      </div>
    </div>
  );
}
