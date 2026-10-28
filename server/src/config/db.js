const mysql = require('mysql2/promise');

let pool = null;
let isConnected = false;

const seedFeedbacks = [
  {
    _id: 'fb-seed-1',
    name: 'Sarah Jenkins',
    clientType: 'International E-commerce Brand',
    region: 'United States',
    serviceType: 'Catalog Management & SKU Data Entry',
    rating: 5,
    quote: 'DataGalactic simplified our monthly catalog updating cycle. The turnaround was prompt, and the double-key verification caught discrepancies our internal team previously missed.',
    isPublished: 1,
    status: 'published'
  },
  {
    _id: 'fb-seed-2',
    name: 'David Reynolds',
    clientType: 'Logistics & Supply Chain Firm',
    region: 'United Kingdom',
    serviceType: 'Invoice Processing & Document Conversion',
    rating: 5,
    quote: 'Handling thousands of monthly invoice extractions became seamless once we outsourced to DataGalactic. Clean spreadsheets delivered on schedule without supervision overhead.',
    isPublished: 1,
    status: 'published'
  },
  {
    _id: 'fb-seed-3',
    name: 'Elena Rostova',
    clientType: 'Commercial Real Estate Agency',
    region: 'Europe',
    serviceType: 'Property Records & Lead Research',
    rating: 5,
    quote: 'The team adhered strictly to our data security SOPs and confidentiality guidelines. A reliable and responsive back-office partner for ongoing data maintenance.',
    isPublished: 1,
    status: 'published'
  }
];

async function initTables() {
  if (!pool) return;

  const createEnquiriesSQL = `
    CREATE TABLE IF NOT EXISTS enquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      _id VARCHAR(64) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      companyName VARCHAR(120) NOT NULL,
      email VARCHAR(120) NOT NULL,
      country VARCHAR(80) NOT NULL,
      service VARCHAR(100) NOT NULL,
      projectType VARCHAR(80) DEFAULT 'One-time Project',
      estimatedVolume VARCHAR(100) DEFAULT 'Not specified',
      description TEXT NOT NULL,
      phone VARCHAR(30) DEFAULT '',
      status VARCHAR(50) DEFAULT 'New Lead',
      adminNotes TEXT DEFAULT NULL,
      file_originalName VARCHAR(255) DEFAULT NULL,
      file_storedName VARCHAR(255) DEFAULT NULL,
      file_mimeType VARCHAR(100) DEFAULT NULL,
      file_size INT DEFAULT NULL,
      file_path VARCHAR(255) DEFAULT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  const createFeedbacksSQL = `
    CREATE TABLE IF NOT EXISTS feedbacks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      _id VARCHAR(64) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      clientType VARCHAR(120) DEFAULT 'Corporate Client',
      region VARCHAR(80) DEFAULT 'Global',
      serviceType VARCHAR(120) DEFAULT 'Data Support Services',
      rating INT DEFAULT 5,
      quote TEXT NOT NULL,
      email VARCHAR(120) DEFAULT '',
      company VARCHAR(120) DEFAULT '',
      isPublished TINYINT(1) DEFAULT 0,
      status VARCHAR(50) DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  try {
    await pool.execute(createEnquiriesSQL);
    await pool.execute(createFeedbacksSQL);

    // Seed default feedbacks if table is empty
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM feedbacks');
    if (rows[0].count === 0) {
      for (const fb of seedFeedbacks) {
        await pool.execute(
          `INSERT INTO feedbacks (_id, name, clientType, region, serviceType, rating, quote, isPublished, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [fb._id, fb.name, fb.clientType, fb.region, fb.serviceType, fb.rating, fb.quote, fb.isPublished, fb.status]
        );
      }
    }
  } catch (err) {
    console.warn('[DataGalactic DB] Warning during MySQL table initialization:', err.message);
  }
}

const connectDB = async () => {
  try {
    let poolConfig;

    if (process.env.MYSQL_URL) {
      poolConfig = {
        uri: process.env.MYSQL_URL,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      };
    } else {
      poolConfig = {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: Number(process.env.MYSQL_PORT) || 3306,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'datagalactic',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      };
    }

    const dbName = process.env.MYSQL_DATABASE || 'datagalactic';

    if (!process.env.MYSQL_URL) {
      // Ensure database exists before creating the pool
      try {
        const rootConn = await mysql.createConnection({
          host: process.env.MYSQL_HOST || '127.0.0.1',
          port: Number(process.env.MYSQL_PORT) || 3306,
          user: process.env.MYSQL_USER || 'root',
          password: process.env.MYSQL_PASSWORD || ''
        });
        await rootConn.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await rootConn.end();
      } catch (dbCreateErr) {
        // If user does not have permission to create DB, proceed to pool creation
      }
    }

    pool = mysql.createPool(poolConfig);

    // Test connection
    const connection = await pool.getConnection();
    connection.release();

    isConnected = true;
    console.log(`[DataGalactic DB] MySQL Connected successfully!`);

    await initTables();
  } catch (error) {
    console.warn(`[DataGalactic DB] MySQL connection failed (${error.message}). Running with hybrid in-memory storage.`);
    isConnected = false;
  }
};

const getStatus = () => isConnected;
const getPool = () => pool;

module.exports = { connectDB, getStatus, getPool };
