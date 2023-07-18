import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'circo12',
    port: 3306,
    database: 'publications_db'
})
