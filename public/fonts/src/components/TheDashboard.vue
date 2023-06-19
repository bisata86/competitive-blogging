<script setup lang="ts">
import { socket, user, postPanel, customNotify , messagesHistory } from "@/main";
import FormPopup from '@/components/form-popup.vue';
import postList from '@/components/post-list.vue';
import UserForm from '@/components/user-form.vue';
import { DxButton } from 'devextreme-vue/button';
import AnalyticTile from '@/components/analytic-tile.vue';
import {
  DxToolbar,
  DxItem,
} from 'devextreme-vue/toolbar';
</script>
<script lang="ts">
export default {
    methods: {
      postPopup() {
        postPanel.data.opened = true;
        postPanel.data.title = ''
        postPanel.data.body = ''
      },
      post() {
        socket.emit('post',{user:user.data,msg:postPanel.data})   
      },
      logout() {
        console.log(user.data)
        user.data = {logged:false}
        localStorage.removeItem('userEmail')
        messagesHistory.data = []
      }
    }
  }
  </script>

<template>
  <div class="dx-widget">
    <dx-toolbar>
      <dx-item
        location="before"
        >
        <div class="dashTitle">
          User Dashboard
        </div>
      </dx-item>
      <dx-item
      location="after"
      locate-in-menu="auto"
      css-class="add-card"
    >
      <div>
        <dx-button
          icon="plus"
          text="Add Post"
          type="default"
          styling-mode="contained"
          @click="postPopup"
        />
      </div>
      </dx-item>
      <dx-item
              location="after"
              locate-in-menu="auto"
              css-class="add-card"
      >
        <div>
          <dx-button
            icon="runner"
            text="Logout"
            type="default"
            styling-mode="contained"
            @click="logout"
          />
        </div>
      </dx-item>
    </dx-toolbar>
    <div class="tiles" >
        <analytic-tile
          title="Ranking"
          :total="user.data.position"
        />
        <analytic-tile
          title="Your posts"
          :total="user.data.count"
        />
        <analytic-tile
          title="Total Posts"
          :total="user.data.totalcount"
        />
    </div>
    <div class="tips">
      <div v-if="user.data.closestup">
        <i class="dx-icon-spinup"></i>
        <span v-if="user.data.closestup.toReach>0">
        Write {{ (user.data.closestup.toReach) }} more post<span v-if="user.data.closestup.toReach!=1">s</span> to reach {{ user.data.closestup.name }}
        </span>
        <span v-if="user.data.closestup.toReach==0">
          You have the same number of posts as {{ user.data.closestup.name }}
        </span>
      </div>
      <div v-if="!user.data.closestup">
        You are the leader
      </div>
      <div v-if="user.data.closestdown">
        <i class="dx-icon-spindown"></i>
        <span v-if="user.data.closestdown.toReach>0">
          You are {{ user.data.closestdown.toReach }} post<span v-if="user.data.closestdown.toReach!=1">s</span> ahead of  {{ user.data.closestdown.name }}
        </span>
        <span v-if="user.data.closestdown.toReach==0">
          You have the same number of posts as {{ user.data.closestdown.name }}
        </span>
      </div>
      <div v-if="!user.data.closestdown">
        You are the worst
      </div>
    </div>
    <user-form></user-form>
    <postList :messages="[user.data.lastPost]" />
    <form-popup
      title="New Post"
      v-model:is-visible="postPanel.data.opened"
    >
    </form-popup>
  </div>
</template>

<style scoped lang="scss">
@use "@/variables" as *;
@include separator();

  .dx-icon-spindown {
    font-size: 24px;
    color: #ff5722;
    display: inline-block;
    vertical-align: middle;
  }

  .dx-icon-spinup {
    font-size: 24px;
    color: #2eb52c;
    display: inline-block;
    vertical-align: middle;
  }
  .dashTitle {
    font-size: 16px;
  }
  
  .cards, .tiles {
    display: grid;
    width: 100%;
    grid-gap: 20px;
    gap: 20px;
  }

  .tips > div{
    margin: 10px 0;
  }


  .tiles {
    margin: 20px 0;
    grid-template-columns: repeat(3, calc(33% - 15px));
  }


</style>