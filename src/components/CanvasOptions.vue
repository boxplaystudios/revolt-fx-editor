<template>
  <div layout="row center-left" style="margin-bottom: 5px;">


    <!-- No container choice: pixi 8's ParticleContainer cannot hold revolt-fx's sprites. -->


    <el-color-picker size="mini" v-model="color" @change="onColor" class="spacing"/>
    <el-checkbox class="spacing" v-model="gizmos" @change="onGizmo">Gizmos</el-checkbox>
    <el-checkbox class="spacing" :value="showGame" @change="$emit('update:showGame', $event)" :title="`Show the game (${gameUrl}) behind the effects, at its scale`">Game</el-checkbox>
    <el-checkbox v-if="showGame" class="spacing" :value="playGame" @change="$emit('update:playGame', $event)" title="Clicks go to the game instead of placing effects">Play game</el-checkbox>
    <el-button size="mini" type="info" self="right" style="margin-right:10px" @click="onReset()">Clear</el-button>

  </div>
</template>

<script>
  import {EVENT_SEQUENCE_PRESET_SELECTED, EVENT_EMITTER_PRESET_SELECTED} from "../events";
  export default {
    name: "CanvasOptions",
    props: ['showGame', 'playGame', 'gameUrl'],
    data() {
      return {
        color: '#333333',
        gizmos: true,
      }
    },

    methods: {
      onGizmo(value) {
        this.$editor.layers.gizmoLayer.visible = value;
      },
      onColor(color) {
        this.$editor.layers.setBackgroundColor(parseInt(color.replace('#', ''), 16));
      },
      onReset() {
        this.$fx.stopAllEffects();

        this.$eventBus.$emit(EVENT_EMITTER_PRESET_SELECTED, null);
        this.$eventBus.$emit(EVENT_SEQUENCE_PRESET_SELECTED, null);

      }

    }
  }
</script>

<style scoped>
  .spacing {
    margin-right: 15px;
  }
</style>
