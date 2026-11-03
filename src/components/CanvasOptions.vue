<template>
  <div layout="row center-left" style="margin-bottom: 5px;">


    <!-- No container choice: pixi 8's ParticleContainer cannot hold revolt-fx's sprites. -->


    <el-color-picker size="mini" v-model="color" @change="onColor" class="spacing"/>
    <el-checkbox class="spacing" v-model="gizmos" @change="onGizmo">Gizmos</el-checkbox>
    <el-button size="mini" type="info" self="right" style="margin-right:10px" @click="onReset()">Clear</el-button>

  </div>
</template>

<script>
  import {EVENT_SEQUENCE_PRESET_SELECTED, EVENT_EMITTER_PRESET_SELECTED} from "../events";
  export default {
    name: "CanvasOptions",
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
