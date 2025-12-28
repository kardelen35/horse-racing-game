import Vue from "vue";
import Vuex from "vuex";
import * as horseService from "@/services/horseService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    horses: [],
    rounds: [],
    currentRoundIndex: 0,
    isRaceStarted: false,
    raceResults: [],
  },

  mutations: {
    SET_HORSES(state, horses) {
      state.horses = horses;
    },
    SET_ROUNDS(state, rounds) {
      state.rounds = rounds;
    },
    SET_CURRENT_ROUND_INDEX(state, currentRoundIndex) {
      state.currentRoundIndex = currentRoundIndex;
    },
    SET_IS_RACING(state, isRaceStarted) {
      state.isRaceStarted = isRaceStarted;
    },
    ADD_RACE_RESULT(state, result) {
      state.raceResults.push(result);
    },
    RESET_RACE(state) {
      state.currentRoundIndex = 0;
      state.raceResults = [];
      state.isRaceStarted = false;
      
    },
    UPDATE_ROUND(state, { roundIndex, horses }) {
      Vue.set(state.rounds, roundIndex, {
        ...state.rounds[roundIndex],
        horses: [...horses], // updated horses
      });
    },
  },

  actions: {
    generateHorses({ commit }) {
      const horses = horseService.generateHorses();
      commit("SET_HORSES", horses);
    },

    generateSchedule({ commit, state }) {
      const rounds = horseService.generateSchedule(state.horses);
      commit("SET_ROUNDS", rounds);
      commit("RESET_RACE");
    },

 startRace({ commit, state }) {
  if (state.currentRoundIndex >= state.rounds.length) {
    return;
  }

  commit("SET_IS_RACING", true);
  const currentRound = state.rounds[state.currentRoundIndex];

  const racingHorses = currentRound.horses.map((horse) => {
    return {
      ...horse,
      position: horse.position ?? 0,
      speed: 4+ Math.random() * 8,
    };
  });

  const interval = setInterval(() => {
    let allFinished = true;

    racingHorses.forEach((horse) => {
      if (horse.position < currentRound.distance) {
        horse.position += horse.speed;
        allFinished = false;
      } else {
        horse.position = currentRound.distance;
      }
    });

    commit("UPDATE_ROUND", {
      roundIndex: state.currentRoundIndex,
      horses: racingHorses,
    });

    if (allFinished) {
      clearInterval(interval);

      const sorted = [...racingHorses].sort((a, b) => {
        if (b.position === a.position) {
          return b.conditionScore - a.conditionScore;
        }
        return b.position - a.position;
      });

      const results = sorted.map((horse, index) => ({
        position: index + 1,
        horseName: horse.name,
        horseId: horse.id,
        color: horse.color,
      }));

      commit("ADD_RACE_RESULT", {
        round: currentRound.roundNumber,
        distance: currentRound.distance,
        results,
      });

      commit("SET_IS_RACING", false);
      commit("SET_CURRENT_ROUND_INDEX", state.currentRoundIndex + 1);
    }
  }, 20);
}
  },

  getters: {
    // calculated value
    currentRound: (state) => {
      return state.rounds[state.currentRoundIndex] || null;
    },
    raceResults: (state) => state.raceResults,
  },

  modules: {},
});
