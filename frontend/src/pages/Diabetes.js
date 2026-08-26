import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

function Diabetes() {
  const [form, setForm] = useState({
    pregnancies: '', glucose: '', bloodPressure: '',
    skinThickness: '', insulin: '', bmi: '',
    diabetesPedigree: '', age: '' 
  });
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const fields = [
    { key: 'pregnancies',      label: 'Pregnancies',               hint: '0-17' },
    { key: 'glucose',          label: 'Glucose Level',             hint: '70-200' },
    { key: 'bloodPressure',    label: 'Blood Pressure (mm Hg)',    hint: '60-130' },
    { key: 'skinThickness',    label: 'Skin Thickness (mm)',       hint: '10-50' },
    { key: 'insulin',          label: 'Insulin (IU/mL)',           hint: '15-300' },
    { key: 'bmi',              label: 'BMI',                       hint: '18-60' },
    { key: 'diabetesPedigree', label: 'Diabetes Pedigree Function',hint: '0.1-2.5' },
    { key: 'age',              label: 'Age',                       hint: '10-100' }
  ];

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async () => {

    // ADD THIS VALIDATION BLOCK
  const allFilled = Object.entries(form).every(([key, val]) => {
    
    return val !== '' && val !== null;
  });

  if (!allFilled) {
    setError('Please fill details in all fields .');
    return; // stop here, don't call Flask
  }
  // END OF VALIDATION BLOCK

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, parseFloat(v)])
      );
      const res = await axios.post(`${API_URL}/predict/diabetes`, payload);
      setResult(res.data);
    } catch (requestError) {
      const message = requestError.response?.data?.error
        || requestError.response?.statusText
        || requestError.message;
      setError(`Prediction failed: ${message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
          Diabetes Prediction
        </h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          Fill in your health metrics below for an instant AI prediction.
        </p>

        <div className="form-grid">
          {fields.map(({ key, label, hint }) => (
            <div className="form-group" key={key}>
              <label>{label}</label>
              <input
                type="number"
                placeholder={hint}
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Diabetes Risk'}
        </button>

        {error && (
          <div style={{ marginTop: '16px', color: 'red', textAlign: 'center' }}>{error}</div>
        )}

        {result && (
          <div className={`result-box ${result.prediction === 1 ? 'result-high' : 'result-low'}`}>
            <h2>{result.prediction === 1 ? 'High Risk' : 'Low Risk'}</h2>
            <p>Probability: <strong>{result.probability}%</strong></p>
            <div className="probability-bar">
              <div className="probability-fill" style={{
                width: `${result.probability}%`,
                background: result.prediction === 1 ? '#ff4d4d' : '#22c55e'
              }} />
            </div>
            <p style={{ marginTop: '12px', fontSize: '14px' }}>
              {result.prediction === 1
                ? 'Please consult a doctor for proper diagnosis.'
                : 'Your diabetes risk appears low. Maintain a healthy lifestyle!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diabetes;