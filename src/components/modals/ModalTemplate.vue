<template>
  <v-dialog v-model="modalActive" max-width="290" @click:outside="close">
    <v-card>
      <v-card-title class="text-h5">
        Use Google's location service?
      </v-card-title>

      <v-card-text>
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">
          Disagree
        </v-btn>

        <v-btn color="green darken-1" text @click="dialog = false">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalTemplate",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      modalActive: false,
    };
  },
  watch: {
    active(n) {
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
  },
};
</script>

<style></style>
