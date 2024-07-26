<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          register
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        @submit.prevent="register"
      >
        <input
          type="hidden"
          name="remember"
          value="true"
        >
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label
              for="email-address"
              class="sr-only"
            >Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            >
          </div>
          <div>
            <label
              for="password"
              class="sr-only"
            >Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { mapStores } from 'pinia';

import authApi from '@/api/auth';
import useUserStore from '@/stores/user';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  mounted() {
    authApi.csrfCookie();
  },
  methods: {
    async register() {
      const response = await authApi.register({
        'name': this.email,
        'username': this.email,
        'email': this.email,
        'password': this.password,
        'password_confirmation': this.password,
      });

      if (response.status === 201) {
        this.$router.push('/');
      }
    },
  },
};

</script>
