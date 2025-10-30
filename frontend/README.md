# FastAPI Cloud Run Frontend

A modern, responsive frontend interface for testing the FastAPI Cloud Run backend API endpoints.

## 🌟 Features

- **Clean, Modern UI**: Responsive design with gradient backgrounds and smooth animations
- **Real-time API Testing**: Interactive buttons to test all backend endpoints
- **Error Handling**: Comprehensive error handling with user-friendly modals
- **Performance Monitoring**: Built-in performance logging for API calls
- **Keyboard Shortcuts**: Quick access to all endpoints via keyboard shortcuts
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Health Monitoring**: Automatic health checks and network status monitoring

## 🚀 API Integration

The frontend connects to the FastAPI backend deployed on Google Cloud Run:
- **Backend URL**: `https://learn-cloud-run-backend-797563351214.us-central1.run.app`
- **Endpoints Tested**:
  - `/` - Welcome message
  - `/secret` - Environment variables and secrets
  - `/random` - Random data generation
  - `/health` - Service health check

## 📁 Project Structure

```
frontend/
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive design
├── script.js           # JavaScript functionality and API calls
├── Dockerfile          # Docker configuration for Cloud Run
├── nginx.conf          # Nginx configuration
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🏠 Local Development

### Option 1: Simple HTTP Server (Python)

```powershell
# Navigate to frontend directory
cd frontend

# Start a simple HTTP server
python -m http.server 8000

# Open browser to http://localhost:8000
```

### Option 2: Simple HTTP Server (Node.js)

```powershell
# Install a simple HTTP server globally
npm install -g http-server

# Navigate to frontend directory
cd frontend

# Start the server
http-server -p 8000

# Open browser to http://localhost:8000
```

### Option 3: Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🐳 Docker Development

### Build the Docker Image

```powershell
# Navigate to frontend directory
cd frontend

# Build the Docker image
docker build -t fastapi-frontend .
```

### Run the Container Locally

```powershell
# Run the container
docker run -p 8080:8080 fastapi-frontend

# Open browser to http://localhost:8080
```

## ☁️ Google Cloud Run Deployment

### Prerequisites

- Google Cloud SDK installed and configured
- Docker installed
- A Google Cloud Project with Cloud Run API enabled

### Deployment Steps

1. **Build and tag the image for Google Container Registry**:
   ```powershell
   docker build -t gcr.io/YOUR_PROJECT_ID/fastapi-frontend .
   ```

2. **Push the image to Google Container Registry**:
   ```powershell
   docker push gcr.io/YOUR_PROJECT_ID/fastapi-frontend
   ```

3. **Deploy to Cloud Run**:
   ```powershell
   gcloud run deploy fastapi-frontend \
     --image gcr.io/YOUR_PROJECT_ID/fastapi-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080
   ```

### Alternative: Deploy from Source

```powershell
gcloud run deploy fastapi-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## 🎯 Usage

### Interactive Testing

1. **Welcome Endpoint**: Click "Get Welcome Message" to test the root endpoint
2. **Secret Endpoint**: Click "Get Secret Data" to retrieve environment variables
3. **Random Endpoint**: Click "Get Random Data" to generate random values
4. **Health Check**: Click "Check Health" to verify service status
5. **Test All**: Click "Test All Endpoints" to run all tests simultaneously

### Keyboard Shortcuts

- `Ctrl/Cmd + 1`: Test Welcome endpoint
- `Ctrl/Cmd + 2`: Test Secret endpoint
- `Ctrl/Cmd + 3`: Test Random endpoint
- `Ctrl/Cmd + 4`: Test Health endpoint
- `Ctrl/Cmd + 0`: Test All endpoints
- `Escape`: Close error modal

### Response Display

- **Success**: Green border with formatted JSON response
- **Loading**: Blue border with loading indicator
- **Error**: Red border with error message and details

## 🔧 Configuration

### Backend URL Configuration

Currently, the backend URL is hardcoded in `script.js`:

```javascript
const BACKEND_URL = 'https://learn-cloud-run-backend-797563351214.us-central1.run.app';
```

**Future Enhancement**: This will be moved to environment variables for better secret management.

### Nginx Configuration

The `nginx.conf` file includes:
- **Security Headers**: XSS protection, content type options, frame options
- **Gzip Compression**: For better performance
- **Caching**: Static file caching for optimal load times
- **Health Check**: `/health` endpoint for Cloud Run monitoring

## 🛡️ Security Features

- **Content Security Policy**: Prevents XSS attacks
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **HTTPS Only**: All API calls use HTTPS
- **Error Handling**: Sensitive error information is not exposed

## 📱 Responsive Design

The frontend is fully responsive and tested on:
- **Desktop**: 1200px+ screens
- **Tablet**: 768px - 1199px screens
- **Mobile**: 320px - 767px screens

### Mobile Features

- Touch-friendly buttons
- Optimized layout for small screens
- Readable font sizes
- Easy navigation

## 🔍 Monitoring and Debugging

### Browser Console Logs

The application provides detailed console logging:
- API call performance metrics
- Error details and stack traces
- Network status changes
- Keyboard shortcut information

### Performance Monitoring

- Automatic logging of API response times
- Warnings for slow responses (>5s)
- Network connectivity monitoring

## 🎨 Customization

### Styling

The CSS uses:
- **CSS Grid**: For responsive layout
- **Flexbox**: For component alignment
- **CSS Variables**: For easy theming (can be added)
- **Gradient Backgrounds**: Modern visual appeal
- **Smooth Animations**: Enhanced user experience

### Color Scheme

- **Primary**: Blue gradient (`#4facfe` to `#00f2fe`)
- **Secondary**: Pink/Yellow gradient (`#fa709a` to `#fee140`)
- **Accent**: Teal/Pink gradient (`#a8edea` to `#fed6e3`)
- **Success**: Green/Yellow gradient (`#96fbc4` to `#f9f586`)

## 🚧 Future Enhancements

1. **Environment Variables**: Move backend URL to environment configuration
2. **Authentication**: Add JWT token support
3. **Real-time Updates**: WebSocket integration for live data
4. **Offline Support**: Service worker for offline functionality
5. **Dark Mode**: Toggle between light and dark themes
6. **API Documentation**: Embedded API documentation viewer
7. **Testing Suite**: Automated frontend tests
8. **Analytics**: User interaction tracking

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend has proper CORS configuration
2. **Network Errors**: Check if the backend URL is accessible
3. **Container Issues**: Verify Docker is running and ports are available
4. **Mobile Layout**: Clear browser cache if layout appears broken

### Debug Mode

Open browser developer tools to:
- View detailed console logs
- Monitor network requests
- Inspect API responses
- Check performance metrics

## 📄 License

This project is for educational purposes as part of Google Cloud Run learning.