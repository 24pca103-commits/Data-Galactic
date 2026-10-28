const { getStatus, getPool } = require('../config/db');

// Fallback in-memory store if MySQL is offline
const memoryStore = [];

function mapRowToEnquiry(row) {
  if (!row) return null;
  const enquiry = {
    _id: row._id || String(row.id),
    id: row.id,
    name: row.name,
    companyName: row.companyName,
    email: row.email,
    country: row.country,
    service: row.service,
    projectType: row.projectType,
    estimatedVolume: row.estimatedVolume,
    description: row.description,
    phone: row.phone || '',
    status: row.status,
    adminNotes: row.adminNotes || '',
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
  if (row.file_originalName) {
    enquiry.file = {
      originalName: row.file_originalName,
      storedName: row.file_storedName,
      mimeType: row.file_mimeType,
      size: row.file_size,
      path: row.file_path
    };
  }
  return enquiry;
}

const Enquiry = {
  create: async (data) => {
    const _id = data._id || `lead-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const pool = getPool();
    if (getStatus() && pool) {
      const file = data.file || {};
      const query = `
        INSERT INTO enquiries (
          _id, name, companyName, email, country, service, projectType, estimatedVolume,
          description, phone, status, adminNotes, file_originalName, file_storedName,
          file_mimeType, file_size, file_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        _id,
        data.name,
        data.companyName,
        data.email,
        data.country,
        data.service,
        data.projectType || 'One-time Project',
        data.estimatedVolume || 'Not specified',
        data.description,
        data.phone || '',
        data.status || 'New Lead',
        data.adminNotes || null,
        file.originalName || null,
        file.storedName || null,
        file.mimeType || null,
        file.size || null,
        file.path || null
      ];
      await pool.execute(query, params);
      const [rows] = await pool.execute('SELECT * FROM enquiries WHERE _id = ? LIMIT 1', [_id]);
      return mapRowToEnquiry(rows[0]);
    } else {
      const record = {
        _id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: data.status || 'New Lead'
      };
      memoryStore.unshift(record);
      return record;
    }
  },

  find: (query = {}) => {
    const executeQuery = async () => {
      const pool = getPool();
      if (getStatus() && pool) {
        let sql = 'SELECT * FROM enquiries WHERE 1=1';
        const params = [];

        if (query.status && query.status !== 'all') {
          sql += ' AND status = ?';
          params.push(query.status);
        }
        if (query.$or && Array.isArray(query.$or)) {
          // If regex was passed from admin controller
          const searchVal = query._search || '';
          if (searchVal) {
            sql += ' AND (name LIKE ? OR companyName LIKE ? OR email LIKE ? OR service LIKE ?)';
            const pattern = `%${searchVal}%`;
            params.push(pattern, pattern, pattern, pattern);
          }
        }
        sql += ' ORDER BY createdAt DESC';
        const [rows] = await pool.execute(sql, params);
        return rows.map(mapRowToEnquiry);
      } else {
        return memoryStore;
      }
    };

    return {
      sort: () => ({
        lean: executeQuery
      }),
      lean: executeQuery,
      then: (resolve, reject) => executeQuery().then(resolve, reject)
    };
  },

  findByIdAndUpdate: async (id, updateData, options = {}) => {
    const pool = getPool();
    if (getStatus() && pool) {
      const updates = [];
      const params = [];
      if (updateData.status !== undefined) {
        updates.push('status = ?');
        params.push(updateData.status);
      }
      if (updateData.adminNotes !== undefined) {
        updates.push('adminNotes = ?');
        params.push(updateData.adminNotes);
      }
      if (updates.length > 0) {
        params.push(id, id);
        const sql = `UPDATE enquiries SET ${updates.join(', ')} WHERE _id = ? OR id = ?`;
        await pool.execute(sql, params);
        const [rows] = await pool.execute('SELECT * FROM enquiries WHERE _id = ? OR id = ? LIMIT 1', [id, id]);
        return mapRowToEnquiry(rows[0]);
      }
    } else {
      const idx = memoryStore.findIndex(item => String(item._id) === String(id) || String(item.id) === String(id));
      if (idx !== -1) {
        if (updateData.status) memoryStore[idx].status = updateData.status;
        if (updateData.adminNotes !== undefined) memoryStore[idx].adminNotes = updateData.adminNotes;
        memoryStore[idx].updatedAt = new Date();
        return memoryStore[idx];
      }
    }
    return null;
  },

  findByIdAndDelete: async (id) => {
    const pool = getPool();
    if (getStatus() && pool) {
      const [res] = await pool.execute('DELETE FROM enquiries WHERE _id = ? OR id = ?', [id, id]);
      return res.affectedRows > 0;
    } else {
      const idx = memoryStore.findIndex(item => String(item._id) === String(id) || String(item.id) === String(id));
      if (idx !== -1) {
        memoryStore.splice(idx, 1);
        return true;
      }
    }
    return false;
  },

  countDocuments: async () => {
    const pool = getPool();
    if (getStatus() && pool) {
      const [rows] = await pool.execute('SELECT COUNT(*) as count FROM enquiries');
      return rows[0].count;
    }
    return memoryStore.length;
  }
};

module.exports = {
  Enquiry,
  memoryStore
};
