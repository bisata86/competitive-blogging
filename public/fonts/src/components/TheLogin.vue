<script setup lang="ts">
import { socket } from "@/main";
import DxForm, {
  DxItem,
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
} from 'devextreme-vue/form';
defineProps<{
  data:{}
}>()
</script>
<script lang="ts">
export default {
    methods: {
      onSubmit() {
        socket.emit('login',this.data)
      }
    }, 
  }
  </script>

<template>
  <div class="dx-widget dx-card login-form-container">
  <form
    class="login-form"
    @submit.prevent="onSubmit"
  >
    <div class="login-label">Sign In</div>
    <dx-form
      :form-data="data"
    >
      
      <dx-item
        data-field="email"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Email', mode: 'email' }"
      >
        <dx-required-rule message="Email is required" />
        <dx-email-rule message="Email is invalid" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="signInTemplate"
          :use-submit-behavior="true"
        />
      </dx-button-item>

      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <span>Sign In</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</div>
</template>


<style scoped lang="scss">
@use "@/variables" as *;

.login-form-container {
  max-width: 400px;
}

.login-form {
    padding:10px;
  .login-label {
    color: var(--base-text-color);
    text-align: center;
    line-height: 24px;
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;;
  }

}
</style>