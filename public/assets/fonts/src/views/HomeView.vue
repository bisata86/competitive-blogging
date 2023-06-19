<script setup lang="ts">

import { state, chart, socket, user, messagesHistory } from "@/main";
import TheChart from '../components/TheChart.vue';
import TheLogin from '../components/TheLogin.vue';
import TheDashboard from '../components/TheDashboard.vue';
import AppHeader from '@/components/app-header.vue';
import MessagesPanel from '@/components/messages-panel.vue';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
</script>

<template>
    <app-header
      class="layout-header"
      :user="user"
      title="Competitive blogging"
    />
    <div class="view-wrapper">
      <div class="panels">
      <div class="left">
        <theChart :data="chart.data"></theChart>
        
      </div>
      <div class="right">
        <div>
            <div v-if="!state.connected">
              <DxLoadPanel
                visible="true"
              />
            </div>
            <div v-if="state.connected">
              <theLogin v-if="!user.data.logged" :data="user.data"></theLogin>
              <theDashboard v-if="user.data.logged" :data="user.data"></theDashboard>
          </div>
        </div>
      </div>
    </div>
    </div>
    <MessagesPanel :data="messagesHistory.data"/>
</template>

<style scoped lang="scss">
@use "@/variables" as *;
@include separator();

$left-panel-width: 450px;
$right-panel-width: 310px;

@media only screen and (max-width: 875px) {
  :deep(.contact-name-toolbar-item) {
    min-width: calc(#{$left-panel-width} + #{$right-panel-width} - 145px);
  }
}

.dx-toolbar {
  margin-bottom: calc(#{$toolbar-margin-bottom} / 2);

  :deep(.dx-toolbar-label > div) {
    @include header();
  }
}

.view-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 60px 16px 0 16px;

  .panels {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;



    .left {
      flex: 1 $left-panel-width;
      margin-top: 8px;



    }

    .right {
      flex: 1 calc(100% - #{$left-panel-width} - 20px);
      margin-top: 8px;
      min-width: 340px;
    }
  }
  
}
  .cards, .tiles {
    display: grid;
    width: 100%;
    grid-gap: 20px;
    gap: 20px;
  }

  .tiles {
    margin: 20px 0;
    grid-template-columns: repeat(2, calc(50% - 15px));
  }

  .cards {
    grid-template-columns: repeat(2, calc(50% - 10px));

    .card-wrapper {
      flex: 1 50%;
    }
  }

</style>
