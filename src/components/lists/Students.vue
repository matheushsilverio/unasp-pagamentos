<template>
  <ModelList title="Alunos">
    <v-data-table
      :headers="headers"
      :items="[...students, ...students, ...students, ...students]"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </ModelList>
</template>

<script>
import ModelList from "../ModelList";

export default {
  name: "ListStudents",
  components: {
    ModelList,
  },
  data() {
    return {
      headers: [
        {
          text: "RA",
          value: "ra",
        },
        { text: "Nome", value: "name" },
        { text: "Curso", value: "curso" },
      ],
      students: [
        {
          ra: "124564",
          name: "Rodrigo José Bernardes",
          curso: "Artes",
          cpf: "440.436.662-09",
        },
        {
          ra: "124564",
          name: "Rodrigo José Bernardes",
          curso: "Artes",
          cpf: "440.436.662-09",
        },
        {
          ra: "124564",
          name: "Rodrigo José Bernardes",
          curso: "Artes",
          cpf: "440.436.662-09",
        },
        {
          ra: "124564",
          name: "Rodrigo José Bernardes",
          curso: "Artes",
          cpf: "440.436.662-09",
        },
        {
          ra: "124564",
          name: "Rodrigo José Bernardes",
          curso: "Artes",
          cpf: "440.436.662-09",
        },
        {
          ra: "124564",
          name: "Rodrigo José Bernardes",
          curso: "Artes",
          cpf: "440.436.662-09",
        },
      ],
    };
  },
};
</script>
