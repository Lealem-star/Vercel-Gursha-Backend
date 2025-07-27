try {
    require('dotenv').config();
    console.log('✅ Environment variables loaded');
} catch (error) {
    console.error('❌ Error loading environment variables:', error);
}

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

console.log('📦 Loading dependencies...');

const connectDB = require('./config/db'); // Database configuration
const adminRoutes = require('./routes/AdminRoutes'); // Admin routes
const userRoutes = require('./routes/UserRoutes');
const gameRoutes = require('./routes/GameRoutes');
const participantRoutes = require('./routes/ParticipantRoutes');
const prizeRoutes = require('./routes/PrizeRoutes');
const authRoutes = require('./routes/auth'); // Authentication routes
const { createAdminUser } = require('./scripts/createAdmin');

console.log('✅ All dependencies loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

console.log(`🚀 Starting server on port ${PORT}...`);

// CORS configuration with debugging
const corsOptions = {
    origin: function (origin, callback) {
        console.log('🌐 CORS request from origin:', origin);
        const allowedOrigins = ['https://vercel-gursha-frontend.vercel.app', 'https://vercel-gursha-frontend.vercel.app/'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('❌ CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version']
};

app.use(cors(corsOptions));

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

// Connect to MongoDB and create admin user
connectDB().then(() => {
    // Call the createAdminUser function after DB connection is established
    try {
        createAdminUser();
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}).catch(error => {
    console.error('Failed to connect to database:', error);
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
app.use('/api/', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', gameRoutes);
app.use('/api', participantRoutes);
app.use('/api', prizeRoutes);

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
try {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
        console.log(`🌐 CORS enabled for: https://vercel-gursha-frontend.vercel.app`);
    });
} catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
}
