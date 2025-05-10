import GlobeComponent from './GlobeComponent';

export default function Places() {
  return (
    <div className="section">
      <h2 className="bg-indigo">Places I Visited With Memories Beyond the Transfer Gate</h2>
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 0'
      }}>
        <GlobeComponent />
      </div>
    </div>
  );
}
