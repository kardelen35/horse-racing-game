<template>
  <div class="race-track-wrapper">
    <div class="track-header">
      <h2 class="flex items-center gap-3 text-xl font-bold text-white">
        <span class="text-2xl">🏁</span>
        Race Track
      </h2>
      <div v-if="currentRound" class="round-badge">
        Round {{ currentRound.roundNumber }} • {{ currentRound.distance }}m
      </div>
    </div>

    <div v-if="!currentRound" class="empty-state">
      <div class="empty-content">
        <span class="text-6xl mb-4">🏇</span>
        <p class="text-lg text-gray-400">
          Click "Generate Program" to start racing
        </p>
      </div>
    </div>

    <div v-else class="track-container">
      <div class="start-line">
        <span class="start-text">START</span>
      </div>

      <div class="lanes-container">
        <div
          v-for="(horse, index) in currentRound.horses"
          :key="horse.id"
          class="lane"
        >
          <div class="lane-number">{{ index + 1 }}</div>

          <div class="lane-static-info">
            <span class="horse-name-static">{{ horse.name }}</span>
          </div>

          <div class="racing-line">
            <div
              class="horse-runner"
              :class="{ racing: isRacing }"
              :style="{
                left: calculatePosition(horse) + '%',
              }"
            >
              <div class="horse-name-moving">{{ horse.name }}</div>

              <div
                class="horse-avatar"
                :style="{ backgroundColor: horse.color }"
              >
                <span class="horse-emoji">🐴</span>
              </div>
            </div>

            <div class="lane-line"></div>
          </div>
        </div>
      </div>

      <div class="finish-line">
        <div class="finish-flag">🏁</div>
        <span class="finish-text">FINISH</span>
      </div>

      <div class="distance-markers">
        <div class="marker" style="left: 0%">
          <span>0m</span>
        </div>
        <div class="marker" style="left: 25%">
          <span>{{ Math.round(currentRound.distance * 0.25) }}m</span>
        </div>
        <div class="marker" style="left: 50%">
          <span>{{ Math.round(currentRound.distance * 0.5) }}m</span>
        </div>
        <div class="marker" style="left: 75%">
          <span>{{ Math.round(currentRound.distance * 0.75) }}m</span>
        </div>
        <div class="marker" style="left: 100%">
          <span>{{ currentRound.distance }}m</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RaceTrack",

  computed: {
    ...mapGetters(["currentRound"]),

    isRacing() {
      return this.$store.state.isRaceStarted;
    },
  },

  methods: {
    calculatePosition(horse) {
      if (!horse.position) return 0;
      const distance = this.currentRound.distance;
      return Math.min((horse.position / distance) * 95, 95);
    },
  },
};
</script>

<style scoped>
.track-container {
  position: relative;
  padding: 19px 36px 38px 64px;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto; 
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.track-container::-webkit-scrollbar {
  width: 6px;
}

.track-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.track-container::-webkit-scrollbar-thumb {
  background: rgba(253, 121, 168, 0.5);
  border-radius: 3px;
}

.track-container::-webkit-scrollbar-thumb:hover {
  background: rgba(253, 121, 168, 0.7);
}

.start-line {
  position: absolute;
  left: 60px;
  top: 12px;
  bottom: 40px;
  width: 2px;
  background: repeating-linear-gradient(
    0deg,
    #4ade80,
    #4ade80 10px,
    transparent 10px,
    transparent 20px
  );
  z-index: 5;
}

.start-text {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  color: #4ade80;
  font-weight: 700;
  font-size: 9px;
  white-space: nowrap;
}

.lanes-container {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 0;
  padding: 3px 0;
}

.lane {
  height: auto;
  min-height: 32px;
  position: relative;
  display: flex;
  align-items: center;
}

.lane-number {
  position: absolute;
  left: -60px;
  width: 18px;
  height: 18px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.6);
  z-index: 2;
}

.lane-static-info {
  position: absolute;
  left: -38px;
  display: flex;
  align-items: center;
  gap: 2px;
  z-index: 2;
}

.horse-name-static {
  font-size: 8px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.racing-line {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.lane-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.15) 0px,
    rgba(255, 255, 255, 0.15) 15px,
    transparent 15px,
    transparent 30px
  );
  transform: translateY(-50%);
}

.horse-runner {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  transition: left 0.1s linear;
  z-index: 10;
}

.horse-name-moving {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 8px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.horse-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.horse-emoji {
  font-size: 16px;
  animation: gallop 0.4s infinite;
}

.horse-runner.racing .horse-emoji {
  animation: gallop 0.18s infinite;
}

@keyframes gallop {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-1.5px) rotate(-2deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(-1.5px) rotate(2deg);
  }
}

.finish-line {
  position: absolute;
  right: 17px;
  top: 12px;
  bottom: 40px;
  width: 3px;
  background: repeating-linear-gradient(
    0deg,
    #000,
    #000 10px,
    #fff 10px,
    #fff 20px
  );
  z-index: 5;
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(253, 121, 168, 0.4);
}

.finish-flag {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  animation: wave-flag 1s infinite;
}

@keyframes wave-flag {
  0%,
  100% {
    transform: translateX(-50%) rotate(0deg);
  }
  50% {
    transform: translateX(-50%) rotate(10deg);
  }
}

.finish-text {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  color: #fd79a8;
  font-weight: 700;
  font-size: 9px;
  white-space: nowrap;
}

.distance-markers {
  position: absolute;
  bottom: 28px;
  left: 75px;
  right: 65px;
  height: 16px;
  display: flex;
  justify-content: space-between;
}

.marker {
  position: absolute;
  transform: translateX(-50%);
  text-align: center;
}

.marker span {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 700;
}

.marker::before {
  content: "";
  display: block;
  width: 1px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 auto 3px;
}

.race-track-wrapper {
  background: rgba(20, 20, 32, 0.95);
  border-radius: 12px;
  padding: 8px;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.track-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.track-header h2 {
  font-size: 14px;
}

.track-header .text-2xl {
  font-size: 1.25rem;
}

.round-badge {
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  color: white;
  padding: 3px 8px;
  border-radius: 16px;
  font-size: 10px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(253, 121, 168, 0.25);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 0;
}

.empty-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-content span {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.empty-content p {
  font-size: 13px;
}
</style>