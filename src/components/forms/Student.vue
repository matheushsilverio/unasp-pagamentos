<template>
  <ModelForm ref="model" title="Cadastro de Aluno" @submit="handleSubmit">
    <validation-provider v-slot="{ errors }" name="Nome" rules="required">
      <v-text-field
        v-model="formPerson.nome"
        :error-messages="errors"
        label="Nome"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="CPF" rules="required">
      <v-text-field
        v-model="formPerson.cpf"
        :error-messages="errors"
        label="CPF"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="CEP" rules="required">
      <v-text-field
        v-model="formPerson.cep"
        :error-messages="errors"
        label="CEP"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Logradouro" rules="required">
      <v-text-field
        v-model="formPerson.logradouro"
        :error-messages="errors"
        label="Logradouro"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Numero" rules="required">
      <v-text-field
        v-model="formPerson.numero"
        :error-messages="errors"
        label="Numero"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider
      v-slot="{ errors }"
      name="Complemento"
      rules="required"
    >
      <v-text-field
        v-model="formPerson.complemento"
        :error-messages="errors"
        label="Complemento"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Cidade" rules="required">
      <v-text-field
        v-model="formPerson.cidade"
        :error-messages="errors"
        label="Cidade"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="UF" rules="required">
      <v-text-field
        v-model="formPerson.uf"
        :error-messages="errors"
        label="UF"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Email" rules="required">
      <v-text-field
        v-model="formUser.email"
        :error-messages="errors"
        label="email"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Senha" rules="required">
      <v-text-field
        v-model="formUser.senha"
        :error-messages="errors"
        label="Senha"
        type="password"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="RA" rules="required">
      <v-text-field
        v-model="formStudent.ra"
        :error-messages="errors"
        label="RA"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Curso" rules="required">
      <v-select
        v-model="formStudent.idCurso"
        :items="items"
        :error-messages="errors"
        label="Curso"
        data-vv-name="select"
        item-text="nome"
        item-value="id"
        required
      ></v-select>
    </validation-provider>
    <validation-provider
      v-slot="{ errors }"
      rules="required"
      name="Responsavel"
    >
      <v-checkbox
        v-model="responsible"
        :error-messages="errors"
        :true-value="true"
        :false-value="false"
        label="Responsavel Financeiro"
        type="checkbox"
        disabled
        required
      ></v-checkbox>
    </validation-provider>
  </ModelForm>
</template>

<script>
import ModelForm from "../ModelForm";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import {
  PessoaService,
  UsuariosService,
  AlunoService,
  CursoService,
  FaturaService,
} from "@/services/api";

export default {
  name: "FormStudents",
  components: {
    ModelForm,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      responsible: true,
      formPerson: {},
      formStudent: {},
      formUser: {
        nivelAcesso: "usuario",
      },
      items: [],
    };
  },
  created() {
    this.getCourses();
  },
  methods: {
    getCourses() {
      CursoService.list().then((response) => {
        this.items = response.data;
      });
    },
    async handleSubmit() {
      const { id: idUsuario } = (
        await UsuariosService.create(this.formUser)
      ).data;

      PessoaService.create({ ...this.formPerson, idUsuario }).then(
        (personCreated) => {
          const { id: idPessoa } = personCreated.data;
          const idResponsavel = idPessoa;

          AlunoService.create({
            ...this.formStudent,
            idPessoa,
            idResponsavel,
          }).then((response) => {
            this.$refs.model.clear();
            const aluno = response.data;
            this.createPayments(aluno);
          });
        }
      );
    },
    createPayments(aluno) {
      const promises = [];
      const [curso] = this.items.filter((c) => c.id === aluno.idCurso);
      const dataEmissao = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getUTCDate()}`;

      [1, 2, 3, 4, 5, 6].forEach(() => {
        promises.push(
          FaturaService.create({
            idAluno: aluno.id,
            idResponsavel: aluno.id,
            valor: curso.mensalidade,
            dataEmissao: dataEmissao,
            parcelas: 1,
          })
        );
      });

      Promise.all(promises).then(() => {
        this.$router.push({ name: "ListStudents" });
      });
    },
  },
};
</script>

<style></style>
