<template>
  <div
    id="messages-panel"
    class="panel dx-widget"
    :class="{ pin: false, open: messagesPanel.data.opened }"
    @mouseleave="closePanel()"
  >
    <div class="data-wrapper">
          <div class="data-part" v-if="messagesHistory.data.length>1">
            <dx-toolbar class="panel-toolbar">
              <dx-item
                location="after"
                widget="dxButton"
                :options="{ text:'Clear all', onClick: () => deleteAllMessages() }"
              />
            </dx-toolbar>
          </div> 

          <dx-scroll-view class="panel-scroll">
            <div>
              <div class="nomessagesText" v-if="messagesHistory.data.length==0">
                  No messages
              </div>
            </div>

            <div>
              <div v-for="(item, index) in messagesHistory.data">
                  <div :class="item.type" class="customToast">
                    <div class="messageDate">{{formatDate(item.date)}}</div>
                    <br>
                    <div>{{ item.msg }}</div>
                    <dx-button
                      icon="close"
                      class="messageButton"
                      styling-mode="outlined"
                      @click="deleteMessage(index)"
                    />
                  </div>
              </div>
            </div>
          </dx-scroll-view>
  
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-unresolved
import { DxButton } from 'devextreme-vue/button';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { messagesPanel, messagesHistory } from "@/main";
import { formatDate }  from '@/utils/formatters';

function deleteMessage(index:number) {
  messagesHistory.data.splice(index,1)
}
function deleteAllMessages() {
  messagesHistory.data = []
  closePanel()
}
function closePanel() {
  messagesPanel.data.opened = false
}


</script>
<style lang="css">
  .messageButton i {
    color: white !important;
  }
</style>
<style lang="scss">
#messages-panel {
  --contact-side-panel-toolbar-top: 58px;
  --contact-side-panel-width: 250px;
}

.screen-x-small #messages-panel {
  --contact-side-panel-width: 100vw;
}
</style>
<style scoped lang="scss">
@use "@/variables" as *;

.panel {
  position: fixed;
  right: calc(-1 * var(--contact-side-panel-width));
  top: var(--contact-side-panel-toolbar-top);
  bottom: 0;
  background: $base-bg;
  transition: right 400ms;

  .customToast {
    color: rgba(255, 255, 255, 0.87);
    font-size: 13px;
    font-weight: 400;
    padding: 0 12px;
    border-radius: 2px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    min-height: 36px;
    align-items: center;
    margin: 5px;
    position: relative;
  }

  .customToast.error {
    background: #f44336;
  }
  .customToast.success {
    background: #8bc34a;
  }
  .customToast.info {
    background: rgba(0, 0, 0, 0.87);
  }
  

  .nomessagesText {
    position: absolute;
    right: 0px;
    top:0px;
    bottom: 0px;
    left: 0px;
    margin: auto;
    width: fit-content;
    height: fit-content;
  }
  .messageDate {
    font-size: 10px;
    position: absolute;
    left: 5px;
    top: 5px;
  }

  .messageButton {
    position: absolute;
    width: 15px;
    height: 15px;
    right: 10px;
    top: 5px;
    bottom: 0px;
    border: none;
    min-width: initial;
  }
  .embedded.dx-viewport & {
    top: 0;
  }

  .panel-toolbar {
    :deep(.dx-toolbar-items-container) {
      height: $toolbar-items-container-height;
    }
  }

  &.open {
    right: 0;
    box-shadow: 0 0 16px $base-border-color;
  }

  &.pin {
    position: absolute;
    transition: none;
    box-shadow: none;
    border-left: 1px solid $base-border-color;

    &.open {
      top: 0;
      position: relative;
    }
  }

  .data-wrapper {
    padding-bottom: 16px;
    height: 100%;
    width: var(--contact-side-panel-width);

    .data-part {
      padding: 0 16px;

      &.border {
        border-bottom: 1px solid $base-border-color;
      }

      &-toolbar {
        padding: 10px 16px;
        margin-bottom: $toolbar-margin-bottom;

        .dx-button {
          min-width: 90px;
        }
      }
    }
  }
}
</style>
