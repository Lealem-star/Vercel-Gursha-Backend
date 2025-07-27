require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const connectDB = require('./config/db');
const adminRoutes = require('./routes/AdminRoutes');
const userRoutes = require('./routes/UserRoutes');
const gameRoutes = require('./routes/GameRoutes');
const participantRoutes = require('./routes/ParticipantRoutes');
const prizeRoutes = require('./routes/PrizeRoutes');
const authRoutes = require('./routes/auth');
const { createAdminUser } = require('./scripts/createAdmin');

const app = express();
const PORT = process.env.PORT || 5000;

// Simple CORS configuration
app.use(cors({
    origin: 'https://vercel-gursha-frontend.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version']
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path} - Origin: ${req.headers.origin} - ${new Date().toISOString()}`);
    next();
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('📁 Created uploads directory');
}

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB().then(() => {
    console.log('✅ Database connected');
    createAdminUser().catch(err => console.error('Admin creation error:', err));
}).catch(error => {
    console.error('❌ Database connection failed:', error);
});

// Root route for health check
app.get('/', (req, res) => {
    res.json({
        message: 'Gursha Backend API is running!',
        timestamp: new Date().toISOString()
    });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/prizes', prizeRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
