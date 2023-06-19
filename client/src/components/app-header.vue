<template>
  <header>
    <dx-toolbar class="header-toolbar">
      <dx-item
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <div class="header-icon"><i class="dx-icon dx-icon-isnotblank"></i></div>
      </dx-item>
      <dx-item
        v-if="title"
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <div>{{ title }}</div>
      </dx-item>
      <dx-item location="after">
        <div class="messages">
          <dx-button
           icon="bell"
           @click="onBellLcick"
            />
          <div class="dx-badge" v-if="messagesHistory.data.length>0">
            {{messagesHistory.data.length}}
          </div>
        </div>
      </dx-item>
      <dx-item
        :visible="user.data.logged==true"
        location="after"
        locate-in-menu="auto"
        menu-item-template="menuUserItem"
      >
        <template #default>
          <div>
            <dx-button
              v-if="user"
              class="user-button authorization"
              :width="150"
              :height="38"
              styling-mode="text"
            >
              <user-panel
                :user="user"
                :menu-items="userMenuItems"
                menu-mode="context"
              />
            </dx-button>
          </div>
        </template>
      </dx-item>

      <template #menuUserItem>
        <user-panel
          :user="user"
          :menu-items="userMenuItems"
          menu-mode="list"
        />
      </template>
    </dx-toolbar>
  </header>
  
</template>

<script setup lang="ts">
import { DxButton } from 'devextreme-vue/button';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { user, messagesPanel, messagesHistory } from "@/main";
import UserPanel from './user-panel.vue';
import { DxPopup, DxToolbarItem as DxPopupItem } from 'devextreme-vue/popup';


defineProps<{
    title: string,
}>();

function onBellLcick() {
  messagesPanel.data.opened = !messagesPanel.data.opened;
}

function onLogoutClick() {
  user.data = {logged:false}
  localStorage.removeItem('userEmail')
  messagesHistory.data = []
}

const userMenuItems = [{
  text: 'Profile',
  icon: 'user',
  visible: false,
},
{
  text: 'Logout',
  icon: 'runner',
  onClick: onLogoutClick,
}];
</script>
<style scoped lang="scss">
@use "../variables" as *;



header {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 0 4px rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  background-color: $base-bg;
  position: fixed;
  width: 100%;

  :deep(.header-title) {
    color: $accent-color;
  }

  .header-icon {
    padding-left: 10px;
  }

  .header-toolbar {
    padding-right: $content-padding;

    :deep(.dx-toolbar-items-container) {
      height: $toolbar-items-container-height;
    }

    .user-button.authorization {
      margin-left: 5px;

      :deep(.dx-button-content) {
        padding: 0;
        height: 100%;
      }
    }

    .messages {
      padding-left: 5px;
      position: relative;

      .dx-badge {
        display: block;
        position: absolute;
        background-color: red;
        color: white;
        right: -10%;
        top: -10%;
        font-size: 12px;
        padding: 0 4px;
      }
    }

    :deep(.dx-toolbar-item.menu-button) {
      width: $side-panel-min-width;
      text-align: center;
      padding: 0;

      .dx-icon {
        color: $accent-color;
      }
    }
  }
}
</style>
