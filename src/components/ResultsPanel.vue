<template>
  <transition name="modal-fade">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[9999] p-5"
      @click="closeModal"
    >
      <div
        class="bg-gradient-to-br from-[#2d3436] to-[#1a1a1a] rounded-3xl max-w-[900px] w-[150vw] flex flex-col shadow-2xl border border-white/10 overflow-hidden"
        style="max-height: 85vh; width: 50vh"
        @click.stop
      >
        <div
          class="flex justify-between items-center px-7 py-6 border-b border-white/10 bg-black/30 flex-shrink-0"
        >
          <h2 class="flex items-center gap-3 m-0 text-2xl font-bold text-white">
            <span class="text-3xl">🏆</span>
            <span>Championship Results</span>
          </h2>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>

        <div
          v-if="raceResults.length === 0"
          class="text-center py-20 px-5 text-white/50 text-base"
        >
          <p>No results yet. Complete all races to see results!</p>
        </div>

        <div
          v-else
          class="flex-1 px-7 py-6 results-scroll"
          style="overflow-y: auto; min-height: 0"
        >
          <div
            v-for="(result, index) in raceResults"
            :key="index"
            class="mb-7 pb-6 border-b border-white/10 last:border-b-0 last:mb-0"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="m-0 text-lg font-bold text-[#fd79a8]">
                Round {{ result.round }}
              </h3>
              <span
                class="bg-[#fd79a8]/20 text-[#fd79a8] px-3.5 py-1.5 rounded-full text-xs font-semibold"
              >
                {{ result.distance }}m
              </span>
            </div>

            <div class="bg-black/30 p-3 rounded-xl flex flex-col gap-2">
              <div
                v-for="horse in result.results"
                :key="horse.horseId"
                class="result-item"
                :class="getPositionClass(horse.position)"
              >
                <!-- Position Medal -->
                <div class="position-badge">
                  <span v-if="horse.position === 1">🥇</span>
                  <span v-else-if="horse.position === 2">🥈</span>
                  <span v-else-if="horse.position === 3">🥉</span>
                  <span v-else class="text-white/80 font-bold text-sm">{{
                    horse.position
                  }}</span>
                </div>

                <span
                  class="w-6 h-6 rounded-full border-2 border-white/30 flex-shrink-0"
                  :style="{ backgroundColor: horse.color }"
                ></span>

                <span class="flex-1 text-[15px] font-semibold text-white">
                  {{ horse.horseName }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="px-7 py-5 border-t border-white/10 bg-black/30 flex justify-center flex-shrink-0"
        >
          <button
            class="bg-gradient-to-r from-[#fd79a8] to-[#e84393] text-white border-0 px-8 py-3 rounded-xl text-[15px] font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
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
    // useState
    return {
      showModal: false,
    };
  },

  computed: {
    // useMemo
    ...mapGetters(["raceResults"]),

    allRacesCompleted() {
      return this.raceResults.length === 6;
    },
  },

  watch: {
    // useEffect
    allRacesCompleted(newVal) {
      if (newVal && !this.$store.state.isRaceStarted) {
        setTimeout(() => {
          this.showModal = true;
        }, 500);
      }
    },
  },

  methods: {
    //functions
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
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
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
  width: 8px;
}

.results-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.results-scroll::-webkit-scrollbar-thumb {
  background: rgba(253, 121, 168, 0.5);
  border-radius: 4px;
}

.results-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(253, 121, 168, 0.7);
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.result-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(253, 121, 168, 0.3);
  transform: translateX(4px);
}

.position-badge {
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
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
    padding: 10px 12px;
  }
}
</style>
