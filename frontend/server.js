const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Main route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', service: 'frontend' });
});

// Catch-all route - serve index.html for SPA behavior
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Frontend server running on http://0.0.0.0:${PORT}`);
    console.log(`📱 Access from network: http://YOUR_IP:${PORT}`);
    console.log(`💻 Local access: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});