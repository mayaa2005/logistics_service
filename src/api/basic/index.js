import express from 'express';
import apiSupplier from './supplier';
import apiClient from './client';

let api = express.Router();
api.use('/supplier', apiSupplier);
api.use('/client', apiClient);

export default api;
