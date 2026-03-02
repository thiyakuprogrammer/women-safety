const mysql = require('mysql2/promise');
require('dotenv').config();

// Initialize database and tables
async function initializeDatabase() {
  let connection;
  
  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '12345'
    });

    console.log('Connected to MySQL server');

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'women_safety_db'}`);
    console.log(`✓ Database '${process.env.DB_NAME || 'women_safety_db'}' created/verified`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'women_safety_db'}`);

    // Create emergency_services table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS emergency_services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        distance VARCHAR(50),
        available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Table emergency_services created/verified');

    // Create helplines table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS helplines (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        number VARCHAR(20) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        available_24_7 BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Table helplines created/verified');

    // Create sos_alerts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sos_alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        alert_id VARCHAR(100) UNIQUE NOT NULL,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        message TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP NULL
      )
    `);
    console.log('✓ Table sos_alerts created/verified');

    // Create location_shares table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS location_shares (
        id INT AUTO_INCREMENT PRIMARY KEY,
        share_id VARCHAR(100) UNIQUE NOT NULL,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        contacts TEXT,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NULL
      )
    `);
    console.log('✓ Table location_shares created/verified');

    // Create unsafe_reports table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS unsafe_reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        report_id VARCHAR(100) UNIQUE NOT NULL,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        description TEXT,
        risk_level VARCHAR(50),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Table unsafe_reports created/verified');

    // Insert sample data for emergency services
    const [services] = await connection.query('SELECT COUNT(*) as count FROM emergency_services');
    if (services[0].count === 0) {
      await connection.query(`
        INSERT INTO emergency_services (name, type, phone, latitude, longitude, distance, available) VALUES
        ('City Police Station', 'Police', '100', 28.6139, 77.2090, '0.8 km', true),
        ('General Hospital', 'Hospital', '102', 28.6149, 77.2100, '1.2 km', true),
        ('Fire Station', 'Fire', '101', 28.6129, 77.2080, '2.1 km', true),
        ('Women Police Station', 'Police', '1091', 28.6159, 77.2110, '1.5 km', true)
      `);
      console.log('✓ Sample emergency services inserted');
    }

    // Insert sample data for helplines
    const [helplines] = await connection.query('SELECT COUNT(*) as count FROM helplines');
    if (helplines[0].count === 0) {
      await connection.query(`
        INSERT INTO helplines (name, number, category, description, available_24_7) VALUES
        ('National Emergency', '112', 'emergency', 'All emergencies', true),
        ('Women Helpline', '1091', 'women', '24/7 women support', true),
        ('Police', '100', 'police', 'Police assistance', true),
        ('Ambulance', '102', 'medical', 'Medical emergency', true),
        ('Fire Service', '101', 'fire', 'Fire emergency', true),
        ('Child Helpline', '1098', 'child', 'Child protection', true)
      `);
      console.log('✓ Sample helplines inserted');
    }

    console.log('\n✓ Database initialization completed successfully!\n');

  } catch (error) {
    console.error('✗ Database initialization failed:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = initializeDatabase;
