'use client';

import React from 'react';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#08111f',
        color: 'white',
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >
      <h1 style={{ fontSize: '48px' }}>
        CONSTRUCTIQ
      </h1>

      <p style={{ color: '#94a3b8' }}>
        Predict. Prevent. Deliver.
      </p>

      <div
        style={{
          marginTop: '40px',
          background: '#111827',
          padding: '30px',
          borderRadius: '20px'
        }}
      >
        <h2>Dashboard Successfully Deployed</h2>

        <p style={{ marginTop: '20px' }}>
          Live AI Risk Dashboard Active
        </p>
      </div>
    </div>
  );
}
