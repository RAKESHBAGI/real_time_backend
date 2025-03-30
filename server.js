const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config(); // Load environment variables

const app = express(); // Initialize Express
const server = http.createServer(app); // Create HTTP server

// Middleware to parse JSON
app.use(express.json());

// Temporarily disable MongoDB connection (comment out these lines)
// const connectDB = require('./config/db');
// connectDB();

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for real-time collaboration events
    socket.on('update-document', (data) => {
        socket.broadcast.emit('receive-changes', data); // Broadcast changes to other clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Sample Test Route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));