import { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';


type CardRow = {
  id?: number; 
  bankName: string;
  creditCardName: string;
  isActive: number;
  createdOn: string; 
};


async function connectToDatabase(): Promise<Connection> {
  return createConnection({
    host: '',
    port: 3,
    user: 'root',
    password: '',
    database: '',
  });
}

function formatDateToMySQL(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date.toISOString().split('T')[0]; 
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await connectToDatabase();

    switch (req.method) {
      case 'POST': {
       
        const cardData: CardRow = req.body;
        const { bankName, creditCardName, isActive, createdOn } = cardData;

        if (!bankName || !creditCardName || isActive === undefined || !createdOn) {
          return res.status(400).json({ error: 'bankName, creditCardName, isActive, and createdOn are required in the request body.' });
        }

        const formattedCreatedOn = formatDateToMySQL(createdOn);

        const [result] = await connection.execute<ResultSetHeader>(
          'INSERT INTO cards (bankName, creditCardName, isActive, createdOn) VALUES (?, ?, ?, ?)',
          [bankName, creditCardName, isActive, formattedCreatedOn]
        );

        res.status(201).json({ id: result.insertId, message: 'Card created successfully' });
        break;
      }
      
      case 'GET': {
        const [rows] = await connection.execute<CardRow[] & RowDataPacket[]>(
          'SELECT * FROM cards'
        );

        if (rows.length === 0) {
          return res.status(404).json({ error: 'Card not found.' });
        }

        res.status(200).json(rows);
        break;
      }

      case 'PUT': {
        const { id, bankName, creditCardName, isActive, createdOn } = req.body;

        if (!id || !bankName || !creditCardName || isActive === undefined || !createdOn) {
          return res.status(400).json({ error: 'id, bankName, creditCardName, isActive, and createdOn are required in the request body.' });
        }

        const formattedCreatedOn = formatDateToMySQL(createdOn);

        const [result] = await connection.execute<ResultSetHeader>(
          'UPDATE cards SET bankName = ?, creditCardName = ?, isActive = ?, createdOn = ? WHERE id = ?',
          [bankName, creditCardName, isActive, formattedCreatedOn, id]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Card not found.' });
        }

        res.status(200).json({ message: 'Card updated successfully' });
        break;
      }

      case 'DELETE': {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ error: 'id is required in the request body.' });
        }

        const [result] = await connection.execute<ResultSetHeader>(
          'DELETE FROM cards WHERE id = ?',
          [id]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Card not found.' });
        }

        res.status(200).json({ message: 'Card deleted successfully' });
        break;
      }

      default: {
        res.status(405).json({ error: 'Method Not Allowed' });
        break;
      }
    }

    await connection.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
