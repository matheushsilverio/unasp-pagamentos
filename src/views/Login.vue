<template>
  <v-app>
    <v-main>
      <div id="login">
        <div class="module-login">
          <h2>Login</h2>
          <v-text-field label="Email" placeholder="Email"></v-text-field>
          <v-text-field
            label="Senha"
            type="password"
            placeholder="Senha"
          ></v-text-field>
          <div>
            <v-btn style="margin-right: 10px">Cancelar</v-btn>
            <v-btn @click="submit">Entrar</v-btn>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  methods: {
    submit() {
      this.$router.push({ name: "Panel" });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .module-login {
    min-height: 350px;
    min-width: 350px;
    padding: 1em;
    background-color: rgb(233, 233, 233);
    border-radius: 7px;
  }
}
</style>
