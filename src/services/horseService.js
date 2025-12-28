const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];

//Each horse should be represented with a unique color.
function getRandomColor() {
  return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
;
}

//Each horse's condition score should range from 1 to 100.
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//For each round, select 10 random horses from the available 20.
export function generateHorses() {
  const horses = [];

  for (let i = 0; i < 20; i++) {
    horses.push({
      id: i + 1,
      name: `Horse ${i + 1}`,
      color: getRandomColor(),
      conditionScore: getRandomNumber(1, 100),
    });
  }

  return horses;
}

export function selectRandomHorses(allHorses, count = 10) {
  const availableHorses = [...allHorses];
  const selected = [];

  for (let i = 0; i < count && availableHorses.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableHorses.length);
    selected.push(availableHorses.splice(randomIndex, 1)[0]);
  }
  return selected;
}

//Each race should consist of 6 rounds.
export function generateSchedule(horses) {
  const rounds = [];

  for (let i = 0; i < 6; i++) {
    rounds.push({
      roundNumber: i + 1,
      distance: ROUND_DISTANCES[i],
      horses: selectRandomHorses(horses, 10),
      winner: null,
      results: [],
    });
  }
  return rounds;
}
