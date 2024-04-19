const http = require('http');
const https = require('https');

// Cria um servidor HTTP que escuta na porta 8080
const server = http.createServer((req, res) => {
  // Verifica se a URL da requisição é '/'
  if (req.url === '/') {
    // Faz uma chamada GET para a API randomuser.me
    https.get('https://randomuser.me/api/', (apiRes) => {
      let data = '';

      // Recebe dados da API
      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      // Quando os dados da API são completamente recebidos
      apiRes.on('end', () => {
        // Converte os dados para JSON
        const jsonData = JSON.parse(data);

        // Exibe o resultado no console/terminal
        console.log(jsonData);

        // Envia uma resposta para o navegador
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }).on('error', (e) => {
      console.error(e);
    });
  } else {
    // Se a URL não for '/', envia uma resposta 404
    res.writeHead(404);
    res.end();
  }
});

// O servidor começa a escutar na porta 8080
server.listen(8080, () => {
  console.log('Servidor rodando na porta 8080...');
});

