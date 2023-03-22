import DB from './db';
import DBConnection from './dbConnection';

const db = new DB(DBConnection.getConnectionInstance());
db.listAllTables().showTableInformation('customer').showFieldInformation('age');
