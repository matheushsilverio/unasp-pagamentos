<template>
  <div>
    <v-list-item class="indigo" dark>
      <v-list-item-content>
        <v-list-item-title class="title">
          Unasp
        </v-list-item-title>
        <v-list-item-subtitle>
          Pagamentos
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in listItems"
        :key="item.title"
        link
        :to="{ name: item.route }"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      items: [
        {
          title: "Alunos",
          icon: "mdi-view-dashboard",
          route: "ListStudents",
          acl: ["admin"],
        },
        {
          title: "Cadastro Aluno",
          icon: "mdi-view-dashboard",
          route: "RegistrationStudent",
          acl: ["admin"],
        },
        {
          title: "Cursos",
          icon: "mdi-view-dashboard",
          route: "ListCourses",
          acl: ["admin"],
        },
        {
          title: "Mensalidades",
          icon: "mdi-view-dashboard",
          route: "Payments",
          acl: ["usuario"],
        },
      ],
      right: null,
    };
  },
  computed: {
    ...mapGetters("User", ["userStore"]),
    listItems() {
      return this.items.filter((item) =>
        item.acl.includes(this.userStore.nivelAcesso)
      );
    },
  },
  methods: {
    ...mapActions("User", ["setUserStore"]),
    logout() {
      this.setUserStore({});
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
