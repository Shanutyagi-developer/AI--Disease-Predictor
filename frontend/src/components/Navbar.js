import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #4f8ef7, #2563eb)',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
    }}>
      <h1 style={{ color: 'white', fontSize: '20px', fontWeight: 800 }}>
        AI Disease Predictor
      </h1>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[['/', 'Home'], ['/diabetes', 'Diabetes'], ['/liver', 'Liver Disease']].map(([path, label]) => (
          <Link key={path} to={path} style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
            opacity: 0.9
          }}>
            {label}
          </Link>
        ))}
      </div> 
    </nav>
  );
}

export default Navbar;