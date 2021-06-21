<template>
  <ModelList title="Mensalidades">
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="[...payments, ...payments, ...payments, ...payments]"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.button="{ item }">
        <div v-if="!item.status">
          <v-btn color="success" @click="openModalPagar(item)">
            Pagar
          </v-btn>
          <v-btn
            class="ml-3"
            color="indigo"
            dark
            @click="openModalRenegociar(item)"
          >
            Renegociar
          </v-btn>
        </div>
        <v-chip v-else color="green lighten-5" label text-color="green">
          Pago
        </v-chip>
      </template>
    </v-data-table>
    <ModalPagar
      :active="isActiveModalPagar"
      :fatura="faturaSelected"
      @close="closeModalPagar"
      @reload="getFaturas"
    ></ModalPagar>
    <ModalRenegociar
      :active="isActiveModalRenegociar"
      :fatura="faturaSelected"
      @close="closeModalRenegociar"
      @reload="getFaturas"
    ></ModalRenegociar>
  </ModelList>
</template>

<script>
import { FaturaService } from "@/services/api";
import ModelList from "./ModelList";
import { mapGetters } from "vuex";
import ModalPagar from "./modals/Pagar.vue";
import ModalRenegociar from "./modals/Renegociar.vue";

export default {
  name: "ListPayments",
  components: {
    ModelList,
    ModalPagar,
    ModalRenegociar,
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Emissao", value: "dataEmissao" },
        { text: "Valor", value: "valor" },
        { text: "parcelas", value: "parcelas" },
        { text: "Acoes", value: "button" },
      ],
      payments: [],
      isActiveModalPagar: false,
      isActiveModalRenegociar: false,
      faturaSelected: {},
    };
  },
  computed: {
    ...mapGetters("User", ["userStore"]),
  },
  methods: {
    getFaturas() {
      this.loading = true;
      let route = "";
      if ("id" in this.userStore.aluno) {
        route = `aluno/${this.userStore.aluno.id}`;
      }

      FaturaService.getDynamic(route).then((response) => {
        this.payments = response.data.map((p) => {
          if (p.dividas.length == p.parcelas) p.status = true;
          else p.status = false;
          return p;
        });
        this.loading = false;
      });
    },
    openModalPagar(fatura) {
      this.faturaSelected = { ...fatura };
      this.isActiveModalPagar = true;
    },
    closeModalPagar() {
      this.isActiveModalPagar = false;
    },
    openModalRenegociar(fatura) {
      this.faturaSelected = { ...fatura };
      this.isActiveModalRenegociar = true;
    },
    closeModalRenegociar() {
      this.isActiveModalRenegociar = false;
    },
  },
  created() {
    this.getFaturas();
  },
};
</script>
