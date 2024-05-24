import { query } from '../../../database/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  const { dispositivo: dispositivoNome } = req.body;
  const usuario = 'Site';

  try {
    const dispositivo = await query('SELECT * FROM dispositivos WHERE dispositivo = ?', [dispositivoNome]);
    if (dispositivo.length === 0) {
      res.status(404).json({ error: `${dispositivoNome} não encontrado` });
      return;
    }

    const novoEstado = dispositivo[0].estado === '1' ? '0' : '1';
    await query('UPDATE dispositivos SET estado = ?, usuario = ? WHERE dispositivo = ?', [novoEstado, usuario, dispositivoNome]);
    res.status(200).json({ estado: novoEstado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
