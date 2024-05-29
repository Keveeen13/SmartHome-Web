import { query } from '../../../database/db';

// Define o manipulador da API para obter os dados de temperatura do banco de dados
export default async function handler(req, res) {
  try {

    const results = await query(
      'SELECT valor FROM sensores WHERE sensor = ? AND data_hora >= NOW() - INTERVAL 5 SECOND ORDER BY n DESC;',
      ['Gás e Fumaça']
    );
    // Retorna os resultados como JSON
    res.status(200).json(results[0]); // Responde com o primeiro resultado da consulta
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}