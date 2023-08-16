class Room {
  constructor(roomID, users) {
    this.roomID = roomID;
    this.users = users;
    this.messages = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  addMessage(message) {
    this.messages.push(message);
  }
}
class User {
  constructor(userID, name, res) {
    this.userID = userID;
    this.res = res;
    this.name = name;
  }
}

class Message {
  constructor(userID, message, time) {
    this.userID = userID;
    this.message = message;
    this.time = time;
  }
}

export { Room, User, Message };
