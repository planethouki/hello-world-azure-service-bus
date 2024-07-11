require('dotenv').config();
const { ServiceBusClient } = require('@azure/service-bus');

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const queueName = process.env.QUEUE_NAME;

async function main() {
    // Create a Service Bus client
    const sbClient = new ServiceBusClient(connectionString);

    // Create a sender for the queue
    const sender = sbClient.createSender(queueName);

    try {
        // Create a message
        const message = {
            body: "Hello, Azure Service Bus!",
            subject: "TestMessage",
            properties: {
                customProperty: "CustomValue"
            }
        };

        // Send the message to the queue
        console.log(`Sending message: ${message.body}`);
        await sender.sendMessages(message);

        console.log(`Message sent to the queue: ${queueName}`);

    } finally {
        // Close the sender
        await sender.close();
        // Close the Service Bus client
        await sbClient.close();
    }
}

// Call the main function
main().catch((err) => {
    console.log("Error occurred: ", err);
});
