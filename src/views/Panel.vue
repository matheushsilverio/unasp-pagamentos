<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <Sidebar></Sidebar>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Área</v-toolbar-title>
    </v-app-bar>

    <v-main class="blue-grey lighten-5">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "Panel",
  components: {
    Sidebar,
  },
  data: () => ({
    drawer: null,
  }),
};
</script>
