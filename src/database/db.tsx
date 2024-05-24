import mysql from 'mysql';

// Configurações importadas do arquivo .env para a conexão com o banco de dados MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Função de consulta que executa consultas SQL no banco de dados MySQL
export const query = (sql: string, values: any[]) => {
  return new Promise((resolve, reject) => {

    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        reject(err); // Rejeita a promessa se houver erro ao conectar
        return;
      }
      // Executa a consulta SQL no banco de dados
      connection.query(sql, values, (err, results) => { // Executa a query SQL com os parâmetros fornecidos
        if (err) {
          reject(err); // Rejeita a promessa se houver erro ao executar a consulta
          return;
        }
        
        connection.end();
        // Resolve a promessa com os resultados da consulta
        resolve(results);
      });
    });
  });
};
