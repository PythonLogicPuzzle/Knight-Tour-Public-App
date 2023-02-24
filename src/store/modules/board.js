const state = {
  board: {
    states: ["unready", "ready", "solving", "visualizing", "stuck", "solved"],
    state: "unready"
  }
}

const mutations = {
  UPDATE_BOARD_STATE(state, boardState) {
    state.board.state = boardState
  }
}

const actions = {
  updateBoardState({ commit }, boardState) {
    commit("UPDATE_BOARD_STATE", boardState)
    
    if (boardState === "ready") {
      commit(
        "UPDATE_INSTRUCTION",
        "Press the greenish button if you want to take the full tour, the yellowish one if you want the algorithm to figure out the next step for you, or move the knight on your own"
      )
    } else if (boardState === "solving") {
      commit(
        "UPDATE_INSTRUCTION",
        "You can still press the greenish button if you want the algorithm to take it from here"
      )
    } else if (boardState === "visualizing") {
      commit("UPDATE_INSTRUCTION", "")
    } else if (boardState === "stuck") {
      commit("UPDATE_INSTRUCTION", "Knight's Tour isn't possible")
    } else if (boardState === "solved") {
      commit("UPDATE_INSTRUCTION", "Finished!")
    } else {
      commit("CLEAR_TIMEOUTS")
      commit("RESET_TIMEOUTS")
      commit("UPDATE_INSTRUCTION", "Place the knight at an initial position and press Start Knight's Tour")
    }
  }
}

const getters = {
  boardState: ({ board }) => board.state
}

export default {
  state,
  mutations,
  actions,
  getters
}
