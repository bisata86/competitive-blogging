<template>
      Your last post
      <div
        class="messages"
        id="card-messages"
      >
          <div class="messages-content">
              <div class="message-list">
                <div
                  class="message-container"
                  v-for="data in items"
                >
                  <div class="avatar">
                    <i class="dx-icon dx-icon-user"></i>
                    
                  </div>
                  <div class="message dx-card">
                    <div class="message-title">
                      <div>
                        <div class="subject">
                          {{ data.title }}
                        </div>
                        <div>{{ formatDate(new Date(data.date)) }}</div>
                      </div>
                     
                    </div>
                    <div class="message-text">
                      {{ data.body }}
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { DxTextArea } from 'devextreme-vue/text-area';
  import { DxTextBox } from 'devextreme-vue/text-box';
  import { DxButton } from 'devextreme-vue/button';
  import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
  import { DxFileUploader } from 'devextreme-vue/file-uploader';
  import { DxScrollView } from 'devextreme-vue/scroll-view';
  import { DxValidationGroup } from 'devextreme-vue/validation-group';
  import DxValidator, { DxRequiredRule } from 'devextreme-vue/validator';
  

  
  import { formatDate } from '@/utils/formatters';

  
  import type { Message } from '@/types/messages';
  
  const props = withDefaults(defineProps<{
    messages: Message[],
  }>(), {
    messages: () => [],
  });
  
  const items = ref<Message[]>(props.messages);
  const messageText = ref<string>('');
  const messageTitle = ref<string>('');
  
  watch(
    () => props.messages,
    (newValue) => {
      items.value = newValue;
    },
  );
  
  </script>
  
  <style scoped lang="scss">
  @use "@/variables" as *;
  
  @include messages-content();
  

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
      width: 100%;
  
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
  