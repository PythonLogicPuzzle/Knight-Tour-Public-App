<template>
  <chess-board draggable-pieces drop-off-board="snapback"></chess-board>
</template>

<script>
import Chess from "chess.js"
import { mapGetters } from "vuex"
import { markupSquare } from "@/helpers"
import warnsdorff from "@/warnsdorff"
export default {
  name: "Chessboard",
  mounted() {
    this.boardEl = document.querySelector("chess-board")
    this.boardEl.addEventListener("drop", this.droped)
    
    this.reset()
  },
  data() {
    return {
      boardEl: null,
      takenSpots: null,
      game: new Chess(),
      positionSuffix: " b - - 0 1"
    }
  },
  computed: mapGetters(["timeouts", "delayTime"]),
  methods: {
    changeState(state) {
      Object.entries(state).forEach(([key, value]) => this.$store.dispatch(key, value))
    },
    currentPosition() {
      return Object.keys(this.boardEl.position)[0]
    },
    selectInBoard(selector) {
      return this.boardEl.shadowRoot.querySelectorAll(selector)
    },
    markup(target, markup) {
      const targetId = "#square-" + target
      const [squareEl] = this.selectInBoard(targetId)
      markupSquare(markup ? markup : this.takenSpots.length, squareEl)
    },
    reset() {
      this.takenSpots = ["a8"]
      this.boardEl.setPosition({ a8: "bN" })
    },
    boardReady() {
      this.game.load(this.boardEl.fen() + this.positionSuffix)
      this.markup(this.currentPosition(), 1)

      this.changeState({ updateBoardState: "ready" })
    },
    droped({ detail }) {
      const { source, target, setAction } = detail
      
      if (this.$store.getters.boardState === "unready") {
        return this.takenSpots[0] = target === "offboard" ? source : target
      }

      const move = this.game.move({
        from: source,
        to: target
      })
      if (!move || this.takenSpots.includes(target)) {
        this.game.undo()
        return setAction("snapback")
      }
      
      this.takenSpots.push(target === "offboard" ? source : target)
      this.game.load(this.game.fen().replace(/\s.+/, this.positionSuffix))
      
      this.markup(target)
      
      if (this.takenSpots.length === 2) {
        this.changeState({ updateBoardState: "solving" })
      } else if (this.takenSpots.length === 64) {
        this.changeState({ updateBoardState: "solved" })
      }
    },
    nextMove() {
      const move = warnsdorff.nextMove(this.currentPosition(), this.takenSpots)
      if (!move) {
        return this.changeState({ updateBoardState: "stuck" })
      }
      
      this.boardEl.setPosition({ [move]: "bN" })
      this.game.load(this.boardEl.fen() + this.positionSuffix)
      
      setTimeout(() => this.markup(move), 1000)
      
      if (this.takenSpots.length === 2) {
        this.changeState({ updateBoardState: "solving" })
      } else if (this.takenSpots.length === 64) {
        this.changeState({ updateBoardState: "solved" })
      }
    },
    takeTour() {
      this.changeState({ updateBoardState: "visualizing" })
      const currentPosition = this.currentPosition()
      try {
        warnsdorff.takeTour(currentPosition, this.takenSpots)
      } catch {
        return this.changeState({ updateBoardState: "stuck" })
      }
      
      const currentPositionIndex = this.takenSpots.indexOf(currentPosition)
      const tour = this.takenSpots.slice(currentPositionIndex + 1)
      this.visualizeTour(tour)
      this.game.load(this.boardEl.fen() + this.positionSuffix)
    },
    visualizeTour(tour) {
      const offset = 64 - tour.length
      
      tour.forEach((move, index) => {
        const timeout = setTimeout(() => {
          this.boardEl.setPosition({ [move]: "bN" })
          setTimeout(() => this.markup(move, offset + index + 1), this.delayTime)
        }, this.delayTime * index)
        this.timeouts.push(timeout)
      })

      const timeout = setTimeout(() => {
        this.changeState({ updateBoardState: "solved" })
      }, this.delayTime * tour.length)
      this.timeouts.push(timeout)
    },
    clearBoard() {
      setTimeout(() => {
        this.selectInBoard(".square").forEach(square => square.style = "")
        this.selectInBoard("#moveNumberContainer").forEach(container => container.remove())
      }, this.delayTime)
      this.reset()
      this.changeState({ updateBoardState: "unready" })
    }
  }
}
</script>

<style scoped>
chess-board {
  --dark-color:  #4cbb17;
  --light-color:  #d8ffc7;
  width: 550px;
  margin: auto;
  padding: 3rem 0 0 0;
}
@media only screen and (max-width: 816px) {
  chess-board {
    width: 95%;
  }
}
</style>
