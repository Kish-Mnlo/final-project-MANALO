// The data-access layer, the same shape as m5a3.
//
// Every query is parameterised: values go in the array, never into the string.
// This is the single most important habit in database code, and it is what
// stops "'; DROP TABLE sightings; --" in a form field from being a real
// problem.

export async function getAll(pool) {
    const result = await pool.query(
        'SELECT * FROM category'
    )

    return result.rows
}

export async function getById(pool, id) {
    const result = await pool.query(
        'SELECT * FROM category WHERE id = $1',
        [id]
    )

    return result.rows[0] ?? null
}

//added for validation of existing category name??
export async function getByName(pool, category_name) {
    const result = await pool.query(
        'SELECT * FROM category WHERE category_name ILIKE $1',
        [category_name]
    )

    return result.rows[0] ?? null
}

export async function create(pool, { category_name }) {
    const result = await pool.query(
        `INSERT INTO category (category_name)
         VALUES ($1)
         RETURNING *`,
        [category_name]
    )
    return result.rows[0]
}

export async function update(pool, id, { category_name }) {
    const result = await pool.query(
        `UPDATE category
        SET category_name = $1
        WHERE id = $2
        RETURNING *`,
        [category_name, id]
    )

    return result.rows[0] ?? null
}

export async function remove(pool, id) {
    const result = await pool.query(
        `DELETE FROM category WHERE id = $1 RETURNING id`,
        [id]
    )

    return result.rowCount > 0
}