import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const diseases = [
    {
      title: 'Diabetes Prediction',
      desc: 'Predict diabetes risk using health metrics like glucose, BMI, insulin and more.',
      color: '#4f8ef7',
      path: '/diabetes',
      icon: '🩺'
    },
    {
      title: 'Liver Disease Prediction',
      desc: 'Detect liver disease risk using bilirubin levels, enzymes and protein values.',
      color: '#f97316',
      path: '/liver',
      icon: '🫀'
    }
  ];

  return (
    <div className="container">
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#1e293b' }}>
          AI-Powered Disease Prediction
        </h1>
        <p style={{ fontSize: '18px', color: '#64748b', marginTop: '12px' }}>
          Get instant disease risk predictions powered by Machine Learning
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {diseases.map((d) => (
          <div key={d.path} className="card" style={{ cursor: 'pointer', borderTop: `4px solid ${d.color}` }}
            onClick={() => navigate(d.path)}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{d.icon}</div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>{d.title}</h2>
            <p style={{ color: '#64748b', marginTop: '8px', lineHeight: 1.6 }}>{d.desc}</p>
            <button className="btn btn-primary" style={{ marginTop: '20px', background: d.color }}>
              Start Prediction →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;