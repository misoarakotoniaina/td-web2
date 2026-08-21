import { StudentRepository } from '../repositories/StudentRepository';
import { Student } from '../modele/Student';

export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  public async getAllStudents(): Promise<Student[]> {
    return await this.studentRepository.findAll();
  }

  public async getStudentById(id: number): Promise<Student | null> {
    return await this.studentRepository.findById(id);
  }

  public async createStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
    return await this.studentRepository.create(studentData);
  }
}