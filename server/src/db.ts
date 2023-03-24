import * as mysql from 'mysql2';
import { RESULT_KEY } from './config';
import DBConnection from './dbConnection';

export default class DB {
  private defaultTableName: string = null;
  private connection: mysql.Connection;

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
   * @returns
   */
  showFieldInformation(fieldName: string, tableName?: string): DB {
    if (!this.defaultTableName && !tableName) throw new Error('Please provide table name');
    this.connection.query(
      `DESC ${this.defaultTableName ? this.defaultTableName : tableName} ${fieldName}`,
      this.callback
    );
    return this;
  }
}
