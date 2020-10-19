<template>
  <div>
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
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Login",
  layout: "loginregister",
  //middleware: "anonymous",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations({
      setUser: "auth/setUser",
    }),
    async login() {
      try {
        await this.$fireAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((res) => {
            let extra = {};
            this.$fireStore
              .collection("users-extra")
              .where("user", "==", res.user.uid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots
                  extra = doc.data();
                });

                //Save user data in state
                this.setUser({
                  id: res.user.uid,
                  email: res.user.email,
                  emailVerified: res.user.emailVerified,
                  displayName: res.user.displayName,
                  photoUrl: res.user.photoUrl,
                  credits: extra.credits,
                });
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
