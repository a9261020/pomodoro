<template>
  <div class="page">
    <header>
      <p class="text-left page__title">RINGTONES</p>
    </header>
    <main>
      <ul>
        <li
          class="ringtones border-radius"
          :class="{'checked':ring.name===selected.name}"
          v-for="ring in ringtones"
          :key="ring.id"
          @click="select(ring)"
        >
          <span class="ringtones-item-check">
            <i class="fas fa-check" v-show="ring.name === selected.name"></i>
          </span>
          <span class="ringtones-name">{{ring.name}}</span>
          <span class="ringtones-play">
            <i class="fas fa-play-circle"></i>
          </span>
        </li>
      </ul>
      <audio ref="audio-0" src="../assets/ring/default.mp3"></audio>
      <audio id="audio-1" src="../assets/ring/bell.mp3"></audio>
      <audio id="audio-2" src="../assets/ring/birds.mp3"></audio>
      <audio id="audio-3" src="../assets/ring/classic.mp3"></audio>
      <audio id="audio-4" src="../assets/ring/opening.mp3"></audio>
      <audio id="audio-5" src="../assets/ring/whatFlash.mp3"></audio>
      <audio id="audio-6" src="../assets/ring/alert.mp3"></audio>
      <audio id="audio-7" src="../assets/ring/warning.mp3"></audio>
    </main>
  </div>
</template>

<script>
export default {
  name: "Ringtones",
  data() {
    return {
      isPlay: false,
      ringtones: [
        {
          name: "default",
          id: "audio-0"
        },
        {
          name: "bell",
          id: "audio-1"
        },
        {
          name: "birds",
          id: "audio-2"
        },
        {
          name: "classic",
          id: "audio-3"
        },
        {
          name: "opening",
          id: "audio-4"
        },
        {
          name: "國棟 - 這什麼到底什麼閃現！",
          id: "audio-5"
        },
        {
          name: "alert",
          id: "audio-6"
        },
        {
          name: "warning",
          id: "audio-7"
        }
      ]
    };
  },
  computed: {
    selected() {
      return this.$store.state.ringModule.selected;
    }
  },
  methods: {
    select(ring) {
      this.$store.dispatch("ringModule/selectRing", ring);
    }
  },
  mounted() {
    console.log(this.$refs["audio-0"]);
    this.$refs["audio-0"].play();
    // this.$ref["audio-0"].play();
  }
};
</script>

<style></style>
