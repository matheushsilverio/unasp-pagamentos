<template>
  <div>
    <v-list-item class="orange">
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
        v-for="item in items"
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
    </v-list>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      items: [
        {
          title: "Alunos",
          icon: "mdi-view-dashboard",
          route: "ListStudents",
        },
        {
          title: "Cadastro Aluno",
          icon: "mdi-view-dashboard",
          route: "RegistrationStudent",
        },
        {
          title: "Cadastro Pessoa",
          icon: "mdi-view-dashboard",
          route: "RegistrationPerson",
        },
        {
          title: "Mensalidades",
          icon: "mdi-view-dashboard",
          route: "Payments",
        },
        { title: "Histórico", icon: "mdi-view-dashboard", route: "History" },
      ],
      right: null,
    };
  },
};
</script>

<style></style>
