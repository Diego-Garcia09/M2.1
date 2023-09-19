//const http = require('http');

// Define una función para manejar las solicitudes entrantes
//const manejarSolicitud = (req, res) => {
//  res.writeHead(200, { 'Content-Type': 'text/plain' });
//  res.end('¡Hola, mundo!\n');
//};

// Crea un servidor HTTP y pasa la función de manejo de solicitudes
//const servidor = http.createServer(manejarSolicitud);

// Especifica el puerto en el que deseas ejecutar el servidor
//const puerto = 8080;

// Escucha en el puerto especificado
//servidor.listen(puerto, () => {
//  console.log(`Servidor HTTP escuchando en el puerto ${puerto}`);
//});

const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Datos de ejemplo para simular una "base de datos"
const datos = {};

const servidor = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
    //console.log(query);//Aqui consigues lo del enlace


  if (req.method === 'GET') {
    // Manejo de solicitudes GET
    if (pathname === '/datos') {
      console.log(query);
      console.log(pathname);
      console.log(pathname, query);
      console.log(req.url);
      console.log(req.headers);
      // Devuelve los datos almacenados como JSON
      res.writeHead(200, { 'Content-Type': 'text/html' });//Cambia text/plain a text/html
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
          <h2>Metodo:${req.method}</h2>
          <h3>URL:${req.url}</h3>
        </body>
      </html>`);//Aqui va el html
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
    }
  } else if (req.method === 'POST') {
    // Manejo de solicitudes POST
    if (pathname === '/datos') {
      let cuerpo = '';
      req.on('data', (chunk) => {
        cuerpo += chunk;
      });
      req.on('end', () => {
        const nuevoDato = querystring.parse(cuerpo);
        // Almacena el nuevo dato
        datos[Object.keys(nuevoDato)[0]] = nuevoDato[Object.keys(nuevoDato)[0]];
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.end('Dato almacenado exitosamente');//Aqui va el html de respuesta
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
    }
  } else if (req.method === 'PUT') {
    // Manejo de solicitudes PUT
    if (pathname === '/datos') {
      let cuerpo = '';
      req.on('data', (chunk) => {
        cuerpo += chunk;
      });
      req.on('end', () => {
        const nuevoDato = querystring.parse(cuerpo);
        // Actualiza el dato existente
        datos[Object.keys(nuevoDato)[0]] = nuevoDato[Object.keys(nuevoDato)[0]];
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Dato actualizado exitosamente');
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
