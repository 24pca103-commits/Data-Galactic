const { getStatus, getPool } = require('../config/db');

// Fallback in-memory store initialized with default published testimonials
const feedbackMemoryStore = [
  {
    _id: 'fb-seed-1',
    name: 'Sarah Jenkins',
    clientType: 'International E-commerce Brand',
    region: 'United States',
    serviceType: 'Catalog Management & SKU Data Entry',
    rating: 5,
    quote: 'DataGalactic simplified our monthly catalog updating cycle. The turnaround was prompt, and the double-key verification caught discrepancies our internal team previously missed.',
    isPublished: true,
    status: 'published',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'fb-seed-2',
    name: 'David Reynolds',
    clientType: 'Logistics & Supply Chain Firm',
    region: 'United Kingdom',
    serviceType: 'Invoice Processing & Document Conversion',
    rating: 5,
    quote: 'Handling thousands of monthly invoice extractions became seamless once we outsourced to DataGalactic. Clean spreadsheets delivered on schedule without supervision overhead.',
    isPublished: true,
    status: 'published',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'fb-seed-3',
    name: 'Elena Rostova',
    clientType: 'Commercial Real Estate Agency',
    region: 'Europe',
    serviceType: 'Property Records & Lead Research',
    rating: 5,
    quote: 'The team adhered strictly to our data security SOPs and confidentiality guidelines. A reliable and responsive back-office partner for ongoing data maintenance.',
    isPublished: true,
    status: 'published',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
];

function mapRowToFeedback(row) {
  if (!row) return null;
  return {
    _id: row._id || String(row.id),
    id: row.id,
    name: row.name,
    clientType: row.clientType,
    region: row.region,
    serviceType: row.serviceType,
    rating: row.rating,
    quote: row.quote,
    email: row.email || '',
    company: row.company || '',
    isPublished: Boolean(row.isPublished),
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

const Feedback = {
  create: async (data) => {
    const _id = data._id || `fb-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const pool = getPool();
    if (getStatus() && pool) {
      const query = `
        INSERT INTO feedbacks (
          _id, name, clientType, region, serviceType, rating, quote, email, company, isPublished, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        _id,
        data.name,
        data.clientType || 'Corporate Client',
        data.region || 'Global',
        data.serviceType || 'Data Support Services',
        data.rating || 5,
        data.quote,
        data.email || '',
        data.company || '',
        data.isPublished ? 1 : 0,
        data.status || 'pending'
      ];
      await pool.execute(query, params);
      const [rows] = await pool.execute('SELECT * FROM feedbacks WHERE _id = ? LIMIT 1', [_id]);
      return mapRowToFeedback(rows[0]);
    } else {
      const record = {
        _id,
        ...data,
        isPublished: Boolean(data.isPublished),
        status: data.status || 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      feedbackMemoryStore.unshift(record);
      return record;
    }
  },

  find: (query = {}) => {
    const executeQuery = async () => {
      const pool = getPool();
      if (getStatus() && pool) {
        let sql = 'SELECT * FROM feedbacks WHERE 1=1';
        const params = [];

        if (query.isPublished !== undefined) {
          sql += ' AND isPublished = ?';
          params.push(query.isPublished ? 1 : 0);
        }
        if (query.status && query.status !== 'all') {
          sql += ' AND status = ?';
          params.push(query.status);
        }
        if (query._search) {
          sql += ' AND (name LIKE ? OR company LIKE ? OR quote LIKE ? OR clientType LIKE ?)';
          const pattern = `%${query._search}%`;
          params.push(pattern, pattern, pattern, pattern);
        }
        sql += ' ORDER BY createdAt DESC';
        const [rows] = await pool.execute(sql, params);
        return rows.map(mapRowToFeedback);
      } else {
        let list = [...feedbackMemoryStore];
        if (query.isPublished !== undefined) {
          list = list.filter(item => item.isPublished === query.isPublished);
        }
        if (query.status && query.status !== 'all') {
          list = list.filter(item => item.status === query.status);
        }
        return list;
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
      if (updateData.isPublished !== undefined) {
        updates.push('isPublished = ?');
        params.push(updateData.isPublished ? 1 : 0);
      }
      if (updateData.status !== undefined) {
        updates.push('status = ?');
        params.push(updateData.status);
      }
      if (updates.length > 0) {
        params.push(id, id);
        const sql = `UPDATE feedbacks SET ${updates.join(', ')} WHERE _id = ? OR id = ?`;
        await pool.execute(sql, params);
        const [rows] = await pool.execute('SELECT * FROM feedbacks WHERE _id = ? OR id = ? LIMIT 1', [id, id]);
        return mapRowToFeedback(rows[0]);
      }
    } else {
      const idx = feedbackMemoryStore.findIndex(item => String(item._id) === String(id) || String(item.id) === String(id));
      if (idx !== -1) {
        if (updateData.isPublished !== undefined) feedbackMemoryStore[idx].isPublished = updateData.isPublished;
        if (updateData.status !== undefined) feedbackMemoryStore[idx].status = updateData.status;
        feedbackMemoryStore[idx].updatedAt = new Date();
        return feedbackMemoryStore[idx];
      }
    }
    return null;
  },

  findByIdAndDelete: async (id) => {
    const pool = getPool();
    if (getStatus() && pool) {
      const [res] = await pool.execute('DELETE FROM feedbacks WHERE _id = ? OR id = ?', [id, id]);
      return res.affectedRows > 0;
    } else {
      const idx = feedbackMemoryStore.findIndex(item => String(item._id) === String(id) || String(item.id) === String(id));
      if (idx !== -1) {
        feedbackMemoryStore.splice(idx, 1);
        return true;
      }
    }
    return false;
  },

  countDocuments: async () => {
    const pool = getPool();
    if (getStatus() && pool) {
      const [rows] = await pool.execute('SELECT COUNT(*) as count FROM feedbacks');
      return rows[0].count;
    }
    return feedbackMemoryStore.length;
  }
};

module.exports = {
  Feedback,
  feedbackMemoryStore
};
