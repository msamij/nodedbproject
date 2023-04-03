import { Response } from 'express';
import * as mysql from 'mysql2';
import { RESULT_KEY } from './config';
import DBConnection from './dbConnection';

export default class DB {
  private defaultTableName: string = null;
  private connection: mysql.Connection;
  private result: any[] = [];
  private res: Response;

  /**
   * @param defaultTableName provide tableName during instantiation,
   * Which'll be used for displaying field information, If not provided at this point then
   * must be provided when displaying field information, otherwise error will be thrown.
   */
  constructor(dbConnectionInstance: DBConnection, defaultTableName?: string) {
    this.connection = dbConnectionInstance.getDbConnection();
    this.defaultTableName = defaultTableName;
  }

  private callback(error: mysql.QueryError, result: any) {
    if (error) console.log(error);
    else console.log(result);
  }

  private getResultCallback(error: mysql.QueryError, result: any) {
    if (error) console.log(error);
    else {
      this.result = result;
      this.sendResponse(this.res);
    }
  }

  private sendResponse(res: Response) {
    res.send(this.result);
  }

  showAllTables(): DB {
    this.connection.query('SHOW TABLES', this.callback);
    return this;
  }

  /**
   * DESCRIBE all tables.
   */
  showInformationFromAllTables(): DB {
    this.connection.query('SHOW TABLES', (error: mysql.QueryError, result: any[]) => {
      const tableNamesList: string[] = [];
      result.forEach((res: object) => tableNamesList.push(res[RESULT_KEY]));
      tableNamesList.forEach((tableName: string) => this.showTableInformation(tableName));
    });
    return this;
  }

  showTableInformation(tableName: string): DB {
    this.defaultTableName = tableName;
    this.connection.query(`DESC ${this.defaultTableName}`, this.callback);
    return this;
  }

  /**
   * @param tableName (optional) if not provided, default one will be used,
   * that's initialized during DB's instantiation.
   */
  showFieldInformation(fieldName: string, tableName?: string): DB {
    if (!this.defaultTableName && !tableName) throw new Error('Please provide table name');
    this.connection.query(
      `DESC ${this.defaultTableName ? this.defaultTableName : tableName} ${fieldName}`,
      this.callback
    );
    return this;
  }

  executeSelectTableStatement(tableName: string, res: Response): DB {
    this.res = res;
    this.connection.query(`SELECT * FROM ${tableName} LIMIT 10`, this.getResultCallback.bind(this));
    return this;
  }

  executeSelectTableStatementBasedOnQueryParam(tableName: string, query: string, res: Response): DB {
    this.res = res;
    this.connection.query(
      `SELECT * FROM ${tableName} WHERE country LIKE '${query}%'`,
      this.getResultCallback.bind(this)
    );
    return this;
  }

  executeSelectTableStatementForCity(countryId: string, res: Response) {
    this.res = res;
    this.connection.query(`SELECT * FROM city WHERE country_id = ${countryId}`, this.getResultCallback.bind(this));
  }

  getResult() {
    return this.result;
  }
}
