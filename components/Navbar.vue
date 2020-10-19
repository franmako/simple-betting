<template>
  <nav class="w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4">
    <div>
      <svg
        class="h-8 w-8 fill-current text-blue-600 dark:text-blue-300"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82
					6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12
					15l5-2.73V16z"
        ></path>
      </svg>
    </div>

    <ul class="mt-2 text-gray-700 dark:text-gray-400 capitalize">
      <!-- Links -->
      <li
        v-for="item in items"
        :key="item.key"
        class="mt-3 p-2 text-blue-600 dark:text-blue-300 rounded-lg"
      >
        <nuxt-link :to="item.link" class="flex flex-col items-center">
          <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
            <path :d="item.icon"></path>
          </svg>
          <span class="text-xs mt-2">{{ item.name }}</span>
        </nuxt-link>
      </li>

      <li class="mt-3 p-2 hover:text-blue-600 rounded-lg">
        <a href class="flex flex-col items-center" @click="logout()">
          <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0
							001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"
            ></path>
          </svg>
          <span class="text-xs mt-2">Logout</span>
        </a>
      </li>
    </ul>

    <div
      class="mt-auto flex items-center p-2 text-blue-700 bg-purple-200 dark:text-blue-500 rounded-full"
    >
      <!-- important action -->

      <a href="/">
        <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7
						7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0
						003-3V10c0-5-4.03-9-9-9z"
          ></path>
        </svg>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      items: [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon:
            "M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z",
          adminOnly: false,
        },
        {
          name: "Users",
          link: "/users",
          icon:
            "M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z",
          adminOnly: true,
        },
        {
          name: "Matches",
          link: "/matches",
          icon:
            "M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z",
          adminOnly: false,
        },
      ],
    };
  },
  methods: {
    logout: () => {
      this.$fireAuth.signOut().catch(function (error) {
        // An error happened.
        this.$toast.error(error.message);
      });
    },
  },
};
</script>
