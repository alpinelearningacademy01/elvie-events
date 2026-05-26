/**
 * Seed / promote an admin in the VenuePartner collection.
 * Usage: node src/utils/seedAdmin.js
 *
 * ALL values must be set in .env — no hardcoded defaults.
 * Required env vars:
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD  (only needed when creating a new account)
 *   ADMIN_NAME      (only needed when creating a new account)
 *   ADMIN_PHONE_CODE       (optional, default +971)
 *   ADMIN_PHONE_NUMBER     (optional)
 *   ADMIN_VENUE_NAME       (optional)
 */

require('dotenv').config();
const VenuePartner = require('../models/VenuePartner');
const connectDB = require('../config/db');

const seedAdmin = async () => {
    const email    = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name     = process.env.ADMIN_NAME;

    if (!email) {
        console.error('\n❌  Set ADMIN_EMAIL in your .env file first.\n');
        process.exit(1);
    }

    await connectDB();

    const existing = await VenuePartner.findOne({ email });

    if (existing) {
        if (existing.role === 'admin') {
            console.log(`\n✅  Already an admin: ${email}\n`);
        } else {
            existing.role = 'admin';
            await existing.save();
            console.log(`\n✅  Promoted to admin:`);
            console.log(`   Name:  ${existing.name}`);
            console.log(`   Email: ${existing.email}\n`);
        }
        process.exit(0);
    }

    // Creating a new account — password + name required
    if (!password || !name) {
        console.error('\n❌  No account found for that email.');
        console.error('    To create one, also set ADMIN_PASSWORD and ADMIN_NAME in .env.\n');
        process.exit(1);
    }

    const admin = await VenuePartner.create({
        name,
        email,
        password,
        phoneCode:   process.env.ADMIN_PHONE_CODE   || '+971',
        phoneNumber: process.env.ADMIN_PHONE_NUMBER || `admin_${Date.now()}`,
        venueName:   process.env.ADMIN_VENUE_NAME   || 'Admin',
        role:        'admin',
    });

    console.log(`\n✅  Admin created in VenuePartner collection:`);
    console.log(`   Name:  ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role:  ${admin.role}\n`);
    process.exit(0);
};

seedAdmin().catch(err => {
    console.error('❌  Seed failed:', err.message);
    process.exit(1);
});
