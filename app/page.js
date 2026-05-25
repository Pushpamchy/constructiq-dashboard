'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [activePage, setActivePage] =
    useState('Dashboard');

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [risk, setRisk] = useState(64);

  const [projects, setProjects] =
    useState(58);

  const [savings, setSavings] =
    useState(8.4);

  const [signals, setSignals] = useState([
    'Weather Risk ↑',
    'Steel Cost Spike ↑',
    'Supplier Reliability ↓'
  ]);

  const [alerts, setAlerts] = useState([
    {
      type: 'CRITICAL',
      text: 'Supplier payment delays detected.'
    },
    {
      type: 'WARNING',
      text: 'Weather disruption probability elevated.'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRisk(prev => {
        let next =
          prev +
          Math.floor(Math.random() * 9 - 4);

        if (next < 35) next = 35;
        if (next > 92) next = 92;

        return next;
      });

      setProjects(prev =>
        prev + (Math.random() > 0.8 ? 1 : 0)
      );

      setSavings(prev =>
        Number(
          (
            prev +
            (Math.random() * 0.5 - 0.2)
          ).toFixed(1)
        )
      );

      const newSignals = [
        'Concrete Delay ↑',
        'Fuel Price Volatility ↑',
        'Rainfall Risk ↑',
        'Labour Availability ↓',
        'Supply Chain Delay ↑'
      ];

      setSignals([
        newSignals[
          Math.floor(
            Math.random() *
              newSignals.length
          )
        ],
        ...signals.slice(0, 4)
      ]);

      const feed = [
        'AI predicts schedule variance.',
        'Budget anomaly identified.',
        'Project entered high-risk state.',
        'Cost overrun probability increased.',
        'Supplier trend weakening.'
      ];

      const types = [
        'AI',
        'WARNING',
        'CRITICAL'
      ];

      setAlerts(prev => [
        {
          type:
            types[
              Math.floor(
                Math.random() *
                  types.length
              )
            ],
          text:
            feed[
              Math.floor(
                Math.random() *
                  feed.length
              )
            ]
        },
        ...prev.slice(0, 4)
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, [signals]);

  const menuItems = [
    'Dashboard',
    'Projects',
    'AI Signals',
    'Forecasting',
    'Decision Logs',
    'Reports',
    'Risk Map',
    'Settings'
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
          width: sidebarOpen
            ? '260px'
            : '90px',
          background: '#0b172b',
          borderRight:
            '1px solid #1e293b',
          padding: '30px 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          transition: '0.4s ease',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent:
              sidebarOpen
                ? 'space-between'
                : 'center',
            alignItems: 'center',
            marginBottom: '50px'
          }}
        >
          {sidebarOpen && (
            <h1
              style={{
                fontSize: '32px',
                margin: 0
              }}
            >
              CQ
            </h1>
          )}

          <button
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
            style={{
              background: '#12233f',
              border: 'none',
              color: 'white',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {menuItems.map(item => (
          <div
            key={item}
            onClick={() =>
              setActivePage(item)
            }
            style={{
              padding: '16px',
              marginBottom: '12px',
              borderRadius: '14px',
              cursor: 'pointer',
              background:
                activePage === item
                  ? '#12233f'
                  : 'transparent',
              color:
                activePage === item
                  ? '#22d3ee'
                  : '#94a3b8',
              transition: '0.3s'
            }}
          >
            {sidebarOpen
              ? item
              : item[0]}
          </div>
        ))}
      </div>

      {/* MAIN */}

      <div
        style={{
          marginLeft: sidebarOpen
            ? '260px'
            : '90px',
          transition: '0.4s ease',
          width: '100%',
          padding: '40px'
        }}
      >
        <h1
          style={{
            fontSize: '52px',
            marginTop: 0
          }}
        >
          {activePage}
        </h1>

        {/* DASHBOARD */}

        {activePage ===
          'Dashboard' && (
          <>
            <MetricsGrid
              risk={risk}
              projects={projects}
              savings={savings}
            />

            <DashboardGrid
              risk={risk}
              alerts={alerts}
            />
          </>
        )}

        {/* PROJECTS */}

        {activePage ===
          'Projects' && (
          <ProjectsPage />
        )}

        {/* AI SIGNALS */}

        {activePage ===
          'AI Signals' && (
          <SignalsPage
            signals={signals}
          />
        )}

        {/* FORECASTING */}

        {activePage ===
          'Forecasting' && (
          <ForecastPage risk={risk} />
        )}

        {/* DECISION LOGS */}

        {activePage ===
          'Decision Logs' && (
          <DecisionPage />
        )}

        {/* REPORTS */}

        {activePage ===
          'Reports' && (
          <ReportsPage />
        )}

        {/* RISK MAP */}

        {activePage ===
          'Risk Map' && (
          <RiskMapPage />
        )}

        {/* SETTINGS */}

        {activePage ===
          'Settings' && (
          <SettingsPage />
        )}
      </div>
    </div>
  );
}

/* COMPONENTS */

function MetricsGrid({
  risk,
  projects,
  savings
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fit,minmax(250px,1fr))',
        gap: '20px',
        marginTop: '30px'
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
        value={`${Math.floor(
          risk * 1.2
        )}%`}
      />
    </div>
  );
}

function DashboardGrid({
  risk,
  alerts
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          '2fr 1fr',
        gap: '20px',
        marginTop: '30px'
      }}
    >
      <div
        style={{
          background: '#0f1b31',
          padding: '30px',
          borderRadius: '24px'
        }}
      >
        <h2>Live Risk Engine</h2>

        <div
          style={{
            marginTop: '30px',
            height: '22px',
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
                  : '#f59e0b',
              transition: '1s ease'
            }}
          />
        </div>

        <div
          style={{
            marginTop: '20px',
            fontSize: '22px'
          }}
        >
          Current Risk: {risk}%
        </div>

        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '10px',
            height: '240px'
          }}
        >
          {Array.from({
            length: 20
          }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height:
                  60 +
                  Math.random() * 180,
                background:
                  i % 3 === 0
                    ? '#22d3ee'
                    : i % 3 === 1
                    ? '#f59e0b'
                    : '#ef4444',
                borderRadius: '10px',
                transition: '1s ease'
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          background: '#0f1b31',
          padding: '30px',
          borderRadius: '24px'
        }}
      >
        <h2>AI Alerts</h2>

        <div
          style={{ marginTop: '30px' }}
        >
          {alerts.map(
            (alert, index) => (
              <div
                key={index}
                style={{
                  padding: '18px',
                  background: '#17263f',
                  borderRadius: '16px',
                  marginBottom: '14px'
                }}
              >
                <div
                  style={{
                    color: '#94a3b8',
                    fontSize: '12px'
                  }}
                >
                  {alert.type}
                </div>

                <div
                  style={{
                    marginTop: '8px'
                  }}
                >
                  {alert.text}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  return (
    <PageCard title="Projects Overview">
      Live project monitoring,
      supplier intelligence,
      budget tracking and delay
      forecasting active.
    </PageCard>
  );
}

function SignalsPage({
  signals
}) {
  return (
    <div
      style={{
        marginTop: '30px'
      }}
    >
      {signals.map((signal, i) => (
        <div
          key={i}
          style={{
            background: '#0f1b31',
            padding: '24px',
            borderRadius: '20px',
            marginBottom: '16px'
          }}
        >
          {signal}
        </div>
      ))}
    </div>
  );
}

function ForecastPage({
  risk
}) {
  return (
    <PageCard title="AI Forecasting">
      Predicted portfolio exposure:
      £{(risk * 120000).toLocaleString()}
    </PageCard>
  );
}

function DecisionPage() {
  return (
    <PageCard title="Decision Logs">
      AI approval workflows and
      governance audit system live.
    </PageCard>
  );
}

function ReportsPage() {
  return (
    <PageCard title="Reports">
      Weekly AI-generated reports
      and predictive summaries.
    </PageCard>
  );
}

function RiskMapPage() {
  return (
    <PageCard title="Global Risk Map">
      Geographic supplier and
      infrastructure risk engine.
    </PageCard>
  );
}

function SettingsPage() {
  return (
    <PageCard title="System Settings">
      AI sensitivity controls,
      thresholds and user roles.
    </PageCard>
  );
}

function PageCard({
  title,
  children
}) {
  return (
    <div
      style={{
        background: '#0f1b31',
        padding: '40px',
        borderRadius: '24px',
        marginTop: '30px',
        fontSize: '20px'
      }}
    >
      <h2>{title}</h2>

      <div
        style={{
          marginTop: '20px',
          color: '#94a3b8'
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Metric({
  title,
  value
}) {
  return (
    <div
      style={{
        background: '#0f1b31',
        padding: '28px',
        borderRadius: '24px'
      }}
    >
      <div
        style={{
          color: '#94a3b8'
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
