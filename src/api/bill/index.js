import express from 'express';
import apiExtra from './extra';

let api = express.Router();
api.use('/extra', apiExtra);

export default api;
