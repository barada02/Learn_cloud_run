from fastapi import FastAPI
from fastapi.responses import JSONResponse
import os
import random
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="Google Cloud Run FastAPI Demo",
    description="A simple FastAPI application for learning Google Cloud Run deployment",
    version="1.0.0"
)

@app.get("/")
async def welcome():
    """
    Welcome endpoint - returns a greeting message
    """
    return {
        "message": "Welcome to FastAPI on Google Cloud Run!",
        "status": "success",
        "service": "fastapi-cloud-run-demo"
    }

@app.get("/secret")
async def get_secret():
    """
    Secret endpoint - returns API key from environment variables
    """
    api_key = os.getenv("API_KEY", "No API key found")
    database_url = os.getenv("DATABASE_URL", "No database URL found")
    
    return {
        "api_key": api_key,
        "database_url": database_url,
        "message": "Secret data retrieved from environment variables"
    }

@app.get("/random")
async def get_random():
    """
    Random endpoint - returns random data
    """
    random_number = random.randint(1, 1000)
    random_choices = ["apple", "banana", "orange", "grape", "strawberry"]
    random_fruit = random.choice(random_choices)
    random_boolean = random.choice([True, False])
    
    return {
        "random_number": random_number,
        "random_fruit": random_fruit,
        "random_boolean": random_boolean,
        "random_float": round(random.uniform(0, 100), 2),
        "message": "Here's some random data for you!"
    }

@app.get("/health")
async def health_check():
    """
    Health check endpoint for Cloud Run
    """
    return {"status": "healthy", "service": "running"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)