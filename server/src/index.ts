import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import DB from './db';
import DBConnection from './dbConnection';

const port = 3000;

const app: Application = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Express started on port ${port}`);
});

const db = new DB(DBConnection.getConnectionInstance());

app.get('/countries', (req: Request, res: Response) => {
  if (!req.query.name) db.executeSelectTableStatement('country', res);
  else {
    const { name } = req.query;
    db.executeSelectTableStatementBasedOnQueryParam('country', name as string, res);
  }
});

app.get('/city', (req: Request, res: Response) => {
  const { country } = req.query;
  db.executeSelectTableStatementForCity(country as string, res);
});
