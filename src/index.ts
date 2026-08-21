import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './middleware/middleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  const token = jwt.sign({ id: 1, email: 'student@test.com' }, process.env.JWT_SECRET!, {
    expiresIn: '2h',
  });
  res.json({ token });
});

app.get('/api/students', authenticateToken, (req, res) => {
  res.json({ message: 'List of students' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));