'use client';

import MidoriPlayground from './MidoriPlayground';

export default function PlaygroundPage() {
  return (
    <div style={{
      margin: '-10px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <MidoriPlayground />
    </div>
  );
}
