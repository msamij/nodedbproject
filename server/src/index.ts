import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import DB from './db';
import DBConnection from './dbConnection';

let result: any[] = [];
const port = 3000;

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  const { country } = req.query;
  db.executeSelectTableStatementBasedOnQueryParam('country', country as string, res);
  console.log(db.getResult());
  // res.send('Hello, World');
});

app.listen(port, () => {
  console.log(`Express started on port ${port}`);
});

const db = new DB(DBConnection.getConnectionInstance());

// result = [...db.getResult()];
app.get('/db', (req: Request, res: Response) => {
  db.executeSelectTableStatement('city');
  res.json(db.getResult());
});
