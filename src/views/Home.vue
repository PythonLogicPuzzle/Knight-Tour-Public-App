<template>
  <section>
    <article class="p-2">
      <strong>
        {{ instruction }}
      </strong>
    </article>
    <article>
      <Chessboard ref="chessboard" />
    </article>
    <article>
      <Dashboard @chessboard-event="e => $refs.chessboard[e]()" />
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex"
import Chessboard from "@/components/Chessboard"
import Dashboard from "@/components/Dashboard"

export default {
  name: "Home",
  computed: mapGetters(["instruction"]),
  components: {
    Chessboard,
    Dashboard
  }
}
</script>

<style scoped>
section {
  display: flex;
}

article:nth-child(1) {
  flex: .5;
}
article:nth-child(2) {
  flex: 3;
}
article:nth-child(3) {
  flex: 1.15;
}


@media screen and (max-width: 815px) {
  section {
    flex-direction: column-reverse;
  }
}
</style>
