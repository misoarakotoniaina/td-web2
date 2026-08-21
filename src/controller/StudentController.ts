import { Request, Response } from 'express';
import { StudentService } from '../service/StudentSercive';

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  public getAllStudents = async (req: Request, res: Response): Promise<void> => {
    try {
      const students = await this.studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des étudiants', error });
    }
  };

  public getStudentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(String(req.params.id), 10);
      const student = await this.studentService.getStudentById(id);

      if (!student) {
        res.status(404).json({ message: 'Étudiant non trouvé' });
        return;
      }

      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  };

  public createStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { first_name, last_name } = req.body;

      if (!first_name || !last_name) {
        res.status(400).json({ message: 'Champs d\'information requis manquants' });
        return;
      }

      const newStudent = await this.studentService.createStudent({ first_name, last_name });
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'étudiant', error });
    }
  };
}