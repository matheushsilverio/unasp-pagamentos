<template>
  <v-app>
    <v-main>
      <div id="login">
        <div class="module-login">
          <h2>Login</h2>
          <v-text-field
            label="Email"
            v-model="email"
            placeholder="Email"
          ></v-text-field>
          <v-text-field
            label="Senha"
            type="password"
            v-model="senha"
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
import { mapActions } from "vuex";
import UserService from "@/services/userService";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    ...mapActions("User", ["setUserStore"]),
    submit() {
      UserService.login({ email: this.email, senha: this.senha })
        .then((response) => {
          this.setUserStore(response);
          this.$router.push({ name: "Panel" });
        })
        .catch((err) => {
          alert("Nao foi possivel realizar o login ");
        });
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
