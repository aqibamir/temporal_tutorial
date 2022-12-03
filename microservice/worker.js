import { Worker, NativeConnection } from '@temporalio/worker';
import { URL } from 'url';
import * as activities from './activity.js'


async function run() {

  // Create a connection object
  const connection = await NativeConnection.connect();

  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    connection: connection,
    workflowsPath: new URL('./workflow.js', import.meta.url).pathname,
    activities,
    taskQueue: 'order',
  });

  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // https://docs.temporal.io/ typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `order` queue
  await worker.run();

  // You may create multiple Workers in a single process in order to poll on multiple task queues.
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
