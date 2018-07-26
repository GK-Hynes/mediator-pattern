const User = function(name) {
  this.name = name;
  this.chatroom = null;
};

User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
};

const Chatroom = function() {
  let users = {}; // List of users

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
      if (to) {
        // Single user message
        to.receive(message, from);
      } else {
        // Mass message
        for (key in users) {
          if (users[key] !== from) {
            users[key].receive(message, from);
          }
        }
      }
    }
  };
};

const joe = new User("Joe");
const macDara = new User("MacDara");
const rachel = new User("Rachel");

const chatroom = new Chatroom();

chatroom.register(joe);
chatroom.register(macDara);
chatroom.register(rachel);

joe.send("Warm up ideas?", rachel);
rachel.send("Sentence transformations.", joe);
macDara.send("Do either of ye have the chopper upper?");
