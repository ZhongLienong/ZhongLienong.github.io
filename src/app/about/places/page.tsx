import Image from 'next/image';

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
        <Image
          src="https://beeneverywhere.net/staticmap/7503.png"
          alt="Map of visited places"
          width={800}
          height={500}
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
      </div>

    </div>
  );
}
