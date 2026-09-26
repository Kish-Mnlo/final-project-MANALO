// The data-access layer, the same shape as m5a3.
//
// Every query is parameterised: values go in the array, never into the string.
// This is the single most important habit in database code, and it is what
// stops "'; DROP TABLE sightings; --" in a form field from being a real
// problem.

export async function getAll(pool) {
  const result = await pool.query(
    'SELECT * FROM artwork ORDER BY date_made DESC'
  )
  return result.rows
}

export async function getById(pool, id) {
  const result = await pool.query('SELECT * FROM artwork WHERE id = $1', [id])
  return result.rows[0] ?? null
}

export async function create(pool, { name, category_id, date_made, description, image_path }) {
  const result = await pool.query(
    `INSERT INTO artwork (name, category_id, date_made, description, image_path)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, category_id, date_made, description ?? '', image_path]
  )
  return result.rows[0]
}

export async function update(pool, id, { name, category_id, date_made, description, image_path }) {
  const result = await pool.query(
    `UPDATE artwork
     SET name = $1, category_id = $2, date_made = $3, description = $4, image_path = $5
     WHERE id = $6
     RETURNING *`,
    [name, category_id, date_made, description ?? '', image_path, id]
  )
  return result.rows[0] ?? null
}

export async function remove(pool, id) {
  const result = await pool.query(
    'DELETE FROM artwork WHERE id = $1 RETURNING id',
    [id]
  )
  return result.rowCount > 0
}
