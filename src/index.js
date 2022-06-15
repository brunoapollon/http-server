const http = require('http');
const url = require('url');
//maneira de fazer nas versões acima da 11
const { URL } = require('url');

const routes = require('./routes');

const server = http.createServer((request, response) => {
  // const parsedUrl = url.parse(request.url, true); // não funciona a partir da versão 11 do node
  //maneira de fazer nas versões acima da 11
  const parsedUrl = new URL(`http://localhost:300${request.url}`)
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;

  // Bolean(algum valor) tranforma para o resultado boolean daquela variavel
  // const splitEndpoint = pathname.split('/').filter((routeItem) => Boolean(routeItem));
  const splitEndpoint = pathname.split('/').filter(Boolean); // filtra da mesma forma que a linha acima

  if(splitEndpoint.length > 1){
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObject) => (
    routeObject.endpoint === pathname && routeObject.method === request.method
  ));

  if(route){
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });

    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});


server.listen(3000, () => {
  console.log(' 🚀 Server started at http://localhost:3000');
});