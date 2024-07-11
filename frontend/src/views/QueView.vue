<script>
export default {
  data() {
    return {
      message: '',
      customProperty: '',
      responseMessage: '',
    };
  },
  methods: {
    async sendMessage() {
      try {
        this.responseMessage = await fetch(`${import.meta.env.VITE_API_URL}/api/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: this.message,
            customProperty: this.customProperty
          })
        }).then(response => response.json());
      } catch (error) {
        this.responseMessage = 'Failed to send message';
        console.error(error);
      }
    }
  }
};
</script>

<template>
  <div>
    <h1>Send Message to Azure Service Bus Queue</h1>
    <input v-model="message" placeholder="Enter your message" />
    <input v-model="customProperty" placeholder="Enter custom property" />
    <button @click="sendMessage">Send Message</button>
    <p>{{ responseMessage }}</p>
  </div>
</template>

<style scoped>

</style>
