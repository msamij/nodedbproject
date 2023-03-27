import * as mysql from 'mysql2';

export default class DBConnection {
  private connection: mysql.Connection = null;
  private static connection: DBConnection = null;

  constructor() {
    this.createConnection();
  }

  static getConnectionInstance() {
    if (!DBConnection.connection) DBConnection.connection = new DBConnection();
    return DBConnection.connection;
  }

  getDbConnection(): mysql.Connection {
    return this.connection;
  }

  private createConnection(): void {
    this.connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '84E4sC2G9g!',
      database: 'sakila',
    });

    this.connection.connect(err => {
      if (err) console.log(`Error Connecting with database !!!`);
      else console.log('Connection Successfull :)');
    });
  }
}
