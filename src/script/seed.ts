import pool from '../configuration/database';

async function seedDatabase() {
  try {
    console.log('Insertion des étudiants de test...');
    await pool.query(`
      INSERT INTO students (first_name, last_name) VALUES 
      ('Jean', 'Dupont'),
      ('Marie', 'Curie')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Données insérées avec succès !');
  } catch (error) {
    console.error('Erreur lors du seeding :', error);
  } finally {
    await pool.end();
  }
}

seedDatabase();