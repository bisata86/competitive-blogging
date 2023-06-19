<script setup lang="ts">
import {  user } from "@/main";
import DxForm, {
  DxItem,
  DxLabel,
} from 'devextreme-vue/form';
</script>

<template>
  <form
    class="user-form"
  >
    <dx-form
      :form-data="user.data"
      :disabled="true"
      labelMode="static"
      colCount="2"
    >
    
      <dx-item
        data-field="name"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled'}"
      >
      </dx-item>
      <dx-item
        data-field="email"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled'}"
      >
      </dx-item>
      <dx-item
        data-field="username"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled',}"
      >
      </dx-item>
      <dx-item
        data-field="id"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled'}"
      >
      </dx-item>

    </dx-form>
  </form>
</template>

<style>
    .user-form .dx-texteditor {
        background-color: white !important;
    }

</style>
