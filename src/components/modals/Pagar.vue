<template>
  <v-dialog v-model="modalActive" max-width="600" @click:outside="close" eager>
    <v-card>
      <v-card-title class="text-h5">
        Pagar Fatura
      </v-card-title>

      <div v-if="loading" class="content center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else class="content">
        <div v-if="dividasAbertas.length > 0">
          <v-list-item
            v-for="(divida, index) in dividasAbertas"
            :key="`div-${divida.id}`"
          >
            <v-list-item-avatar>
              <v-icon class="grey lighten-1" dark>
                mdi-cash-remove
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                v-text="`Parcela ${index + 1} - R$ ${divida.valor}`"
              ></v-list-item-title>

              <v-list-item-subtitle
                v-text="divida.dataVencimento"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :loading="loadingPay"
                :disabled="loadingPay"
                icon
                @click="pagar(divida)"
              >
                <v-icon color="grey lighten-1">mdi-credit-card-check</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </div>
        <div class="card-control" v-else>
          Não há dívidas abertas
        </div>

        <v-divider inset></v-divider>

        <div v-if="dividasPagas.length > 0">
          <v-list-item
            v-for="(divida, index) in dividasPagas"
            :key="`divp-${divida.id}`"
          >
            <v-list-item-avatar>
              <v-icon class="green lighten-1" dark>
                mdi-cash-check
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DividasService, PagamentosService } from "@/services/api";

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
      dividasPagas: [],
      loadingPay: false,
      loading: false,
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
    getDividas() {
      this.loading = true;
      this.dividasAbertas = [];
      this.dividasPagas = [];

      const valorDivida = this.fatura.valor / this.fatura.parcelas;
      DividasService.getDynamic(`fatura/${this.fatura.id}`).then((response) => {
        response.data.forEach((divida) => {
          if (divida.idStatus === null) {
            this.dividasAbertas.push({ ...divida, valor: valorDivida });
          } else {
            this.dividasPagas.push({ ...divida, valor: valorDivida });
          }
        });
        this.loading = false;
      });
    },
    pagar(divida) {
      this.loadingPay = true;
      PagamentosService.create({
        idDivida: divida.id,
        idStatus: 1,
      }).then(() => {
        this.loadingPay = false;
        this.getDividas();
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
