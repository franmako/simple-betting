<template>
  <div>
    <p class="text-center text-3xl">Create an account.</p>
    <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="createUser">
      <div class="flex flex-col pt-4">
        <label for="email" class="text-lg">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="John"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
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
        value="Sign up"
        class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
      />
    </form>
    <div class="text-center pt-12 pb-12">
      <p>
        Already have an account?
        <nuxt-link class="underline font-semibold" to="/login">
          Log in.
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Register",
  layout: "loginregister",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations({
      setUser: "auth/setUser",
    }),
    async createUser() {
      let startingCredits = 1000;
      try {
        await this.$fireAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            console.log(this.$fireAuth.currentUser.uid);
            //Add user credits
            this.$fireStore.collection("users-extra").add({
              credits: startingCredits,
              user: this.$fireAuth.currentUser.uid,
              roles: ["user"],
            });

            //Send verification email after succesful register
            this.$fireAuth.currentUser
              .sendEmailVerification()
              .then(() => {
                this.$toast.info(
                  "Account created! Please verify you email adresss."
                );
              })
              .catch((sendEmailError) => {
                this.$toast.error(sendEmailError.message);
              });
            this.$fireAuth.currentUser
              .updateProfile({
                displayName: this.name,
              })
              .catch(function (updateError) {
                this.$toast.error(updateError.message);
              });
          });

        this.$fireAuth.signOut().catch(function (error) {
          // An error happened.
          this.$toast.error(error.message);
        });

        //Redirect to dashboard
        this.$router.push("/login");
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
  },
};
</script>
