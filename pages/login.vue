<template>
  <div class="bg-white font-family-karla h-screen">
    <div class="w-full flex flex-wrap">
      <div class="w-full md:w-1/2 flex flex-col">
        <div
          class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24"
        >
          <a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>
        </div>
        <div
          class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32"
        >
          <p class="text-center text-3xl">Login.</p>
          <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="login">
            <div class="flex flex-col pt-4">
              <label for="email" class="text-lg">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="your@email.com"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex flex-col pt-4">
              <label for="password" class="text-lg">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <input
              type="submit"
              value="Log in"
              class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
            />
          </form>
          <div class="text-center pt-12 pb-12">
            <p>
              Do you not yet have an account?
              <nuxt-link class="underline font-semibold" to="/register">
                Sign up.
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="w-1/2 shadow-2xl">
        <img
          class="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$fireAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((res) => {
            //Save user data in state
            this.setUser({
              id: res.user.uid,
              email: res.user.email,
              emailVerified: res.user.emailVerified,
              displayName: res.user.displayName,
              photoUrl: res.user.photoUrl,
            });
            //Redirect to dashboard
            this.$router.push("/dashboard");
          });
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
  },
};
</script>
