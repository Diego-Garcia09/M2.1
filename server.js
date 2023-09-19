const http = require('http');
const url = require('url');
const querystring = require('querystring');

const servidor = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  if (req.method === 'GET') {
    // Manejo de solicitudes GET
    if (pathname === '/datos') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE-Edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Datos</title>
        </head>
        <body>
          <h1>Request headers:</h1>
          <p>${JSON.stringify(req.headers, null, 2).split(",").join("<br>")}</p>
          <h2>Método: ${req.method}</h2>
          <h3>URL: ${req.url}</h3>
        </body>
      </html>`);
    } else if (pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html'});
      res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE-Edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Datos</title>
        </head>
        <body>
          <h1>Enviando datos al servidor HTTP</h1>
          <p>Datos para el server: </p>
          <form method="post" action="/">
              <label for="dato">Dato:</label>
              <input type="text" id="dato" name="dato">
              <button type="submit">Enviar</button>
            </form>
        </body>
      </html>
      `);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
    }
  } else if (req.method === 'POST') {
    // Manejo de solicitudes POST
    if (pathname === '/') {
      let cuerpo = '';
      req.on('data', (chunk) => {
        cuerpo += chunk;
      });
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE-Edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Datos</title>
          </head>
          <body>
            <h1>Request headers:</h1>
            <p>${JSON.stringify(req.headers, null, 2).split(",").join("<br>")}</p>
            <h2>Método: ${req.method}</h2>
            <h3>URL: ${req.url}</h3>
            <h4>Datos enviados: ${cuerpo}</h4>
          </body>
        </html>`);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Método no permitido');
  }
});

const puerto = 8080;

servidor.listen(puerto, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${puerto}`);
});
