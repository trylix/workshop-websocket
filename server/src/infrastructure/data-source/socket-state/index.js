module.exports = class {
  constructor() {
    this._socketState = new Map();
  }

  remove(userId, socket) {
    const existingSockets = this._socketState.get(userId);
    if (!existingSockets) {
      return true;
    }

    const sockets = existingSockets.filter((s) => s.id !== socket.id);
    if (!sockets.length) {
      this._socketState.delete(userId);
    } else {
      this._socketState.set(userId, sockets);
    }

    return true;
  }

  add(userId, socket) {
    const existingSockets = this._socketState.get(userId) || [];
    const sockets = [...existingSockets, socket];
    this._socketState.set(userId, sockets);
    return true;
  }

  get(userId) {
    return this._socketState.get(userId) || [];
  }

  getAll() {
    const all = [];
    this._socketState.forEach((sockets) => all.push(sockets));
    return all;
  }
};
