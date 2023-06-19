<template>
  <div :class="cardClass">
    <card-analytics
      @flash="shake()"
      class="tile"
      :title="props.title"
    >
      <div class="total">
        {{ props.total }} 
      </div>
    </card-analytics>
  </div>
  </template>
  
  <script setup lang="ts">
  import CardAnalytics from '@/components/card-analytics.vue';
  
  const props = withDefaults(
    defineProps<{
      title?:  string,
      total?: number | string | null
    }>(),
    {
      title: '',
      total: null
    },
  );
  

  </script>
    <script  lang="ts">
    export default {
      data: function() {
        return {
            cardClass: ''
          }
      },
      methods:{
        shake() {
          this.cardClass = 'shake'
          setTimeout(() => {
            this.cardClass = ''
          }, 300);
        }
      }
    }
  </script>
  <style>

  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
  <style scoped lang="scss">
  @use "@/variables.scss" as *;
  .tile.card-wrapper {
    :deep(.card) {
      background-color: $side-panel-background;
      border: none;
      height: 120px;
  
      .content {
        .total {
          display: inline-block;
          font-size: 26px;
          font-weight: 700;
          color: $base-text-color;

        }
  
        .state {
          display: inline-block;
          font-size: 19px;
          font-weight: 400;
          color: $base-text-color;
          line-height: 24px;
  
          span {
            display: inline-block;
            vertical-align: text-bottom;
          }
  
          .dx-icon-spindown {
            font-size: 30px;
            color: #ff5722;
            display: inline-block;
          }
  
          .dx-icon-spinup {
            font-size: 30px;
            color: #2eb52c;
            display: inline-block;
          }
        }
      }
    }
  }
  </style>
  