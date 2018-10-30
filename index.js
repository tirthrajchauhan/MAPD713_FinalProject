var SERVER_NAME = 'patients-api'
var PORT = 7000;
var HOST = '127.0.0.1';

var restify = require('restify')

  // getting a persistence engine for the stories
  , patientsSave = require('save')('patients')

  // creating the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Endpoints:')
  console.log(server.url+'/patients', 'To fetch all pateints(GET Method)')
  console.log(server.url+'/patients', 'To add patient(POST Method - with valid input)')
  console.log(server.url+'/patients/:id', 'To fetch single patient((GET Method)')  
  
})

server
  // allowing the use of POST
  .use(restify.fullResponse())

  // maping request.body to request.params so there is no switching between them
  .use(restify.bodyParser())

// method to get all patients
server.get('/patients', function (request, response, next) {

  // find every entity within the given collection
  patientsSave.find({}, function (error, patients) {
    // return all of the patients in the system
    response.send(patients)
  })
})
