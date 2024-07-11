const { app } = require('@azure/functions');

app.serviceBusQueue('serviceBusQueueTrigger', {
    connection: process.env.SERVICE_BUS_CONNECTION_STRING,
    queueName: process.env.QUEUE_NAME,
    handler: (message, context) => {
        context.log('Service bus queue function processed message:', message);
    }
});
