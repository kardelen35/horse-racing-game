<template>
  <div id="app">
    <RaceControls />
    <div class="main-container">
      <HorseList class="sidebar left-sidebar" />
      <RaceTrack class="race-area" />
    </div>
          <ResultsPanel class="sidebar right-sidebar" />

  </div>
</template>

<script>
import RaceControls from "./components/RaceControls.vue";
import HorseList from "./components/HorseList.vue";
import RaceTrack from "./components/RaceTrack.vue";
import ResultsPanel from "./components/ResultsPanel.vue";

export default {
  name: "App",
  components: {
    RaceControls,
    HorseList,
    RaceTrack,
    ResultsPanel,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%);
  color: #fff;
  min-height: 100vh;
}

#app {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.main-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  margin-top: 20px;
}

.sidebar {
  background: rgba(30, 30, 46, 0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.race-area {
  background: rgba(20, 20, 32, 0.95);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@media (max-width: 1200px) {
  .main-container {
    grid-template-columns: 1fr;
  }
}
</style>
