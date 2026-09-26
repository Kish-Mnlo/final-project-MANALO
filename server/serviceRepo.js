// The data-access layer, the same shape as m5a3.
//
// Every query is parameterised: values go in the array, never into the string.
// This is the single most important habit in database code, and it is what
// stops "'; DROP TABLE sightings; --" in a form field from being a real
// problem.

export async function getAll(pool) {
    const result = await pool.query(
        'SELECT * FROM service'
    )

    return result.rows
}

export async function getById(pool, id) {
    const result = await pool.query(
        'SELECT * FROM service WHERE id = $1',
        [id]
    )

    return result.rows[0] ?? null
}

export async function create(pool, { name, description }) {
    const result = await pool.query(
        `INSERT INTO service (name, description)
         VALUES ($1, $2)
         RETURNING *`,
        [name, description]
    )
    return result.rows[0]
}

export async function update(pool, id, { name, description }) {
    const result = await pool.query(
        `UPDATE service
        SET name = $1, description = $2
        WHERE id = $3
        RETURNING *`,
        [name, description, id]
    )

    return result.rows[0] ?? null
}

export async function remove(pool, id) {
    const result = await pool.query(
        `DELETE FROM service WHERE id = $1 RETURNING id`,
        [id]
    )

    return result.rowCount > 0
}