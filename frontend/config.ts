import dotenv from 'dotenv';
dotenv.config();

const  BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";


export {BACKEND_URL}