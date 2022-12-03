
import express from 'express';
import {Connection,WorkflowClient} from "@temporalio/client" ;
// Importing workflows from workflows.js file. We need to explicitly import the workflows to use them.
import {placeOrderWorkflow} from "./microservice/workflow.js";


const app = express()
const port = 3000

// Creates a connection to Temporal Server
const connection = await Connection.connect();

  // Creating a temporal Client that handles all requests to temporal server
const client = new WorkflowClient({ connection });
console.log(placeOrderWorkflow);
app.post('/placeOrder', async (req, res) => {
  try{

     // Specifying args and workflowId for the verify workflow
     const placeOrderHandle = await client.start(placeOrderWorkflow, {
        workflowId: 'My-first-workflow',
        taskQueue: 'order',
        args: [req.query.name, req.query.quantity], // this is typechecked against workflowFn's args
        retry: {
          maximumAttempts: 1,
        }
      });

      // Waits for the result from Workflow
      var result =  await placeOrderHandle.result();
      res.send(result);
  }
  catch(err){
    throw err;
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})