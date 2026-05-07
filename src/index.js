const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const venuePartnerRoutes = require('./routes/venuePartnerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const clientDirectoryRoutes = require('./routes/clientDirectoryRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/venue-partner', venuePartnerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/client-directory', clientDirectoryRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
