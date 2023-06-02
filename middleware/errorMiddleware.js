const errorLogger = (error, request, response, next) => {
  console.log( `error ${error.message}`)
  console.log('inside the error middleware')
  next(error) // calling next middleware
}

// Error handling Middleware function reads the error message 
// and sends back a response in JSON format
const errorResponder = (error, request, response, next) => {
  response.header("Content-Type", 'application/json')
  if (error.message === 'Stats Do Not Exist') {
      error.status = 404;
      error.name = 'error';
  }
  const status = error.status || 400;
  if (process.env.NODE_ENV === 'development') {
      response.status(status).send({
          name: error.name,
          message: error.message,
          stack: error.stack
      })
  } else {
      response.status(status).send(error)
  }
}

// Fallback Middleware function for returning 
// 404 error for undefined paths
const invalidPathHandler = (error, request, response, next) => {
  response.status(404)
  response.send(error)
}

module.exports = { errorLogger, errorResponder, invalidPathHandler }
