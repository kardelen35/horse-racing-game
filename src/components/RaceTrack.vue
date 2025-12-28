<template>
  <div class="race-track-wrapper w-full">
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
            <span class="condition-badge">{{ horse.conditionScore }}</span>
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
.race-track-wrapper {
  background: rgba(20, 20, 32, 0.95);
  border-radius: 16px;
  padding: 24px;
  min-height: 600px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;  
  max-width: 100%;  
}

.track-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.round-badge {
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(253, 121, 168, 0.3);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.empty-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.track-container {
  position: relative;
  padding: 40px 80px 60px 200px;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  width: 100%;  
  max-width: 100%; 
}

.start-line {
  position: absolute;
  left: 185px;
  top: 40px;
  bottom: 60px;
  width: 4px;
  background: repeating-linear-gradient(
    0deg,
    #4ade80,
    #4ade80 15px,
    transparent 15px,
    transparent 30px
  );
  z-index: 5;
}

.start-text {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  color: #4ade80;
  font-weight: 700;
  font-size: 12px;
  white-space: nowrap;
}

.lanes-container {
  position: relative;
  z-index: 1;
}

.lane {
  height: 54px;
  position: relative;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}

.lane-number {
  position: absolute;
  left: -185px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  z-index: 2;
}

.lane-static-info {
  position: absolute;
  left: -145px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
}

.horse-name-static {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.condition-badge {
  background: rgba(253, 121, 168, 0.2);
  color: #fd79a8;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
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
    rgba(255, 255, 255, 0.2) 0px,
    rgba(255, 255, 255, 0.2) 25px,
    transparent 25px,
    transparent 50px
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
  gap: 8px;
  transition: left 0.1s linear;
  z-index: 10;
}

.horse-name-moving {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.horse-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.horse-emoji {
  font-size: 26px;
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
    transform: translateY(-2px) rotate(-3deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(-2px) rotate(3deg);
  }
}

.finish-line {
  position: absolute;
  right: 65px;
  top: 40px;
  bottom: 60px;
  width: 6px;
  background: repeating-linear-gradient(
    0deg,
    #000,
    #000 15px,
    #fff 15px,
    #fff 30px
  );
  z-index: 5;
  border-radius: 3px;
  box-shadow: 0 0 20px rgba(253, 121, 168, 0.5);
}

.finish-flag {
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
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
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  color: #fd79a8;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
}

.distance-markers {
  position: absolute;
  bottom: 20px;
  left: 200px;
  right: 80px;
  height: 20px;
  display: flex;
  justify-content: space-between;
}

.marker {
  position: absolute;
  transform: translateX(-50%);
  text-align: center;
}

.marker span {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
}

.marker::before {
  content: "";
  display: block;
  width: 2px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 auto 4px;
}

@media (max-width: 1024px) {
  .track-container {
    padding: 40px 60px 60px 180px;
  }

  .lane-number {
    left: -165px;
  }

  .lane-static-info {
    left: -125px;
  }

  .start-line {
    left: 165px;
  }

  .distance-markers {
    left: 180px;
  }
}

@media (max-width: 768px) {
  .track-container {
    padding: 40px 40px 60px 150px;
  }

  .lane-number {
    left: -135px;
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .lane-static-info {
    left: -100px;
  }

  .horse-name-static {
    font-size: 11px;
  }

  .start-line {
    left: 135px;
  }

  .distance-markers {
    left: 150px;
  }

  .finish-line {
    right: 25px;
  }

  .horse-avatar {
    width: 38px;
    height: 38px;
  }

  .horse-emoji {
    font-size: 22px;
  }

  .horse-name-moving {
    font-size: 10px;
    padding: 3px 8px;
  }
}
</style>
