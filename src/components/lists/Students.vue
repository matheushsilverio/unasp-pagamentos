<template>
  <ModelList title="Alunos">
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="students"
      :items-per-page="10"
      class="elevation-1"
    >
    </v-data-table>
  </ModelList>
</template>

<script>
import { AlunoService } from "@/services/api";
import ModelList from "../ModelList";

export default {
  name: "ListStudents",
  components: {
    ModelList,
  },
  data() {
    return {
      dialog: false,
      loading: false,
      headers: [
        {
          text: "RA",
          value: "ra",
        },
        { text: "Nome", value: "nome" },
        { text: "Curso", value: "curso" },
        { text: "Ações", value: "button" },
      ],
      students: [],
      cursos: [],
      form: {},
    };
  },
  methods: {
    getStudents() {
      this.loading = true;
      AlunoService.list().then((response) => {
        this.students = response.data;
        this.loading = false;
      });
    },
    getCourses() {
      CursoService.list().then((response) => {
        this.cursos = response.data;
      });
    },
    update() {
      if (this.form.senha) {
        UsuariosService.update({
          email: this.form.email,
          senha: this.form.senha,
        });
      }

      this.dialog = false;
    },
    openDialog(item) {
      const { idCurso, email, idPessoa, idUsuario } = item;
      this.form = { idCurso, email };
    },
  },
  created() {
    this.getStudents();
  },
};
</script>
