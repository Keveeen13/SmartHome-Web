import { query } from '../../../database/db';

// Define o manipulador da API para obter os dados de umidade do banco de dados
export default async function handler(req, res) {
  try {

    const results = await query(
      'SELECT * FROM sensores WHERE sensor = ? ORDER BY n DESC',
      ['umidade']
    );
    // Retorna os resultados como JSON
    res.status(200).json(results[0]); // Responde com o primeiro resultado da consulta
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}