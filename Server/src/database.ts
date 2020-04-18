import mysql from 'promise-mysql';
import constants from './constants';

const pool = mysql.createPool(constants.database);
pool.then((r: any) => r.getConnection().then((connection: any) => {
    r.releaseConnection(connection);
    console.log('Database connected');
}))

export default pool;