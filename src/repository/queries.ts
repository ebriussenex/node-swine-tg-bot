import {dbConfig} from '../const/config';
import {Pool, QueryResultRow} from 'pg';

const pool = new Pool({
  user: dbConfig.DB_USER,
  host: dbConfig.DB_HOST,
  database: dbConfig.DB_NAME,
  password: dbConfig.DB_PASSWORD,
  port: dbConfig.DB_PORT,
});

export const queries = Object.freeze({
  getAll: async (tableName: string): Promise<QueryResultRow[]> =>
    await getQueryResult(`SELECT * FROM ${tableName}`),

  getById: async (
      tableName: string,
      fieldValue: string | number,
  ): Promise<QueryResultRow> =>
    (await queries.getByField(tableName, 'id', fieldValue))[0],

  getByField: async (
      tableName: string,
      fieldName: string,
      fieldValue: string | number,
  ): Promise<QueryResultRow[]> =>
    await getQueryResult(`SELECT * FROM ${tableName} WHERE ${fieldName}=$1`, [
      fieldValue,
    ]),

  getTopByField: async (
      tableName: string,
      fieldName: string,
      limit?: number,
  ): Promise<QueryResultRow[]> => {
    if (typeof limit === "undefined") limit = 10;
    return await getQueryResult(
        `SELECT * FROM ${tableName} ORDER BY ${fieldName} DESC LIMIT $1`,
        [limit],
    );
  },

  create: async (
      tableName: string,
      insertVal: Map<string, any>,
  ): Promise<QueryResultRow[]> => {
    const valuesStr: string = [...insertVal.values()].join(', ');
    const fieldsStr: string = [...insertVal.keys()].join(', ');
    return await getQueryResult(
        `INSERT INTO ${tableName} (${fieldsStr}) 
      VALUES (${valuesStr}) RETURNING *`,
    );
  },

  update: async (
      tableName: string,
      updateField: string,
      updateFieldVal: any,
      setVal: Map<string, any>,
  ): Promise<QueryResultRow[]> => {
    const valueStr = Array.from(setVal)
        .map(([k, v]) => k + ' = ' + v)
        .join(', ');
    return await getQueryResult(
        `UPDATE ${tableName} SET (${valueStr}) WHERE ${updateField}=$1`,
        [updateFieldVal],
    );
  },
});

const getQueryResult = async (
    query: string,
    params?: any[],
): Promise<QueryResultRow[]> => {
  let queryResult: any[] = [];
  if (typeof params === undefined || params!.length === 0) {
    await pool.query(query, (err: Error, res) => {
      if (err) throw err;
      queryResult = res.rows;
    });
  } else {
    await pool.query(query, params!, (err: Error, res) => {
      if (err) throw err;
      queryResult = res.rows;
    });
  }
  return queryResult;
};
