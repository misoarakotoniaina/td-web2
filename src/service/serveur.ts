import express from 'express';
import dotenv from 'dotenv';
import { StudentController } from '../controller/StudentController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const studentController = new StudentController();

app.get('/students', studentController.getAllStudents);
app.get('/students/:id', studentController.getStudentById);
app.post('/students', studentController.createStudent);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});