<template>
  <ModelList title="Historico">
    <v-data-table
      :headers="headers"
      :items="[...payments, ...payments, ...payments, ...payments]"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.button="{ item }">
        <v-chip class="ma-2" color="green" text-color="white">
          Pago
        </v-chip>
      </template>
    </v-data-table>
  </ModelList>
</template>

<script>
import ModelList from "./ModelList";
import { PagamentosService } from "@/services/api";

export default {
  name: "ListHistory",
  components: {
    ModelList,
  },
  data() {
    return {
      headers: [
        { text: "Emissao", value: "emissao" },
        { text: "Valor", value: "valor" },
        { text: "Vencimento", value: "vencimento" },
        { text: "Acoes", value: "button" },
      ],
      payments: [
        {
          emissao: "20/04/2021",
          valor: "R$ 500,00",
          vencimento: "22/04/2021",
          button: true,
        },
        {
          emissao: "20/04/2021",
          valor: "R$ 500,00",
          vencimento: "22/04/2021",
          button: true,
        },
        {
          emissao: "20/04/2021",
          valor: "R$ 500,00",
          vencimento: "22/04/2021",
          button: true,
        },
        {
          emissao: "20/04/2021",
          valor: "R$ 500,00",
          vencimento: "22/04/2021",
          button: true,
        },
        {
          emissao: "20/04/2021",
          valor: "R$ 500,00",
          vencimento: "22/04/2021",
          button: true,
        },
      ],
    };
  },
  methods: {
    getPagamentos() {},
  },
};
</script>
