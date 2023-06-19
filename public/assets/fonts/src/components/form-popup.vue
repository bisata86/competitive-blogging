<template>
    <dx-popup
      ref="popup"
      :title="props.title"
      :visible="isVisible"
      :full-screen="screenInfo.isXSmall"
      width="auto"
      min-width="300"
      height="auto"
      @option-changed="() => popup?.instance?.repaint()"
      :showCloseButton="true"
      :onHiding="cancel"
    >
      <dx-validation-group ref="validationGroup">
        <postForm  />
      </dx-validation-group>
    </dx-popup>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import postForm from '@/components/post-form.vue';
  import { DxPopup, DxToolbarItem as DxPopupItem } from 'devextreme-vue/popup';
  import { screenInfo } from '@/utils/media-query';
  import { DxValidationGroup } from 'devextreme-vue/validation-group';
  
  const props = withDefaults(
    defineProps<{
      title: string,
      isVisible: boolean,
  }>(),
    {
      isVisible: false,
    },
  );
  const validationGroup = ref<InstanceType<typeof DxValidationGroup>>();
  
  const emit = defineEmits(['save', 'update:isVisible']);
  
  const isVisible = ref(props.isVisible);
  const popup = ref<InstanceType<typeof DxPopup>>();
  
  watch(
    () => props.isVisible,
    (newValue) => {
      isVisible.value = newValue;
    },
  );
  
  const cancel = () => {
    isVisible.value = false;
    validationGroup.value?.instance.reset();
    emit('update:isVisible', false);
  };
  
  const cancelOptions = {
    text: 'Cancel',
    stylingMode: 'text',
    type: 'default',
    onClick: cancel,
  };
  </script>
  