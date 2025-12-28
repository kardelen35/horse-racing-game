<template>
  <div id="app">
    <RaceControls />
    <div class="main-container">
      <HorseList class="sidebar" />
      <RaceTrack class="race-area" />
    </div>
    <ResultsPanel />
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
  overflow: hidden; 
}

#app {
  padding: 15px; 
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-container {
  display: grid;
  grid-template-columns: 240px 1fr; 
  gap: 15px; 
  margin-top: 15px; 
  width: 100%;
  flex: 1;
  min-height: 0; 
}

.sidebar {
  background: rgba(30, 30, 46, 0.9);
  border-radius: 12px;
  padding: 15px; 
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden; 
  display: flex;
  flex-direction: column;
}

.race-area {
  background: transparent;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  border: none;
  overflow: hidden; 
  min-height: 0;
}

@media (max-width: 1200px) {
  .main-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  #app {
    padding: 10px;
  }

  .main-container {
    gap: 10px;
    margin-top: 10px;
  }
}
</style>