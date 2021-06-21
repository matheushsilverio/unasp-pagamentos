<template>
  <ModelForm ref="model" title="Inserir Curso" @submit="handleSubmit">
    <validation-provider v-slot="{ errors }" name="Nome" rules="required">
      <v-text-field
        v-model="form.nome"
        :error-messages="errors"
        label="Nome"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Descrição" rules="required">
      <v-text-field
        v-model="form.descricao"
        :error-messages="errors"
        label="Descrição"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider
      v-slot="{ errors }"
      name="Mensalidade"
      rules="required"
    >
      <v-text-field
        v-model="form.mensalidade"
        :error-messages="errors"
        label="Mensalidade"
        required
      ></v-text-field>
    </validation-provider>
  </ModelForm>
</template>

<script>
import ModelForm from "../ModelForm";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { CursoService } from "@/services/api";

export default {
  name: "FormCourse",
  components: {
    ModelForm,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        idInstituicao: 1,
      },
    };
  },
  methods: {
    handleSubmit() {
      CursoService.create(this.form).then(() => {
        this.$emit("reload");
      });
    },
  },
};
</script>

<style></style>
