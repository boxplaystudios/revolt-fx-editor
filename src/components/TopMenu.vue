<template>
  <div style="height: 100%">
    <div layout="row center-left" style="height:100%">
      <img class="logo" src="/static/rfx-logo.png"/>
      <div style="width:120px">
        <div class="title">RevoltFX</div>
      </div>
      <div>
        <el-dropdown trigger="click" @command="handleMenuItem">
            <span class="el-dropdown-link" style="cursor: pointer">
              Bundle<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="new_bundle">New...</el-dropdown-item>
            <el-dropdown-item command="load_bundle">Load...</el-dropdown-item>
            <el-dropdown-item command="save_bundle">Save...</el-dropdown-item>
            <el-dropdown-item command="show_json" divided>Show JSON...</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        -
        <span style="cursor: pointer" @click="handleMenuItem('copy_json')">
           COPY JSON
        </span>
        -
        <span style="cursor: pointer" @click="handleMenuItem('post_json')">
           <b>SAVE JSON</b>
        </span>
      </div>

      <div self="right" style="margin-right: 10px">
        <div>
          <a href="https://github.com/bma73/revolt-fx-editor" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>

      </div>
      <div class="addthis_inline_share_toolbox"></div>
    </div>

    <new-bundle ref="newBundlePanel"/>
    <load-bundle ref="loadBundlePanel"/>
    <save-bundle ref="saveBundlePanel"/>
    <show-bundle-json ref="showBundleJsonPanel"/>

  </div>
</template>

<script>
  import NewBundle from "./NewBundle";
  import SaveBundle from "./SaveBundle";
  import LoadBundle from "./LoadBundle";
  import ShowBundleJson from "./ShowBundleJson";

  export default {
    name: "TopMenu",
    components: {ShowBundleJson, LoadBundle, SaveBundle, NewBundle},
    data() {
      return {}
    },
    methods: {
      handleMenuItem(item) {
        switch (item) {
          case 'new_bundle':
            this.$refs.newBundlePanel.show();
            break;

          case 'load_bundle':
            this.$refs.loadBundlePanel.show();
            break;

          case 'save_bundle':
            this.$refs.saveBundlePanel.show();
            break;

          case 'show_json':
            this.$refs.showBundleJsonPanel.show();
            break;

          case 'copy_json':
            this.$refs.showBundleJsonPanel.copy();
            break;

          case 'post_json':
            this.$refs.showBundleJsonPanel.post();
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 1.5rem;
  }

  .logo {
    height: 40px;
    margin-right: 10px;
  }

  .el-button {
    /*font-weight: 100;*/
  }

  .el-row {
    height: 60px;
  }
</style>
