<template>
  <div class="alert border-radius text-center" v-show="getMessage !== ''">
    <div class="alert-message">
      <span class="alert-cancel-btn">
        <i class="fas fa-times-circle" @click="remove"></i>
      </span>
      {{ getMessage }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    remove() {
      this.$store.dispatch("alertModule/removeMessage");
    },
  },
  computed: {
    ...mapGetters("alertModule", ["getMessage"]),
  },
};
</script>
