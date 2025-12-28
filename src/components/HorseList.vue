<template>
  <div class="horse-list">
    <h2 class="flex items-center gap-2 text-base font-semibold mb-3 pb-2 border-b border-primary/30">
      <span class="text-xl">🐴</span>
      Horses ({{ horses.length }})
    </h2>

    <div v-if="horses.length === 0" class="text-center py-12 text-white/50 text-xs">
      <p>Click "Generate Program"</p>
    </div>

    <div v-else class="horses-container flex-1 space-y-2 overflow-y-auto pr-1">
      <div
        v-for="horse in horses"
        :key="horse.id"
        class="horse-card"
        :class="{ 'racing-highlight': isHorseRacing(horse.id) }"
      >
        <div
          class="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 shadow-lg"
          :style="{ backgroundColor: horse.color }"
        >
          <span class="text-lg">🐴</span>
        </div>

        <div class="flex-1 min-w-0">
          <div class="font-semibold text-xs text-white mb-0.5">
            {{ horse.name }}
          </div>
          <div class="flex items-center gap-1 text-[10px]">
            <span class="text-white/60">Condition:</span>
            <span class="bg-primary/30 text-blue-400 px-1.5 py-0.5 rounded font-semibold">
              {{ horse.conditionScore }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HorseList",

  computed: {
    horses() {
      return this.$store.state.horses;
    },

    ...mapGetters(["currentRound"]),
  },

  methods: {
    isHorseRacing(horseId) {
      if (!this.currentRound || !this.$store.state.isRaceStarted) return false;
      return this.currentRound.horses.some((h) => h.id === horseId);
    },
  },
};
</script>

<style scoped>
.horse-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.horses-container::-webkit-scrollbar {
  width: 5px;
}

.horses-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.horses-container::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.5);
  border-radius: 3px;
}

.horses-container::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.7);
}

.horse-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.horse-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(3px);
}

.racing-highlight {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 15px rgba(102, 126, 234, 0.2);
}
</style>