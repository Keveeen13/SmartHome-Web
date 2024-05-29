import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../database/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') { // Verifica se o método da requisição é POST
    // Processa os dados do tipo application/x-www-form-urlencoded
    const { sensor, valor, dispositivo } = req.body;

    if (sensor && valor) {
      try {
        
        const insertSql = 'INSERT INTO sensores (sensor, valor) VALUES (?, ?)';
        await query(insertSql, [sensor, valor]);
        console.log('Dados inseridos com sucesso!');
        res.status(200).json({ [sensor]: 'Ok' });
      } catch (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).json({ error: 'Erro ao inserir dados' });
      }
    } else if (dispositivo) {
      try {
        
        const dispositivoResult = await query('SELECT * FROM dispositivos WHERE dispositivo = ?', [dispositivo]);
        if (dispositivoResult.length === 0) {
          res.status(404).json({ error: `${dispositivo} não encontrado` });
        } else {
          const estado = dispositivoResult[0].estado;
          const resposta = { [dispositivo]: estado };
          res.status(200).json(resposta);
        }
      } catch (error) {
        console.error('Erro ao consultar dispositivo:', error);
        res.status(500).json({ error: 'Erro ao consultar dispositivo' })
      }
    } else {
      res.status(400).json({ error: 'Parâmetros ausentes na requisição.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}