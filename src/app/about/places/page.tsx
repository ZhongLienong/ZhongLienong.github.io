import GlobeComponent from './GlobeComponent';

export default function Places() {
  return (
    <div className="section">
      <h2 className="bg-indigo">Places I've Been To</h2>
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
