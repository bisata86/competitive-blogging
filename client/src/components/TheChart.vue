<script setup lang="ts">
import { user , chart } from "@/main";
import { DxButton } from 'devextreme-vue/button';
defineProps<{
  data:[]
}>()
</script>
<script lang="ts">
export default {
    data: function() {
      return {
        
      }
    },
    methods: {
      calcPosition1(i:any) {
        return  ((i.position)*40)+'px';
      },
      calcPosition(i:any) {
        return  ((i)*40)+'px';
      },
      calcFontSize(i:any) {
        if(i.position>3) return '12px'
        return (20-(i.position))+'px'
        if(i<4) return '19px'
        else return '14px'
      },
      checkUser(item:any) {
        return user.data.id==item.id
      },
      getPosition(item:any) {
        return item.position
      },
      getCount(item:any) {
        return item.count
      },
      getName(item:any) {
        return item.email
      }
    }
  }
  </script>
<template>
      

  <div class="dx-widget theChart">

      

      <div class="chartPos">
        <span class="posMarker">Pos</span>
        <span class="nameMarker">Name</span>
        <span class="postCountMarker">Posts</span>
      </div>
      <div 
        :style="{ top: calcPosition1(item), fontSize: calcFontSize(item) }"
        v-for="(item, index ) in data"
        class="chartPos" 
        :class="{ selected: checkUser(item) }">
        <span class="posMarker" v-html="getPosition(item)"></span>
        <span class="nameMarker"> 
          <span v-html="getName(item)"></span>
          <i v-if="checkUser(item)" class="dx-icon dx-icon-user">
          </i>
        </span>
        <span class="postCountMarker" v-html="getCount(item)"></span>
      </div>
      <div class="chartSeparator" :style="{ top: calcPosition(index+1), fontSize: 12 + 'px' }" v-for="(item, index ) in data"></div>

  </div>

</template>

<style scoped lang="scss">
  .theChart{
    position: relative;
    min-height: 440px;
  }
  .chartPos span  {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chartPos  {
    position: absolute;
    background-color: white;
    padding: 10px;
    width: 100%;
    height: 40px;
    transition-duration: 1s;
  }
  .posMarker {
    text-align: right;
    width: 30px;
    display: inline-block;
    text-align: center;
  }
  .nameMarker {
    width: calc(100% - 110px);
    text-indent: 15px;
    display: inline-block;
  }
  .nameMarker .dx-icon-user {
    font-size: 100%;
    vertical-align: middle;
  }
  .postCountMarker {
    width: 50px;
    display: inline-block;
    text-align: center;
  }
  .chartSeparator {
    position: absolute;
    height: .5px;
    background-color: #f2f2f2;
    width: 100%;
  }
  .chartPos.selected {
    background-color: #03a9f4;
    color: white;
  }
</style>