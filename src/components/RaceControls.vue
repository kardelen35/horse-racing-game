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
  border-radius: 8px;
  padding: 8px 12px; /* ← KÜÇÜLT: 10px 14px → 8px 12px */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.title-section {
  flex: 1;
  min-width: 180px; 
}

.title-section h1 {
  font-size: 14px; 
  line-height: 1.1;
}

.title-section p {
  font-size: 10px; 
  margin-top: 1px;
}

.title-section .text-4xl {
  font-size: 1.5rem; 
}

.controls-section {
  display: flex;
  gap: 6px; 
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 4px; 
  padding: 6px 12px; 
  font-size: 11px; 
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
}

.btn span {
  font-size: 13px; 
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
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
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
  box-shadow: 0 4px 12px rgba(253, 121, 168, 0.3);
}

.rounds-schedule {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px; 
  margin-top: 8px; 
  padding-top: 8px; 
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.round-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px; 
  padding: 5px; 
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.round-number {
  font-weight: 700;
  font-size: 10px; 
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1px;
}

.round-distance {
  font-size: 9px; 
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2px;
  font-weight: 600;
}

.round-status {
  font-size: 13px; 
  margin-top: 1px;
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
  box-shadow: 0 0 15px rgba(253, 121, 168, 0.4),
    0 0 8px rgba(253, 121, 168, 0.25) inset;
  animation: pulse-glow-dark 2s infinite;
}

.round-active .round-number,
.round-active .round-distance {
  color: #ffffff;
  text-shadow: 0 0 6px rgba(253, 121, 168, 0.6);
}

.round-active .round-status {
  filter: drop-shadow(0 0 5px rgba(253, 121, 168, 0.6));
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
    box-shadow: 0 0 15px rgba(253, 121, 168, 0.4),
      0 0 8px rgba(253, 121, 168, 0.25) inset;
    border-color: #fd79a8;
  }
  50% {
    box-shadow: 0 0 25px rgba(253, 121, 168, 0.7),
      0 0 12px rgba(253, 121, 168, 0.4) inset;
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
    padding: 5px 10px;
    font-size: 10px;
  }
}
</style>
