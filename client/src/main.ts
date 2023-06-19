
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { reactive } from "vue";
import { io } from "socket.io-client";
import 'devextreme/scss/bundles/dx.material.blue.light.compact.scss';
import 'devexpress-gantt/dist/dx-gantt.css';
import './styles.scss';
import notify from 'devextreme/ui/notify';
import { formatCardinal }  from '@/utils/formatters';

interface user {
  data: any,
  logged:boolean
}

interface message {
  msg:string,
  type:string,
  store:boolean
}

export const state = reactive({
  connected: false
});

export const chart:any = reactive({
  data:[]
});

export const messagesHistory:any = reactive({
  data:[]
});

export const badge = reactive({
  counter:messagesHistory.data.length
});

export const user:any = reactive({
  data:{
    logged:false
  }
});

export const postPanel = reactive({
  data:{
    opened:false,
    title:"",
    body:""
  }
});

export const messagesPanel = reactive({
  data:{
    opened:false
  }
});

var URL = "https://blogging-cksq.onrender.com";
if(window.location.href.indexOf('local')!=-1)
   URL = "http://localhost:3000";


export const socket = io(URL);

socket.on("connect", () => {
  socket.emit('getChart')
  var t = localStorage.getItem('userEmail');
  if(t) {
    socket.emit('login',{email:t})
  } else {
    state.connected = true
  }
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("postSuccess", (...args) => {
  postPanel.data.opened = false;
  postPanel.data.title = '';
  postPanel.data.body = '';
});

socket.on("user", (args) => {
  localStorage.setItem('userEmail',args.email)
  args.logged = true;
  user.data = args;
  state.connected = true
});

socket.on("message", (args) => {
  customNotify(args.msg,args.type,args.store)
});


socket.on("chart", (args) => {

  var temp = JSON.parse(JSON.stringify(chart.data))
  if(user.data.logged) {
    var prev = temp.find(( el:any ) => el.id === user.data.id);
    var curr = args.find(( el:any ) => el.id === user.data.id);
    if(curr.position<=3) {
      if(prev.position>curr.position) {
        customNotify('You gained '+Math.abs(prev.position-curr.position)+' positions','success',true)
        customNotify('You are now in '+formatCardinal(curr.position)+' position','success',true)

      }
      else if(prev.position<curr.position) {
        user.data.state = 'negative';
        customNotify('You lost '+Math.abs(prev.position-curr.position)+' positions','error',true)
        customNotify('You are now in '+formatCardinal(curr.position)+' position','error',true)
      }
    }
    socket.emit('reloadUser',{user:user.data})
  }
  if(chart.data.length) {
    for (let index = 0; index < chart.data.length; index++) {
      const element = chart.data[index];
      var curr = args.find(( el:any ) => el.id === element.id);
      element.position = curr.position
      element.count = curr.count
    }
  }
  else {
    chart.data = args;
  }
});

export function customNotify(a:string,b:string,store:boolean) {
  notify({
    message: a,
    height: 40,
    width: 'auto',
    type: b,
    displayTime: 2500,
    animation: {
      show: {
        type: 'fade', duration: 400, from: 0, to: 1,
      },
      hide: { type: 'fade', duration: 40, to: 0 },
    },
  },
  { position:'top center', direction:'down-push' });
  if(store)
    messagesHistory.data.unshift({msg:a,type:b,date:new Date()})
}

const app = createApp(App)

app.use(createPinia())


app.mount('#app')
