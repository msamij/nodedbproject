import * as mysql from 'mysql2';
import DBConnection from './dbConnection';

export default class DB {
  private tableName: string = null;
  private connection: mysql.Connection;

  /**
   * @param defaultTableName provide tableName during instantiation,
   * Which'll be used for displaying field information, If not provided at this point then
   * must be provided when displaying field information, otherwise error will be thrown.
   */
  constructor(dbConnectionInstance: DBConnection, defaultTableName?: string) {
    this.connection = dbConnectionInstance.getDbConnection();
    this.tableName = defaultTableName;
  }

  private callback(error: mysql.QueryError, result: any) {
    if (error) console.log(error);
    else console.log(result);
  }

  listAllTables(): DB {
    this.connection.query('SHOW TABLES', this.callback);
    return this;
  }

  showTableInformation(tableName: string): DB {
    this.tableName = tableName;
    this.connection.query(`DESC ${this.tableName}`, this.callback);
    return this;
  }

  /**
   * @param tableName (optional) if not provided, default one will be used,
   * that's initialized during DB's instantiation.
   * @returns
   */
  showFieldInformation(fieldName: string, tableName?: string): DB {
    if (!this.tableName && !tableName) throw new Error('Please provide table name');
    this.connection.query(`DESC ${this.tableName} ${fieldName}`, this.callback);
    return this;
  }
}
