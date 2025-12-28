<template>
  <transition name="modal-fade">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
      @click="closeModal"
    >
      <div
        class="bg-gradient-to-br from-[#2d3436] to-[#1a1a1a] rounded-2xl max-w-[600px] w-[90vw] flex flex-col shadow-2xl border border-white/10 overflow-hidden"
        style="max-height: 80vh"
        @click.stop
      >
        <div
          class="flex justify-between items-center px-5 py-4 border-b border-white/10 bg-black/30 flex-shrink-0"
        >
          <h2 class="flex items-center gap-2 m-0 text-lg font-bold text-white">
            <span class="text-2xl">🏆</span>
            <span>Championship Results</span>
          </h2>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>

        <div
          v-if="raceResults.length === 0"
          class="text-center py-16 px-5 text-white/50 text-sm"
        >
          <p>No results yet. Complete all races to see results!</p>
        </div>

        <div
          v-else
          class="flex-1 px-5 py-4 results-scroll"
          style="overflow-y: auto; min-height: 0"
        >
          <div
            v-for="(result, index) in raceResults"
            :key="index"
            class="mb-5 pb-4 border-b border-white/10 last:border-b-0 last:mb-0 last:pb-0"
          >
            <div class="flex justify-between items-center mb-3">
              <h3 class="m-0 text-base font-bold text-[#fd79a8]">
                Round {{ result.round }}
              </h3>
              <span
                class="bg-[#fd79a8]/20 text-[#fd79a8] px-2.5 py-1 rounded-full text-[10px] font-semibold"
              >
                {{ result.distance }}m
              </span>
            </div>

            <div class="bg-black/30 p-2 rounded-lg flex flex-col gap-1.5">
              <div
                v-for="horse in result.results"
                :key="horse.horseId"
                class="result-item"
                :class="getPositionClass(horse.position)"
              >
                <div class="position-badge">
                  <span v-if="horse.position === 1">🥇</span>
                  <span v-else-if="horse.position === 2">🥈</span>
                  <span v-else-if="horse.position === 3">🥉</span>
                  <span v-else class="text-white/80 font-bold text-xs">{{
                    horse.position
                  }}</span>
                </div>

                <span
                  class="w-5 h-5 rounded-full border-2 border-white/30 flex-shrink-0"
                  :style="{ backgroundColor: horse.color }"
                ></span>

                <span class="flex-1 text-sm font-semibold text-white truncate">
                  {{ horse.horseName }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="px-5 py-4 border-t border-white/10 bg-black/30 flex justify-center flex-shrink-0"
        >
          <button
            class="bg-gradient-to-r from-[#fd79a8] to-[#e84393] text-white border-0 px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            style="box-shadow: 0 4px 15px rgba(253, 121, 168, 0.3)"
            @click="closeModal"
          >
            Close Results
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ResultsPanel",

  data() {
    return {
      showModal: false,
    };
  },

  computed: {
    ...mapGetters(["raceResults"]),

    allRacesCompleted() {
      return this.raceResults.length === 6;
    },
  },

  watch: {
    allRacesCompleted(newVal) {
      if (newVal && !this.$store.state.isRaceStarted) {
        setTimeout(() => {
          this.showModal = true;
        }, 500);
      }
    },
  },

  methods: {
    closeModal() {
      this.showModal = false;
    },

    openModal() {
      this.showModal = true;
    },

    getPositionClass(position) {
      const classes = {
        1: "position-gold",
        2: "position-silver",
        3: "position-bronze",
      };
      return classes[position] || "";
    },
  },
};
</script>

<style scoped>
.close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(253, 121, 168, 0.3);
  color: white;
  transform: rotate(90deg);
}

.results-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(253, 121, 168, 0.5) rgba(255, 255, 255, 0.05);
}

.results-scroll::-webkit-scrollbar {
  width: 6px;
}

.results-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.results-scroll::-webkit-scrollbar-thumb {
  background: rgba(253, 121, 168, 0.5);
  border-radius: 3px;
}

.results-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(253, 121, 168, 0.7);
}

/* Result Item - KOMPAKT */
.result-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.result-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(253, 121, 168, 0.3);
  transform: translateX(3px);
}

.position-badge {
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  flex-shrink: 0;
}

.position-gold {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
}

.position-silver {
  background: rgba(192, 192, 192, 0.1);
  border-color: rgba(192, 192, 192, 0.3);
}

.position-bronze {
  background: rgba(205, 127, 50, 0.1);
  border-color: rgba(205, 127, 50, 0.3);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active > div,
.modal-fade-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter > div,
.modal-fade-leave-to > div {
  transform: scale(0.9) translateY(20px);
}

@media (max-width: 768px) {
  .result-item {
    padding: 7px 9px;
    gap: 6px;
  }

  .position-badge {
    min-width: 24px;
    height: 24px;
    font-size: 14px;
  }
}
</style>
