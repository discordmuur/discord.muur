const { EventEmitter } = require('events');

class Ratelimit {

    constructor() {
      this.queue = [];
      this.remaining = null;
      this.reset = null;

      this.events = new EventEmitter();
    }

    queue_up(call) {
      this.queue.push(call);

      this.events.emit('new_request_available', call);
    }

}

module.exports = new Ratelimit();
