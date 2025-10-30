# FastAPI Google Cloud Run Demo

A simple FastAPI application designed for learning Google Cloud Run deployment with Docker.

## Features

This application includes three main endpoints:

1. **Welcome Endpoint** (`/`) - Returns a greeting message
2. **Secret Endpoint** (`/secret`) - Shows environment variables (API keys, database URLs, etc.)
3. **Random Endpoint** (`/random`) - Returns random data (numbers, strings, booleans)
4. **Health Check** (`/health`) - Health check endpoint for Cloud Run

## Project Structure

```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── Dockerfile          # Docker configuration
├── .env               # Environment variables (for local development)
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Local Development

### Prerequisites

- Python 3.11 or higher
- Docker (for containerization)

### Setup

1. **Clone the repository and navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On macOS/Linux
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

5. **Access the interactive API documentation**:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### 1. Welcome Endpoint
- **URL**: `/`
- **Method**: GET
- **Description**: Returns a welcome message
- **Response**:
  ```json
  {
    "message": "Welcome to FastAPI on Google Cloud Run!",
    "status": "success",
    "service": "fastapi-cloud-run-demo"
  }
  ```

### 2. Secret Endpoint
- **URL**: `/secret`
- **Method**: GET
- **Description**: Returns environment variables (API keys, database URLs)
- **Response**:
  ```json
  {
    "api_key": "your_dummy_api_key_12345",
    "database_url": "postgresql://user:password@localhost:5432/mydb",
    "message": "Secret data retrieved from environment variables"
  }
  ```

### 3. Random Endpoint
- **URL**: `/random`
- **Method**: GET
- **Description**: Returns random data
- **Response**:
  ```json
  {
    "random_number": 42,
    "random_fruit": "apple",
    "random_boolean": true,
    "random_float": 73.45,
    "message": "Here's some random data for you!"
  }
  ```

### 4. Health Check
- **URL**: `/health`
- **Method**: GET
- **Description**: Health check endpoint for monitoring
- **Response**:
  ```json
  {
    "status": "healthy",
    "service": "running"
  }
  ```

## Docker

### Build the Docker Image

```bash
docker build -t fastapi-cloud-run .
```

### Run the Container Locally

```bash
docker run -p 8080:8080 fastapi-cloud-run
```

The application will be available at `http://localhost:8080`

## Google Cloud Run Deployment

### Prerequisites

- Google Cloud SDK installed and configured
- Docker installed
- A Google Cloud Project with Cloud Run API enabled

### Deployment Steps

1. **Build and tag the image for Google Container Registry**:
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/fastapi-cloud-run .
   ```

2. **Push the image to Google Container Registry**:
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/fastapi-cloud-run
   ```

3. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy fastapi-cloud-run \
     --image gcr.io/YOUR_PROJECT_ID/fastapi-cloud-run \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

4. **Set environment variables in Cloud Run** (optional):
   ```bash
   gcloud run services update fastapi-cloud-run \
     --set-env-vars API_KEY=your_production_api_key,DATABASE_URL=your_production_db_url \
     --region us-central1
   ```

### Alternative: Deploy from Source

You can also deploy directly from source code:

```bash
gcloud run deploy fastapi-cloud-run \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Environment Variables

The application uses the following environment variables:

- `PORT`: Port number (default: 8000 locally, 8080 in container)
- `API_KEY`: Dummy API key for demonstration
- `DATABASE_URL`: Database connection string
- `SECRET_TOKEN`: Secret token for authentication
- `ENVIRONMENT`: Current environment (development/production)

## Security Notes

- The `.env` file contains dummy credentials for development only
- Never commit real secrets to version control
- Use Google Cloud Secret Manager for production secrets
- The `/secret` endpoint is for demonstration purposes only

## Next Steps for Learning

1. **Add authentication** using JWT tokens
2. **Implement database connections** using SQLAlchemy
3. **Add logging and monitoring** with Google Cloud Logging
4. **Implement CI/CD** with GitHub Actions or Cloud Build
5. **Use Google Cloud Secret Manager** for secure secret management
6. **Add tests** using pytest
7. **Implement rate limiting** and security headers