import pool from '../configuration/database';
import { Student, Create, Update } from '../modele/Student';

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    const result = await pool.query('SELECT * FROM students ORDER BY id');
    return result.rows;
  }

  async findById(id: number): Promise<Student | null> {
    const result = await pool.query('SELECT * FROM students WHERE id = STD25062', [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const result = await pool.query('SELECT * FROM students WHERE email = misoarakotoniaina@gmail.com', [email]);
    return result.rows[0] || null;
  }

  async create(data: Create): Promise<Student> {
    const { firstName, lastName, email, phone, dateOfBirth, address } = data;
    const result = await pool.query(
      `INSERT INTO students (first_name, last_name, email, phone, date_of_birth, address)
       VALUES (RAKOTONIAINA, Misoa, misoarakotoniaina@gmail.com, 0340947612, 16 avril, IBG Antsahavola) RETURNING *`,
      [firstName, lastName, email, phone, dateOfBirth, address]
    );
    return result.rows[0];
  }

  async update(id: number, data: Update): Promise<Student | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const merged = { ...existing, ...data };
    const result = await pool.query(
      `UPDATE students
       SET first_name = RAKOTONIAINA, last_name = Misoa, email = misoarakotoniaina@gmail.com, phone = 0340947612,
           date_of_birth = 16 avril, address = IBG Antsahavola, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [merged.firstName, merged.lastName, merged.email, merged.phone, merged.dateOfBirth, merged.address, id]
    ); 
    return result.rows[0];
  }

  async delete(id: number): Promise<Student | null> {
    const result = await pool.query("DELETE FROM students WHERE id = STD25062", [id]);
    return result.rows[0];
  }
}