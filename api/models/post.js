const db = require('../database/connect');

class Post {

    constructor({ id, entry_date, text, category, created_at, updated_at}) {
        this.id = id;
        this.entry_date = entry_date;
        this.text = text;
        this.category = category;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM diary_entries;");
        return response.rows.map(p => new Post(p)); // Assumes multiple returned results 
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM diary_entries WHERE id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]); // Assumes only one result returned
    }

    static async getByCategory(category) {
        const response = await db.query("SELECT * FROM diary_entries WHERE LOWER(category) = LOWER($1);", [category]);
       
        return response.rows.map(p => new Post(p))
    }
    
    static async create(data) {
        const { entry_date, text, category } = data;
        let response = await db.query("INSERT INTO diary_entries (entry_date, text, category) VALUES ($1, $2, $3) RETURNING *;",
            [entry_date, text, category]);

        return new Post(response.rows[0])
    }

    async update(data) {
        const entry_date = data.entry_date || this.entry_date
        const text = data.text || this.text 
        const category = data.category || this.category
    
        const response = await db.query('UPDATE diary_entries SET entry_date = $1, text = $2, category = $3, updated_at = NOW() WHERE id = $4 RETURNING *;', 
            [entry_date,text,category, this.id]
        )
        return new Post(response.rows[0])
    }

    async destroy() {
        let response = await db.query("DELETE FROM diary_entries WHERE id = $1 RETURNING *;", [this.id]);
        return new Post(response.rows[0]);
    }
}

module.exports = Post;