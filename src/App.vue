<template>
  <div id="app">
    <div class="blocker" v-if="blocker"></div>
    <el-container>
      <el-header>
        <top-menu/>
      </el-header>
      <el-container>
        <el-container>
          <el-main>
            <render-canvas></render-canvas>
          </el-main>
        </el-container>
        <el-aside width="560px">
          <side-panel/>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import RenderCanvas from "./components/RenderCanvas";
  import Vue from 'vue'
  import {Editor} from "./editor/editor";
  import TopMenu from "./components/TopMenu";
  import SidePanel from "./components/SidePanel";

  export default {
    name: 'App',
    components: {SidePanel, TopMenu, RenderCanvas},
    data() {
      return {
        blocker: true
      }
    },
    created() {
      this.$eventBus.$once('canvasReady', async app => {
        const editor = Vue.prototype.$editor = new Editor(app, this);
        //await editor.loadDefaultBundle();
        this.blocker = false;

        // Opened from a game (its FX EDITOR button passes `?game=`): load that game's particle bundle.
        // Quietly when it has none; LOAD GAME BUNDLE stays there to try by hand.
        if (new URLSearchParams(window.location.search).has('game')) {
          editor.loadGameBundle()
            .then((file) => this.$notify({title: `${file} loaded from the game`}))
            .catch((e) => console.info('No game particle bundle loaded:', e.message));
        }
      });
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }

  .blocker {
    position: absolute;
    background-color: white;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .el-main {
    height: 100%;
    width: 100%;
    padding: 5px;
    margin: 0;
  }



</style>
