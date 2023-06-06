<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <content v-if="show" />
    </div>
  </div>
</template>

<script>
import Content from "./content.vue";

export default {
  components: { Content },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    document
      .querySelector("#loginModal")
      .addEventListener("show.bs.modal", () => {
        this.show = true;
      });

    document
      .querySelector("#loginModal")
      .addEventListener("hidden.bs.modal", () => {
        this.show = false;
      });
  },
};
</script>
