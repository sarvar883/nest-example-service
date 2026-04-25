This is an example Nest.js service. 

You can get an idea how to structure a Nest.js application, how to plug-in standard modules, like config, DB modules, controllers, infrastructure modules. Also, notice how business-logic, controller and infrastructure modules are separated.

This service handles CPU-intensive tasks in asynchronous way. If tasks result in error, retry feature is also implemented.
It implements WorkerPool to handle many tasks in parallel.
Client needs to call /api/pbkdf2/create to create a task and gets back the ID of the task.
Then the client polls the service to check the status and finally get a result.

This Nest.js service has 2 services (controllers):
1. API to listen for requests
2. Processor - endless loop to continuously look for tasks and forward them to a Worker.

In prod environments, these services start as separate PM2 processes and work independently. 