<template>
  <div class="horse-list">
    <h2
      class="flex items-center gap-3 text-lg font-semibold mb-5 pb-3 border-b border-primary/30"
    >
      <span class="text-2xl">🐴</span>
      Horses ({{ horses.length }})
    </h2>

    <div
      v-if="horses.length === 0"
      class="text-center py-16 text-white/50 text-sm"
    >
      <p>Click "Generate Program" to create horses</p>
    </div>

    <div
      v-else
      class="horses-container space-y-2.5 max-h-[650px] overflow-y-auto pr-1.5"
    >
      <div
        v-for="horse in horses"
        :key="horse.id"
        class="horse-card"
        :class="{ 'racing-highlight': isHorseRacing(horse.id) }"
      >
        <div
          class="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 shadow-lg"
          :style="{ backgroundColor: horse.color }"
        >
          <span class="text-2xl">🐴</span>
        </div>

        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm text-white mb-1">
            {{ horse.name }}
          </div>
          <div class="flex items-center gap-1.5 text-xs">
            <span class="text-white/60">Condition:</span>
            <span
              class="bg-primary/30 text-blue-400 px-2 py-0.5 rounded font-semibold"
            >
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
      if (!this.currentRound || !this.$store.state.isRaceStarted) return false; // round henüz başlamadıysa ya da start basılmadıysa
      return this.currentRound.horses.some((h) => h.id === horseId);
    },
  },
};
</script>

<style scoped>
.horses-container::-webkit-scrollbar {
  width: 6px;
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
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.horse-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(4px);
}

.racing-highlight {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.2),
    0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
