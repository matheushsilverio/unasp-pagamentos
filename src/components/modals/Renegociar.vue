<template>
  <v-dialog v-model="modalActive" max-width="600" @click:outside="close" eager>
    <v-card>
      <v-card-title class="text-h5">
        Renegociar Fatura
      </v-card-title>

      <div v-if="loading" class="content center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>

      <div v-else class="content">
        <v-text-field
          v-model="formFatura.parcelas"
          label="Parcelas desejadas"
          required
        ></v-text-field>

        <v-divider inset></v-divider>

        <div v-if="dividasAbertas.length > 0">
          <v-list-item
            v-for="(divida, index) in dividasAbertas"
            :key="`divp-${divida.id}`"
          >
            <v-list-item-avatar>
              <v-icon class="grey lighten-1" dark>
                mdi-cash-remove
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                v-text="`Parcela ${index + 1}`"
              ></v-list-item-title>

              <v-list-item-subtitle
                v-text="divida.dataVencimento"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div class="card-control" v-else>
          Não há dívidas pagas
        </div>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="loadingPay"
          color="green darken-1"
          text
          @click="close"
        >
          Voltar
        </v-btn>
        <v-btn
          :disabled="loadingPay"
          color="green darken-1"
          text
          @click="updatefatura"
        >
          Renegociar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DividasService, FaturaService } from "@/services/api";

export default {
  name: "Modal",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    fatura: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalActive: false,
      dividasAbertas: [],
      loading: false,
      loadingPay: false,
      formFatura: {},
    };
  },
  watch: {
    active(n) {
      if (n) {
        this.getDividas();
      }
      this.modalActive = n;
    },
    modalActive(n) {
      if (!n) {
        this.close();
      }
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    updatefatura() {
      this.loadingPay = true;
      const { parcelas, ...fatura } = { ...this.fatura };
      const newFatura = { ...fatura, ...this.formFatura };

      FaturaService.update(newFatura)
        .then(() => {
          this.createNewDividas(newFatura).then(() => {
            this.getDividas();
          });
        })
        .finally(() => {
          this.loadingPay = false;
          this.$emit("reload");
        });
    },
    createNewDividas(fatura) {
      const promises = [];
      for (let i = 2; i <= fatura.parcelas; i++) {
        const dataVencimento = `${new Date().getFullYear()}-${new Date().getMonth() +
          (i + 1)}-${new Date().getUTCDate()}`;

        promises.push(
          DividasService.create({
            idFatura: fatura.id,
            juros: "1",
            dataVencimento,
          })
        );
      }

      return Promise.all(promises);
    },
    getDividas() {
      this.loading = true;
      this.dividasAbertas = [];
      this.dividasPagas = [];

      const valorDivida = this.fatura.valor / this.formFatura.parcelas;
      DividasService.getDynamic(`fatura/${this.fatura.id}`).then((response) => {
        response.data.forEach((divida) => {
          if (divida.idStatus === null) {
            this.dividasAbertas.push({ ...divida, valor: valorDivida });
          }
        });
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1.5em;

  .card-control {
    padding: 1em;
    opacity: 0.3;
  }
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
