const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    desciption: 'Movie API'
  },
  host: 'web-service-cse-341.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

//Rub server after it gets generated
//swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//  await import('server.js');
//});
