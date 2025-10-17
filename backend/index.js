const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'db',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'contacts',
  port: process.env.POSTGRES_PORT || 5432
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/contacts', async (req, res) => {
  const { rows } = await pool.query('SELECT id, name, email, phone FROM contacts ORDER BY id');
  res.json(rows);
});

app.post('/contacts', async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await pool.query(
    'INSERT INTO contacts (name, email, phone) VALUES ($1,$2,$3) RETURNING id,name,email,phone',
    [name,email,phone]
  );
  res.status(201).json(result.rows[0]);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));
