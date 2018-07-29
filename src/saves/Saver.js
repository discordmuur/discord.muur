var store = require('./storefile');

/*
* Manages the storing in cache.
*/
class Saver {
  /**
  * Adds data to the cache by key.
  * @param {String|Object} data the data that get's stored.
  */
  add(data) {
    if (store.get(data.id)) return store.get(data.id);
    store[data.id] = data;
    return data;
  }

  /**
  * Removes data from the cache.
  * @param {String} key is the key of the object you want to delete.
  */
  remove(key) {
    delete store[key]
    return key + " deleted.";
  }

}

module.exports = Saver;
