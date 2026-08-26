# AI Disease Predictor

A full-stack machine-learning application that predicts diabetes and liver disease risk from health measurements.

The project contains:

- A React frontend for entering patient measurements and displaying prediction results.
- A Flask backend that loads trained Random Forest models and exposes prediction APIs.
- Saved scikit-learn models in the `models` directory.
- Python scripts for exploring datasets and retraining the models.

## Features

- Diabetes risk prediction.
- Liver disease risk prediction.
- Prediction probability and risk result.
- Input validation in the React forms.
- CORS-enabled Flask API for frontend communication.
- Local development and free deployment support.

## Project Structure

```text
AI--Disease-Predictor-main/
├── backend/
│   └── app.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Diabetes.js
│   │   │   ├── Home.js
│   │   │   └── Liver.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
├── models/
│   ├── diabetes_model.pkl
│   └── liver_model.pkl
├── notebooks/
│   ├── test.py
│   └── train_models.py
├── requirements.txt
├── .gitignore
└── README.md
```

## Requirements

Install the following software:

- Python 3.10 or newer.
- Node.js and npm.
- Git, if you want to clone or push the repository.

## Clone the Repository

```powershell
git clone https://github.com/Shanutyagi-developer/AI--Disease-Predictor.git
cd AI--Disease-Predictor
```

The commands below assume the repository folder is named `AI--Disease-Predictor-main`. Use your actual folder name if it differs.

## Run the Backend Locally

Open a terminal and run:

```powershell
cd "AI--Disease-Predictor-main"
python -m pip install -r requirements.txt
python .\backend\app.py
```

The API runs at:

```text
http://127.0.0.1:5000
```

You can check the API in a browser:

```text
http://127.0.0.1:5000/
```

Expected response:

```json
{"message":"Dise_pred API running successfully"}
```

## Run the Frontend Locally

Open a second terminal:

```powershell
cd "AI--Disease-Predictor-main\frontend"
npm.cmd install
npm.cmd start
```

If PowerShell allows the normal npm command, `npm start` also works. `npm.cmd` avoids the PowerShell execution-policy issue that can block `npm.ps1`.

Open the application at:

```text
http://localhost:3000
```

The React entry point is `frontend/src/index.js`, which loads `frontend/src/App.js`. Do not run `App.js` directly with Node.js.

## Frontend API Configuration

The prediction pages use this environment variable:

```javascript
REACT_APP_API_URL
```

If the variable is not set, the frontend uses the local backend:

```text
http://127.0.0.1:5000
```

For local configuration, optionally create `frontend/.env`:

```env
REACT_APP_API_URL=http://127.0.0.1:5000
```

Restart the React development server after changing `.env`.

## API Endpoints

### Health Check

```text
GET /
```

### Diabetes Prediction

```text
POST /predict/diabetes
Content-Type: application/json
```

Example request:

```json
{
  "pregnancies": 2,
  "glucose": 120,
  "bloodPressure": 70,
  "skinThickness": 20,
  "insulin": 80,
  "bmi": 28.5,
  "diabetesPedigree": 0.35,
  "age": 30
}
```

The API returns the prediction, probability, result, and disease name.

### Liver Prediction

```text
POST /predict/liver
Content-Type: application/json
```

The request fields are:

```json
{
  "age": 45,
  "gender": 1,
  "totalBilirubin": 1.2,
  "directBilirubin": 0.4,
  "alkalinePhosphotase": 200,
  "alamineAminotransferase": 35,
  "aspartateAminotransferase": 40,
  "totalProtiens": 6.8,
  "albumin": 3.4,
  "albuminGlobulinRatio": 1.0
}
```

Gender values are `1` for male and `0` for female.

## Train the Models

The training script is `notebooks/train_models.py`. It expects these datasets at the project root:

```text
datasets/
├── diabetes.csv
└── indian_liver_patient.csv
```

These dataset files are not currently included in the repository. Add them before retraining.

Run training from the project root:

```powershell
cd "AI--Disease-Predictor-main"
python .\notebooks\train_models.py
```

The script cleans the data, trains Random Forest classifiers, prints evaluation information, and writes:

```text
models/diabetes_model.pkl
models/liver_model.pkl
```

The existing `.pkl` model files allow the backend to run without the training datasets.

## Build the Frontend

From the frontend directory:

```powershell
cd "AI--Disease-Predictor-main\frontend"
npm.cmd run build
```

The production files are created in `frontend/build`. This directory is ignored by Git.

## Deploy the Backend on Render

1. Push the project to GitHub.
2. Open [Render](https://render.com) and sign in with GitHub.
3. Select **New +** and choose **Web Service**.
4. Select `Shanutyagi-developer/AI--Disease-Predictor`.
5. Use branch `main`.
6. Leave **Root Directory** empty because `requirements.txt` is in the repository root.
7. Set the runtime to Python.
8. Use these commands:

```text
Build Command: pip install -r requirements.txt
Start Command: gunicorn --chdir backend app:app
```

9. Select the free plan and create the service.

Render will provide a public backend URL, for example:

```text
https://your-backend-name.onrender.com
```

Test the URL by opening its root endpoint. It should return the API health-check message.

The backend reads Render's `PORT` environment variable and binds to `0.0.0.0`, which is required for Render.

## Deploy the Frontend on Netlify

1. Open [Netlify](https://www.netlify.com) and sign in with GitHub.
2. Choose **Add new site** and import the GitHub repository.
3. Configure the build:

```text
Base directory: frontend
Build command: npm run build
Publish directory: frontend/build
```

4. Add this environment variable in the Netlify site settings:

```text
Key: REACT_APP_API_URL
Value: https://your-backend-name.onrender.com
```

Use your real Render URL and do not append `/predict/diabetes` or `/predict/liver`.

5. Trigger a new deploy after saving the variable.
6. Open the Netlify URL and test both prediction pages.

## Git Commands

Check changes:

```powershell
git status
```

Commit changes:

```powershell
git add .
git commit -m "Describe your changes"
```

Push to GitHub:

```powershell
git push origin main
```

## Important Notes

- Keep the backend and frontend running in separate terminals during local development.
- The backend must be running before submitting predictions locally.
- Do not commit `frontend/node_modules`, `frontend/build`, `.env`, Python cache files, or secrets.
- Free Render services can sleep after inactivity, so the first request after a period of inactivity may be slow.
- This application is an educational prediction tool and does not replace professional medical diagnosis or advice.

## Troubleshooting

### `react-scripts is not recognized`

Install frontend dependencies from the frontend directory:

```powershell
cd "AI--Disease-Predictor-main\frontend"
npm.cmd install
```

### Port 3000 is already in use

A React server is already running. Open `http://localhost:3000`, or stop the existing server with `Ctrl+C` before starting another one.

### `FileNotFoundError: ./datasets/diabetes.csv`

The training datasets are missing. Add `datasets/diabetes.csv` and `datasets/indian_liver_patient.csv`, then run the training script from the project root.

### Predictions fail locally

Make sure both servers are running:

```text
Frontend: http://localhost:3000
Backend:  http://127.0.0.1:5000
```

For production, confirm that Netlify's `REACT_APP_API_URL` points to the deployed Render backend and redeploy the frontend after changing it.
