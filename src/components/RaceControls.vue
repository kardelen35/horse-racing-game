<template>
  <div class="race-controls-wrapper">
    <div class="control-panel">
      <div class="title-section">
        <div class="flex items-center gap-3">
          <span class="text-4xl">🏇</span>
          <div>
            <h1 class="text-2xl font-bold text-white">
              Horse Racing Championship
            </h1>
            <p v-if="currentRound" class="text-gray-300 text-sm mt-1">
              <span class="font-semibold text-pink-400"
                >Round {{ currentRound.roundNumber }}</span
              >
              • {{ currentRound.distance }}m Track
            </p>
            <p v-else class="text-gray-400 text-sm mt-1">
              Click Generate to create racing schedule
            </p>
          </div>
        </div>
      </div>

      <div class="controls-section">
        <button
          @click="handleGenerateProgram"
          :disabled="isRacing"
          class="btn btn-generate"
        >
          <span class="text-xl">🎲</span>
          <span class="btn-text">Generate</span>
        </button>

        <button
          @click="handleStartRace"
          :disabled="!isRoundsCreated || isRacing"
          class="btn btn-start"
        >
          <span v-if="!isRacing" class="text-xl">▶️</span>
          <span v-else class="animate-pulse text-xl">⏸️</span>
          <span class="btn-text">{{ isRacing ? "Racing..." : "Start" }}</span>
        </button>
      </div>
    </div>

    <div v-if="isRoundsCreated" class="rounds-schedule">
      <div
        v-for="(round, index) in rounds"
        :key="index"
        class="round-card"
        :class="{
          'round-active': index === currentRoundIndex && isRacing,
          'round-completed': index < currentRoundIndex && !allRoundsCompleted,
          'round-upcoming': index > currentRoundIndex,
          'round-current': index === currentRoundIndex && !isRacing,
        }"
      >
        <div class="round-number">R{{ round.roundNumber }}</div>
        <div class="round-distance">{{ round.distance }}m</div>
        <div class="round-status">
          <span v-if="index < currentRoundIndex">✓</span>
          <span v-else-if="index === currentRoundIndex && isRacing">🏁</span>
          <span v-else-if="index === currentRoundIndex">→</span>
          <span v-else>○</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RaceControls",

  //useMemo
  computed: {
    ...mapGetters(["currentRound"]),

    isRacing() {
      return this.$store.state.isRaceStarted;
    },

    isRoundsCreated() {
      return this.$store.state.rounds.length > 0;
    },

    currentRoundIndex() {
      return this.$store.state.currentRoundIndex;
    },

    rounds() {
      return this.$store.state.rounds;
    },
     allRoundsCompleted() {
      return this.currentRoundIndex >= this.rounds.length;
    },
  },

  methods: {
    //functions
    ...mapActions(["generateHorses", "generateSchedule", "startRace"]),

    handleGenerateProgram() {
      this.generateHorses();
      this.generateSchedule();
    },

    handleStartRace() {
      this.startRace();
    },
  },
};
</script>

<style scoped>
.race-controls-wrapper {
  background: linear-gradient(135deg, #2d3436 0%, #1a1a1a 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
}

.title-section {
  flex: 1;
  min-width: 300px;
}

.controls-section {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:not(:disabled):hover::before {
  width: 300px;
  height: 300px;
}

.btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
}

.btn:not(:disabled):active {
  transform: translateY(0);
}

.btn-text {
  position: relative;
  z-index: 1;
}

.btn-generate {
  background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%);
  color: #1f2937;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-generate:not(:disabled):hover {
  background: linear-gradient(135deg, #f9fafb 0%, #d1d5db 100%);
}

.btn-start {
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  color: white;
  border: 1px solid rgba(253, 121, 168, 0.3);
}

.btn-start:not(:disabled):hover {
  background: linear-gradient(135deg, #ff8fb3 0%, #ff5da2 100%);
  box-shadow: 0 8px 25px rgba(253, 121, 168, 0.4);
}

.rounds-schedule {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.round-card {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.round-number {
  font-weight: 700;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.round-distance {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 6px;
  font-weight: 600;
}

.round-status {
  font-size: 18px;
  margin-top: 4px;
}


.round-completed {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.4);
}

.round-completed .round-number,
.round-completed .round-distance {
  color: #86efac;
}

.round-completed .round-status {
  color: #4ade80;
}

.round-active {
  background: rgba(253, 121, 168, 0.2);
  border-color: #fd79a8;
  box-shadow: 0 0 30px rgba(253, 121, 168, 0.6),
    0 0 15px rgba(253, 121, 168, 0.4) inset;
  animation: pulse-glow-dark 2s infinite;
}

.round-active .round-number,
.round-active .round-distance {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(253, 121, 168, 0.8);
}

.round-active .round-status {
  filter: drop-shadow(0 0 8px rgba(253, 121, 168, 0.8));
}

.round-current {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.5);
}

.round-current .round-number,
.round-current .round-distance {
  color: #fbbf24;
}

.round-upcoming {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
}

.round-upcoming .round-number,
.round-upcoming .round-distance {
  color: rgba(255, 255, 255, 0.3);
}

@keyframes pulse-glow-dark {
  0%,
  100% {
    box-shadow: 0 0 30px rgba(253, 121, 168, 0.6),
      0 0 15px rgba(253, 121, 168, 0.4) inset;
    border-color: #fd79a8;
  }
  50% {
    box-shadow: 0 0 45px rgba(253, 121, 168, 0.9),
      0 0 25px rgba(253, 121, 168, 0.6) inset;
    border-color: #ff8fb3;
  }
}

@media (max-width: 1024px) {
  .rounds-schedule {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }

  .title-section {
    text-align: center;
  }

  .controls-section {
    justify-content: center;
  }

  .rounds-schedule {
    grid-template-columns: repeat(2, 1fr);
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
