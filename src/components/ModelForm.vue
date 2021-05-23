<template>
  <v-card>
    <div class="form-container">
      <h2>{{ title }}</h2>
      <div class="form-content">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <slot />

            <v-btn class="mr-4" type="submit" :disabled="invalid">
              submit
            </v-btn>
            <v-btn @click="clear">
              clear
            </v-btn>
          </form>
        </validation-observer>
      </div>
    </div>
  </v-card>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({}),
  props: {
    title: {
      type: String,
      default: "Formulario",
    },
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
      this.$emit("submit");
    },
    clear() {
      this.$emit("clear");
      this.$refs.observer.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  padding: 1em;

  h2 {
    margin-bottom: 1em;
  }
}
</style>
