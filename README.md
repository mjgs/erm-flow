# erm-flow

Demo project that shows the flow of the [express-restify-mongoose](https://florianholzapfel.github.io/express-restify-mongoose/) module. 

    npm install
    npm start

Generate a random test user each time you npm start:

    curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:8080/setup"

Response:

    {"success":true}

Run a GET request:

    curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" "http://localhost:8080/api/v1/user"   
    
Response:

    [{"_id":"578c76586de0839e1a294c1f","name":"Aiden","password":"Sv!XtAAmPi#","admin":true,"__v":0}]
    
View the logs:

    npm start
    
    > erm-flow@1.0.0 start /Users/marksmith/Documents/Codes/playground/express-restify-mongoose-playground/erm-flow
    > node server.js
    
    restify listening at http://[::]:8080

    Creating user: {"name":"Aiden","password":"Sv!XtAAmPi#","admin":true,"_id":"578c76586de0839e1a294c1f"}
    User saved successfully
    GET /setup 200 20.504 ms - 16
    # preMiddleware : req.erm object: {} - model available in req.erm.model: true
    # preRead : req.erm object: {} - model available in req.erm.model: true
    # access sync : req.erm object: {} - model available in req.erm.model: true
    # contextFilter : req.erm object: {} - model available in req.erm.model: true
    # postRead : req.erm object: {
      "result": [
        {
          "_id": "578c76586de0839e1a294c1f",
          "name": "Aiden",
          "password": "Sv!XtAAmPi#",
          "admin": true,
          "__v": 0
        }
      ],
      "statusCode": 200
    } - model available in req.erm.model: true
    # outputFn : req.erm object: {
      "result": [
        {
          "_id": "578c76586de0839e1a294c1f",
          "name": "Aiden",
          "password": "Sv!XtAAmPi#",
          "admin": true,
          "__v": 0
        }
      ],
      "statusCode": 200
    } - model available in req.erm.model: true
    # postProcess : req.erm object: {
      "result": [
        {
          "_id": "578c76586de0839e1a294c1f",
          "name": "Aiden",
          "password": "Sv!XtAAmPi#",
          "admin": true,
          "__v": 0
        }
      ],
      "statusCode": 200
    } - model available in req.erm.model: true
    GET /api/v1/user request completed with status code 200
    GET /api/v1/user 200 4.466 ms - 97    

Change the [access](https://florianholzapfel.github.io/express-restify-mongoose/#access) function's commented line return statement to see how public/protected/private variables work.   
    
Run with [node inspector](https://github.com/node-inspector/node-inspector) to step through code.

Click the button to run the curl commands in [Postman](https://www.getpostman.com/):

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/417145f7e2578bee103f)