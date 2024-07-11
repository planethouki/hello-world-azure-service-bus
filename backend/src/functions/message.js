const { app } = require('@azure/functions');
const { ServiceBusClient } = require('@azure/service-bus');

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const queueName = process.env.QUEUE_NAME;

app.http('message', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const reqBody = await request.json()

    if (!reqBody) {
      return { status: 400, body: 'Missing body' };
    }

    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(queueName);

    try {
      const message = {
        body: reqBody.message,
        applicationProperties: {
          customProperty: reqBody.customProperty
        }
      };

      await sender.sendMessages(message);

      return {
        body: JSON.stringify({
          message: 'Message sent to the queue'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

    } catch (error) {
      return {
        status: 500,
        body: error.message
      }
    } finally {
      await sender.close();
      await sbClient.close();
    }
  }
});
