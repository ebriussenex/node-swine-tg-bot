import { config } from '../const/config';
import { Pool } from 'pg';


const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT
});


export const getAll = (tableName: string) => getQueryResult(`SELECT * FROM ${tableName}`);

export const getByField = (tableName: string, fieldName: string, fieldValue: string | number) =>
  getQueryResult(`SELECT * FROM ${tableName} WHERE ${fieldName}=$1`, [fieldValue]);


export const getTopByField = (tableName: string, fieldName: string, limit?: number) => {
  if (typeof limit === undefined) limit = 10;
  return getQueryResult(`SELECT * FROM ${tableName} ORDER BY ${fieldName} DESC LIMIT $1`, [limit]);
};

export const create = (tableName: string, insertVal: Map<string, any>) => {
  let valuesStr: string = [...insertVal.values()].join(', ');
  let fieldsStr: string = [...insertVal.keys()].join(', ');
  return getQueryResult(`INSERT INTO ${tableName} (${fieldsStr}) VALUES (${valuesStr}) RETURNING *`);
};

export const update = (tableName: string, updateField: string, updateFieldVal: any, setVal: Map<string, any>) => {
  let valueStr = Array.from(setVal).map(([k, v]) => k + ' = ' + v).join(', ');
  return getQueryResult(`UPDATE ${tableName} SET (${valueStr}) WHERE ${updateField}=$1`, [updateFieldVal]);
};

export const getQueryResult = (query: string, params?: any[]) => {
  let queryResult: any[] = [];
  if (typeof params === undefined || params!.length === 0) {
    pool.query(query, (err: Error, res) => {
      if (err) throw err;
      queryResult = res.rows;
    });
  } else {
    pool.query(query, params!, (err: Error, res) => {
      if (err) throw err;
      queryResult = res.rows;
    });
  }
  return queryResult;
};