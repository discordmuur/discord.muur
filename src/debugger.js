const storage = require('./storage');

class Debugger {

  /*
  * The main debug function
  * If debug mode is on, then we will log debug messages.
  */
  emit(message) {
    if (storage.debug) console.log(message);
  }

}

module.exports = new Debugger();
