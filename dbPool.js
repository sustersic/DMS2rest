import { createPool } from "mariadb"

const pool = createPool({
    host: "localhost",
    user: "jan",
    port: 3306,
    password: "susi2",
    database: "jansDatabase",
    insertIdAsNumber: true,
    bigIntAsNumber: true,
})

export default Object.freeze({
    pool: pool
})
