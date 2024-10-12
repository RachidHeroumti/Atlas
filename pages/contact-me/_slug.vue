<template>
  <div class="container p-5">
    <div class="max-w-lg mx-auto my-10 p-8 bg-white shadow-md rounded-lg">
      <h1
        class="font-poppins text-titles-color text-2xl font-bold mb-6 text-center"
      >
        Contact Us
      </h1>
      <form @submit.prevent="submitForm">
        <div class="mb-2">
          <label for="name" class="block font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="w-full px-3 py-2 border focus:outline-none focus:ring focus:border-white-gray"
            placeholder="Your Name"
            required
          />
        </div>

        <div class="mb-2">
          <label for="email" class="block font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="w-full px-3 py-2 border focus:outline-none focus:ring focus:border-white-gray"
            placeholder="Your Email"
            required
          />
        </div>
        <div class="mb-2">
          <label for="email" class="block font-bold mb-2">Subject</label>
          <input
            type="email"
            id="email"
            v-model="formData.subject"
            class="w-full px-3 py-2 border focus:outline-none focus:ring focus:border-white-gray"
            placeholder="Your Email"
            required
          />
        </div>

        <div class="mb-2">
          <label for="message" class="block font-bold mb-2">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            class="w-full px-3 py-2 border focus:outline-none focus:ring focus:border-white-gray"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full hover:text-titles-color hover:bg-white border border-dark-gray text-white ai-c click-effect bg-titles-color font-bold py-2 px-4 focus:outline-none"
        >
          Send Message
        </button>
      </form>

      <p v-if="formSubmitted" class="mt-6 text-green-600 text-center">
        Thank you for your message! We'll get back to you shortly.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      formSubmitted: false,
    };
  },
  methods: {
    submitForm() {
      this.formSubmitted = true;
      this.formData.name = "";
      this.formData.email = "";
      this.formData.subject = "";
      this.formData.message = "";
    },
  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
