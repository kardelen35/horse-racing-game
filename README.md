# horse-racing-game

## Project setup
```
npm install
```

### Compiles and hot-reloads# 🏇 Horse Racing Championship

An interactive horse racing game built with Vue.js, featuring real-time animations, randomized race mechanics, and championship tracking.

<h3>✨ Live Version </h3>


### [You can see the live version here.](https://horse-racing-game-two.vercel.app/)

![Horse Racing Game](https://img.shields.io/badge/Vue.js-2.x-green) ![Vuex](https://img.shields.io/badge/Vuex-3.x-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.x-cyan)

## ✨ Features

- 🎲 **20 Unique Horses** - Randomly generated with unique colors and condition scores
- 🏁 **6 Racing Rounds** - Progressive distances from 1200m to 2200m
- ⚡ **Real-time Animation** - Smooth horse movements with galloping effects
- 🎰 **RNG-based Racing** - Unpredictable outcomes for exciting races
- 🏆 **Championship Results** - Complete standings with podium positions
- 🎨 **Modern Dark UI** - Sleek design with Tailwind CSS
- 📱 **Responsive** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Vue.js 2** - Progressive JavaScript framework
- **Vuex** - State management
- **Tailwind CSS** - Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/kardelen35/horse-racing-game.git

# Navigate to project directory
cd horse-racing-game

# Install dependencies
npm install

# Run development server
npm run serve

# Build for production
npm run build
```

The app will be available at `http://localhost:8080`

## 🎮 How to Play

1. **Generate Program** - Click to create a new racing schedule with 20 horses
2. **Start Race** - Begin the current round and watch horses compete
3. **View Progress** - Track race status through round indicator cards
4. **Championship Results** - After 6 rounds, view complete standings
5. **New Championship** - Click Generate to start a fresh tournament

## 📁 Project Structure
```
horse-racing-game/
├── src/
│   ├── components/
│   │   ├── RaceControls.vue    # Control panel with buttons
│   │   ├── HorseList.vue        # List of all horses
│   │   ├── RaceTrack.vue        # Animated race track
│   │   └── ResultsPanel.vue     # Results modal
│   ├── services/
│   │   └── horseService.js      # Horse generation logic
│   ├── store/
│   │   └── index.js             # Vuex store
│   ├── App.vue
│   └── main.js
├── public/
├── package.json
└── README.md
```

## 🎨 Features Breakdown

### Horse Generation
- 20 horses with random colors
- Condition scores (1-100) affecting performance
- RNG-based speed calculation for fair competition

### Race Mechanics
- 6 rounds with increasing distances
- 10 horses per round (randomly selected)
- Real-time position updates every 20ms
- Smooth CSS animations with galloping effects

### Championship System
- Automatic round progression
- Results tracking for all 6 rounds
- Podium positions with medals (🥇🥈🥉)
- Complete leaderboard for each race

## 📄 License

This project is licensed under the MIT License.



⭐ Star this repo if you found it helpful! for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint -- --fix
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
