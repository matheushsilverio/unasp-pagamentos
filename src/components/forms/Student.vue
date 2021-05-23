<template>
  <ModelForm title="Cadastro de Aluno">
    <validation-provider v-slot="{ errors }" name="Nome" rules="required">
      <v-text-field
        v-model="form.nome"
        :error-messages="errors"
        label="Nome"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="CPF" rules="required">
      <v-text-field
        v-model="form.cpf"
        :error-messages="errors"
        label="CPF"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="CEP" rules="required">
      <v-text-field
        v-model="form.cep"
        :error-messages="errors"
        label="CEP"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Logradouro" rules="required">
      <v-text-field
        v-model="form.logradouro"
        :error-messages="errors"
        label="Logradouro"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Numero" rules="required">
      <v-text-field
        v-model="form.numero"
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
        v-model="form.complemento"
        :error-messages="errors"
        label="Complemento"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Cidade" rules="required">
      <v-text-field
        v-model="form.cidade"
        :error-messages="errors"
        label="Cidade"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="UF" rules="required">
      <v-text-field
        v-model="form.uf"
        :error-messages="errors"
        label="UF"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="RA" rules="required">
      <v-text-field
        v-model="form.uf"
        :error-messages="errors"
        label="RA"
        required
      ></v-text-field>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="Curso" rules="required">
      <v-select
        :items="items"
        :error-messages="errors"
        label="Curso"
        data-vv-name="select"
        required
      ></v-select>
    </validation-provider>
    <validation-provider
      v-slot="{ errors }"
      rules="required"
      name="Responsavel"
    >
      <v-checkbox
        :error-messages="errors"
        value="1"
        label="Responsavel Financeiro"
        type="checkbox"
        required
      ></v-checkbox>
    </validation-provider>
  </ModelForm>
</template>

<script>
import ModelForm from "../ModelForm";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "FormStudents",
  components: {
    ModelForm,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      form: {},
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    };
  },
};
</script>

<style></style>
