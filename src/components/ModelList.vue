<template>
  <v-card>
    <div class="list-container">
      <v-row>
        <v-col>
          <h2>{{ title }}</h2>
        </v-col>
        <v-col v-if="hasButton">
          <v-btn :to="route">Cadastro</v-btn>
        </v-col>
      </v-row>

      <div class="list-content">
        <slot />
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ModelList",
  props: {
    title: {
      type: String,
      default: "Listagem",
    },
    route: {
      type: String,
      default: "",
    },
    hasButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  padding: 1em;

  h2 {
    margin-bottom: 1em;
  }
}
</style>
