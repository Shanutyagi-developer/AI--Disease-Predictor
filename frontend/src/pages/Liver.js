import { useState } from 'react';
import axios from 'axios';

function Liver() {
  const [form, setForm] = useState({
    age: '', gender: '1', totalBilirubin: '', directBilirubin: '',
    alkalinePhosphotase: '', alamineAminotransferase: '',
    aspartateAminotransferase: '', totalProtiens: '',
    albumin: '', albuminGlobulinRatio: ''
  });
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const fields = [
    { key: 'age',                       label: 'Age',                            hint: '4-90' },
    { key: 'totalBilirubin',            label: 'Total Bilirubin',                hint: '0.4-75' },
    { key: 'directBilirubin',           label: 'Direct Bilirubin',               hint: '0.1-20' },
    { key: 'alkalinePhosphotase',       label: 'Alkaline Phosphotase',           hint: '63-2110' },
    { key: 'alamineAminotransferase',   label: 'Alamine Aminotransferase',       hint: '10-2000' },
    { key: 'aspartateAminotransferase', label: 'Aspartate Aminotransferase',     hint: '10-5000' },
    { key: 'totalProtiens',             label: 'Total Proteins',                 hint: '2.7-9.6' },
    { key: 'albumin',                   label: 'Albumin',                        hint: '0.9-5.5' },
    { key: 'albuminGlobulinRatio',      label: 'Albumin/Globulin Ratio',         hint: '0.3-2.8' }
  ];

  const handleChange = (key, value) => setForm({ ...form, [key]: value }); 

  const handleSubmit = async () => { 

     // ADD THIS VALIDATION BLOCK
  const allFilled = Object.entries(form).every(([key, val]) => {
    if (key === 'gender') return true; // gender has default value
    return val !== '' && val !== null;
  }); 

  if (!allFilled) {
    setError('Please fill details in all fields.');
    return; // stop here, don't call Flask
  }
  // END OF VALIDATION BLOCK

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const payload = {
        ...Object.fromEntries(
          Object.entries(form)
            .filter(([k]) => k !== 'gender')
            .map(([k, v]) => [k, parseFloat(v)])
        ),
        gender: parseInt(form.gender)
      };
      const res = await axios.post('http://127.0.0.1:5000/predict/liver', payload);
      setResult(res.data);
    } catch {
      setError('Prediction failed. Make sure Flask server is running.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
          Liver Disease Prediction
        </h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          Fill in your liver function test values for an AI-powered prediction.
        </p>

        <div className="form-group">
          <label>Gender</label>
          <select value={form.gender} onChange={(e) => handleChange('gender', e.target.value)}>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>

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
          {loading ? 'Predicting...' : 'Predict Liver Disease Risk'}
        </button>

        {error && (
          <div style={{ marginTop: '16px', color: 'red', textAlign: 'center' }}>{error}</div>
        )}

        {result && (
          <div className={`result-box ${result.prediction === 1 ? 'result-high' : 'result-low'}`}>
            <h2>{result.prediction === 1 ? 'High Risk' : 'Low Risk'}</h2>
            <p>Probability: <strong>{result.probability ?? 'N/A'}%</strong></p>
            <div className="probability-bar">
              <div className="probability-fill" style={{
                width: `${result.probability}%`,
                background: result.prediction === 1 ? '#ff4d4d' : '#22c55e'
              }} />
            </div>
            <p style={{ marginTop: '12px', fontSize: '14px' }}>
              {result.prediction === 1
                ? 'Please consult a doctor for proper liver function evaluation.'
                : 'Your liver disease risk appears low. Keep up the healthy habits!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Liver;