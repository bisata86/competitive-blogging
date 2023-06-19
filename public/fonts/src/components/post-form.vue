<template>
    <dx-validation-group>
      <div
        class="messages"
        id="post-form"
      >
          <div class="input-content">
            <dx-text-box
              label="Subject"
              styling-mode="outlined"
              :value="postPanel.data.title"
              value-change-event="keyup"
              v-model="postPanel.data.title"
            >
              <dx-validator>
                <dx-required-rule />
              </dx-validator>
            </dx-text-box>
            <dx-text-area
              label="Message"
              styling-mode="outlined"
              :value="postPanel.data.body"
              :height="150"
              value-change-event="keyup"
              v-model="postPanel.data.body"
            >
              <dx-validator>
                <dx-required-rule />
              </dx-validator>
            </dx-text-area>
  
            <dx-toolbar>
              <dx-item
                widget="dxButton"
                location="after"
                :options="{
                  text: 'Send',
                  stylingMode: 'outlined',
                  type: 'default',
                  onClick: send,
                }"
              />
            </dx-toolbar>
          </div>
      </div>
    </dx-validation-group>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { DxTextArea } from 'devextreme-vue/text-area';
  import { DxTextBox } from 'devextreme-vue/text-box';
  import { DxButton } from 'devextreme-vue/button';
  import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
  import { DxValidationGroup } from 'devextreme-vue/validation-group';
  import DxValidator, { DxRequiredRule } from 'devextreme-vue/validator';
  import { socket, user, postPanel } from "@/main";


  function send(e:any) {
    if (!e.validationGroup.validate().isValid) {
      return;
    }
    socket.emit('post',{user:user.data,msg:postPanel.data})   
    e.validationGroup.reset();
  }
  </script>
  
  <style scoped lang="scss">
  @use "@/variables" as *;
  
  @include messages-content();
  
  .input-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .input-content {
    padding: 0px;
  }
  
  .message-container {
    display: flex;
  
    &:nth-child(odd) {
      flex-direction: row-reverse;
    }
  
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      flex-shrink: 0;
      margin: 2px 5px;
      background: $base-accent;
      font-size: 12px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $base-bg;
    }
  
    .message {
      background-color: $base-bg;
      padding: 10px;
      margin-bottom: 10px;
  
      .message-title {
        @include message-title();
  
        .subject {
          color: $base-text-color;
          font-weight: 700;
        }
      }
  
      .message-text {
        @include message-text();
      }
    }
  }
  </style>
  