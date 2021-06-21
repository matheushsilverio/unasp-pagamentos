<template>
  <v-row>
    <v-col>
      <FormCourse @reload="getCourses"></FormCourse>
    </v-col>
    <v-col>
      <ModelList title="Cursos">
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="courses"
          :items-per-page="5"
          class="elevation-1"
        >
        </v-data-table>
      </ModelList>
    </v-col>
  </v-row>
</template>

<script>
import { CursoService } from "@/services/api";
import ModelList from "./ModelList.vue";
import FormCourse from "./forms/Couse.vue";

export default {
  name: "Courses",
  components: {
    FormCourse,
    ModelList,
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "Descrição", value: "descricao" },
        { text: "Mensalidade", value: "mensalidade" },
      ],
      courses: [],
    };
  },
  methods: {
    getCourses() {
      this.loading = true;
      CursoService.list().then((response) => {
        this.courses = response.data;
        this.loading = false;
      });
    },
  },
  created() {
    this.getCourses();
  },
};
</script>

<style></style>
