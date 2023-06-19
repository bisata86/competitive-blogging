
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "*"
  }});

app.use(express.static(__dirname + '/', {
    maxage: process.env.NODE_ENV == "production" ? '0d' : '0d'
})) 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
var users = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  }
]

var posts = []

for (let index = 0; index < 100; index++) {
  posts.push(
    {
      "userId": Math.floor(Math.random() * (10 - 1 + 1) + 1),
      "id": index,
      "date":new Date(),
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  )
}


for (let index = 0; index < posts.length; index++) {
  const element = posts[index];
  element.userId = Math.floor(Math.random() * (10 - 1 + 1) + 1)
  
}

io.on('connection', (socket) => {
  socket.on('getChart', function(data){
      socket.emit('chart', getChart())
  });
  socket.on("disconnect", () => {
      
  });
  socket.on("login", (data) => {
      getChart()
      var t = users.find(user => user.email == data.email)
      if(t) {
        socket.emit('message',{msg:"Logged in",type:'success'})
        socket.emit('user',t)
      }
      else
      socket.emit('message',{msg:'Email not valid',type:'error'})
  });
  socket.on("post", (data) => {
    if(!data.msg || !data.msg.title || !data.msg.body) {
      var msg = "";
      if(!data.msg.title) msg += "Post title required"
      else if(!data.msg.bady) msg += "Post body required"
      socket.emit('message',{msg:msg,type:'error'})
    } else {

      
      var t = users.find(user => user.id == data.user.id)
      if(t) {
        data.msg.userId = t.id;
        data.msg.date = new Date();
        posts.push(data.msg);
      }    
      io.emit('chart', getChart())
      socket.emit('user',t)
      socket.emit('postSuccess')
      socket.broadcast.emit('message',{msg:t.name+" posted something",type:'success',store:'info'})
      socket.emit('message',{msg:"Posts published succesfully",type:'success',store:'info'})
    }
  });
  socket.on("reloadUser", (data) => {
    getChart();
    var t = users.find(user => user.id == data.user.id)
    if(t) {
      socket.emit('user',t)
    }
  });
});




function getChart(){
  const chart = [];
  for (var i = 0; i < users.length; i++) {
    users[i].totalcount = posts.length
  }
  for (var i = 0; i < posts.length; i++) {
    var u = chart.find(user => user.id == posts[i].userId)
    var us = users.find(user => user.id == posts[i].userId)
    us.lastPost = posts[i]
    if(u) {
      u.count++
      us.count++
    } else {
      us.count = 1
      chart.push({count:1,id:us.id,name:us.name,email:us.email})
    }
  }
  chart.sort((a,b) => b.count - a.count);
  for (let index = 0; index < chart.length; index++) {
    const element = chart[index];
    element.position = index+1;
    var us = users.find(user => user.id == element.id)
    us.position = element.position
  
  }
  for (let index = 0; index < chart.length; index++) {
    const element = chart[index];
    var us = users.find(user => user.id == element.id)
    delete us.closestdown
    delete us.closestup
    if(index > 0)
    us.closestup =  {name:chart[index-1].email,toReach: (Math.abs(chart[index-1].count-chart[index].count))}
    if(index < chart.length-1)
    us.closestdown = {name:chart[index+1].email,toReach:(Math.abs(chart[index+1].count-chart[index].count))}
  }
  return chart;
}


server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});