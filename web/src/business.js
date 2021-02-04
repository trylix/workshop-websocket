class Business {
  constructor({ eventBuilder, socketBuilder }) {
    this.eventBuilder = eventBuilder;
    this.socketBuilder = socketBuilder;

    this.socket = {};
  }

  _init() {
    this.socket = this.socketBuilder
      .setOnConnect(this.onConnectSocket())
      .setOnConnectError(this.onConnectErrorSocket())
      .setOnError(this.onErrorSocket())
      .setOnPing(this.onPingSocket())
      .setOnAuthenticated(this.onAuthenticatedSocket())
      .setOnGetRooms(this.onGetRoomsSocket())
      .setOnNewRoom(this.onNewRoomSocket())
      .setOnUpdateRoom(this.onUpdateRoomSocket())
      .setOnNewMessage(this.onNewMessageSocket())
      .setOnGetMessages(this.onGetMessagesSocket())
      .build();

    this.eventBuilder.setOnFormSubmit(this.onFormSubmitEvent()).build();
  }

  onRoomOpenEvent() {
    return (event) => {
      const roomId = event.currentTarget.id;

      document.getElementById("chat").dataset.room = roomId;

      this.socket.emit("join", {
        roomId,
      });
    };
  }

  onFormSubmitEvent() {
    return (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      event.target.reset();

      const formElements = ((self) => ({
        "chat-form": function () {
          const message = formData.get("message");

          const bubble = document.createElement("div");

          bubble.className = "bubble";
          bubble.innerHTML = `<div class="bubble-message right"><div class="bubble-content"><div class="bubble-message-body"><div class="bubble-message-text">${message}</div></div></div></div>`;

          document.getElementById("chat").appendChild(bubble);

          self.socket.emit("new_message", {
            room: document.getElementById("chat").dataset.room,
            owner: document.getElementById("room-list").dataset.user,
            content: message,
          });
        },
        "contact-search": function () {
          const key = formData.get("key");
          console.log(key);
        },
      }))(this);

      formElements[event.target.getAttribute("class")]();
    };
  }

  onConnectSocket() {
    return () => {
      this.socket.emit("get_rooms");
    };
  }

  onConnectErrorSocket() {
    return (error) => {
      console.log("new socket error on connection", error);
    };
  }

  onErrorSocket() {
    return (error) => {
      console.log("new socket error", error);
    };
  }

  onPingSocket() {
    return () => {
      console.log("ping");
    };
  }

  onAuthenticatedSocket() {
    return (userId) => {
      document.getElementById("room-list").dataset.user = userId;
    };
  }

  onGetRoomsSocket() {
    return (rooms) => {
      const list = document.getElementById("room-list");
      list.innerHtml = "";

      rooms.forEach((room) => {
        const contactElem = document.createElement("div");
        contactElem.id = room.id;
        contactElem.className = "contact";
        contactElem.innerHTML = `<span class=\"name\">ID da sala: ${
          room.id
        }</span><span class=\"time\">Ultima mensagem: ${new Date(
          room.last_message ? room.last_message : room.createdAt
        ).toLocaleDateString("pt-br", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}</span>`;

        contactElem.addEventListener("click", this.onRoomOpenEvent());

        list.appendChild(contactElem);
      });
    };
  }

  onNewRoomSocket() {
    return (room) => {
      const contactElem = document.createElement("div");
      contactElem.id = room.id;
      contactElem.className = "contact new";
      contactElem.innerHTML = `<span class=\"name\">ID da sala: ${
        room.id
      }</span><span class=\"time\">Ultima mensagem: ${new Date(
        room.last_message ? room.last_message : room.createdAt
      ).toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}</span>`;

      contactElem.addEventListener("click", this.onRoomOpenEvent());

      document.getElementById("room-list").prepend(contactElem);
    };
  }

  onUpdateRoomSocket() {
    return (room) => {
      const contactElem = document.getElementById(room._id);
      contactElem.id = room._id;
      contactElem.className = "contact new-message";
      contactElem.innerHTML = `<span class=\"name\">ID da sala: ${
        room._id
      }</span><span class=\"time\">Ultima mensagem: ${new Date(
        room.last_message ? room.last_message : room.createdAt
      ).toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}</span>`;
    };
  }

  onGetMessagesSocket() {
    return (messages) => {
      const chat = document.getElementById("chat");
      chat.innerHTML = "";

      messages.forEach((message) => {
        const userId = document.getElementById("room-list").dataset.user;

        const bubble = document.createElement("div");

        bubble.id = message.id;
        bubble.className = "bubble";
        bubble.innerHTML = `<div class="bubble-message ${
          message.owner._id === userId ? "right" : ""
        }"><div class="bubble-content"><div class="bubble-message-body"><div class="bubble-message-text">${
          message.content
        }</div></div></div></div>`;

        chat.appendChild(bubble);
      });
    };
  }

  onNewMessageSocket() {
    return (message) => {
      const userId = document.getElementById("room-list").dataset.user;

      const bubble = document.createElement("div");

      bubble.id = message.id;
      bubble.className = "bubble";
      bubble.innerHTML = `<div class="bubble-message ${
        message.owner === userId ? "right" : ""
      }"><div class="bubble-content"><div class="bubble-message-body"><div class="bubble-message-text">${
        message.content
      }</div></div></div></div>`;

      document.getElementById("chat").appendChild(bubble);
    };
  }

  static initialize(deps) {
    const instance = new Business(deps);

    return instance._init();
  }
}
