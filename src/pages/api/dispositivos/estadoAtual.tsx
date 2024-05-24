import { query } from '../../../database/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  const { dispositivo: dispositivoNome } = req.body;

  try {
    const dispositivo = await query('SELECT * FROM dispositivos WHERE dispositivo = ?', [dispositivoNome]);
    if (dispositivo.length === 0) {
      res.status(404).json({ error: `${dispositivoNome} não encontrado` });
      return;
    }

    res.status(200).json({ estado: dispositivo[0].estado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
