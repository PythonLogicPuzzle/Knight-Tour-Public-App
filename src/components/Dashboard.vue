<template>
  <aside class="p-2">
    <template v-if="boardIsUnReady">
      <h6>Once you're ready</h6>
      <button
        @click="chessboardEvent('boardReady')"
        class="btn btn-lg btn-block btn-move shadow-none border-0"
      >
        Start Knight's Tour
      </button>
    </template>
    <template v-else>
      <div class="my-2">
        <label>Delay between moves (ms)</label>
        <input v-model="delayTime" :disabled="boardIsVisualizing" type="number" class="form-control form-control-sm">
      </div>
      <div class="btn-group btn-block">
        <button
          @click="chessboardEvent('nextMove')"
          :class="{ 'disabled': disableButton }"
          class="btn btn-lg btn-move shadow-none border-0"
        >
          Next move
        </button>
        <button
          @click="chessboardEvent('takeTour')"
          :class="{ 'disabled': disableButton }"
          class="btn btn-lg btn-tour text-white shadow-none border-0"
        >
          {{ tourButtonText }}
        </button>
      </div>
      <button
        @click="chessboardEvent('clearBoard')"
        class="my-2 btn btn-lg btn-block btn-secondary shadow-none border-0"
      >
        Clear board
      </button>
    </template>
  </aside>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["boardState"]),
    boardIsUnReady() {
      return this.boardState === "unready"
    },
    boardIsVisualizing() {
      return this.boardState === "visualizing"
    },
    disableButton() {
      return this.boardIsVisualizing || this.boardState === "stuck" || this.boardState === "solved"
    },
    tourButtonText() {
      return this.boardState === "solving" ? "Complete this tour" : "Solve"
    },
    delayTime: {
      get() {
        return this.$store.getters.delayTime
      },
      set(delay) {
        this.$store.dispatch("updateDelayTime", delay)
      }
    }
  },
  methods: {
    chessboardEvent(e) {
      if (["boardReady", "clearBoard"].includes(e) || !this.disableButton) {
        this.$emit("chessboard-event", e)
      }
    }
  }
}
</script>

<style scoped>
.btn-tour {
  background-color: #07a133;
}
.btn-tour:hover {
  background-color: #2d6a4f;
}

.btn-move {
  background-color: #dcf141;
}
.btn-move:hover {
  background-color: #DCE3AC;
}
</style>
