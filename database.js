import poolObj from './dbPool.js';
const { pool } = poolObj;

let logonUsers = new Map();

const sendQuery = async (sql, doCommit, ...params) => {
    let conn, result
    try {
        conn = await pool.getConnection()
        result = await conn.query(sql, params)
        if (doCommit) {
            await conn.query('COMMIT')
        }
    } catch (err) {
		result = err
        throw err
    } finally {
        if (conn)
            conn.end()
        return(result)
    }
}

const findOneUser = async (username) => sendQuery(`SELECT * FROM users WHERE username = ?`, true, username);

const getAllData = async () => 
    sendQuery(`SELECT * FROM data`);

const getDataById = async (id) =>
    sendQuery(`SELECT * FROM data WHERE data.id = ?`, false, id);

const getAllUsers = async () => 
    sendQuery(`SELECT * FROM users`);

const addOneUser = async (username, password) => 
    sendQuery( `INSERT INTO users (username, password) VALUES (?, ?)`, false, username, password);

const addData = ({id, Firstname, Surname, userid}) =>
    sendQuery(`INSERT INTO data (id, Firstname, Surname, userid) VALUES (?, ?, ?, ?)`, true, id, Firstname, Surname, userid);

const getUsersRecords = async () => {
    const res = await sendQuery(`CALL users_records`);
    console.log(res);
    return[0];
}

const populateTable = async (lineCount) =>
    sendQuery(`CALL fillTable(?)`, false, lineCount);

//const getUsersRecords = () =>
 //   sendQuery(`SELECT * from users_records`);


/*
const getUsersRecords = () =>
    sendQuery(`SELECT a.username, count(b.userid) AS 'Users records' FROM users AS a JOIN data AS b ON a.username = b.userid GROUP BY a.username`);

const getUserByName = (username) => 
    sendQuery(`SELECT * FROM users WHERE username = ?`, false, username);

const deleteData = (id, userid) =>
    sendQuery(`DELETE FROM data WHERE id = ? AND userid = ?`, true, id, userid);
*/
export {
    getUsersRecords,
    addOneUser,
    getAllUsers,
    findOneUser,
    getAllData,
    getDataById,
    addData,
    logonUsers,
    populateTable,
//    getUserByName,
//    deleteData,
}
