<template>
  <div class="wh100" style="border-radius: 12px; position: relative;">
    <!-- The running game, behind the (then see-through) canvas, to try effects over it. -->
    <iframe v-if="showGame" ref="game" class="game" :src="gameUrl"></iframe>
    <canvas ref="canvas" :class="{'play-game': showGame && playGame}"></canvas>
    <canvas-options class="options" :show-game.sync="showGame" :play-game.sync="playGame" :game-url="gameUrl"/>
  </div>
</template>

<script>
  import * as PIXI from 'pixi.js';
  import CanvasOptions from "./CanvasOptions";

  const SHOW_GAME_KEY = 'rfx-editor.showGame';

  const gameParam = new URLSearchParams(window.location.search).get('game');

  // Opened from a game (its FX EDITOR button passes `?game=`): show that game. Otherwise as last time.
  const initialShowGame = () => {
    if (gameParam) return true;
    try {
      return localStorage.getItem(SHOW_GAME_KEY) === '1';
    } catch (e) {
      return false;
    }
  };

  export default {
    name: "RenderCanvas",
    components: {CanvasOptions},
    data() {
      return {
        app: null,
        // `?game=<url>` picks the game; the game dev server by default.
        gameUrl: gameParam || 'http://localhost:9999',
        showGame: initialShowGame(),
        // Clicks go to the game (spin, open its controls) instead of placing effects.
        playGame: false,
      }
    },
    watch: {
      showGame(on) {
        try {
          localStorage.setItem(SHOW_GAME_KEY, on ? '1' : '0');
        } catch (e) {
          // Storage blocked: the choice just isn't remembered.
        }
        if (this.$editor) this.$editor.setGameView(on);
        this.$nextTick(() => this.resize());
      }
    },
    methods: {
      resize() {
        const canvas = this.$refs.canvas;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        this.app.renderer.resize(w, h);
        // The iframe is exactly the canvas's size: the game fits itself to it, and the editor
        // applies the same rule to the effects (Editor.applyGameScale).
        if (this.$refs.game) {
          this.$refs.game.style.width = `${w}px`;
          this.$refs.game.style.height = `${h}px`;
        }
        if (this.$editor) this.$editor.resize(w, h);
      }
    },
    async mounted() {
      const canvas = this.$refs.canvas;
      const app = this.app = new PIXI.Application();
      await app.init({
        canvas,
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        // See-through: the background is drawn by the editor (Layers.backgroundSolid), and hidden
        // while the game shows behind.
        backgroundAlpha: 0,
        // As sharp as the game on high-density screens.
        resolution: window.devicePixelRatio || 1,
        roundPixels: true,
        preference: 'webgl',
      });

      window.addEventListener('resize', () => {
        this.resize();
      });

      setTimeout(() => {
        this.$eventBus.$emit('canvasReady', app);
        this.$editor.setGameView(this.showGame);
        this.resize();
      }, 200);
    }
  }
</script>

<style scoped>
  canvas {
    position: relative;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: transparent;
    padding: 0;
    margin: 0;
    border-radius: 5px;
  }

  canvas.play-game {
    pointer-events: none;
  }

  .game {
    position: absolute;
    left: 0;
    top: 0;
    border: 0;
    border-radius: 5px;
  }

  .options {
    position: absolute;
    left: 5px;
    bottom: 5px;
    /* Readable over the game, too. */
    padding: 4px 0 4px 6px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.85);
  }
</style>
