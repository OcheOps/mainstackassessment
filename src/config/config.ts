import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/store',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    port: process.env.PORT || 3000,
};

export default config; // Add this line to export the config object as a module