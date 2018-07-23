const EventEmitter = require('events');

/**
 * The base for the clients
 * @extends EventEmitter
 */
class BaseClient extends EventEmitter {
    constructor(options = {}) {
        super();

        /**
         * Timeouts that are set and still active
         * @type {Set<Timeout>}
         * @private
         */
        this._timeouts = new Set();
    }
    /**
     * Sets a timeout that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {number} delay Time to wait before executing (in milliseconds)
     * @param {...*} args Arguments for the function
     * @returns {Timeout}
     */
    setTimeout(fn, delay, ...args) {
        const timeout = setTimeout(() => {
            fn(...args);
            this._timeouts.delete(timeout);
        }, delay);
        this._timeouts.add(timeout);
        return timeout;
    }
    /**
     * Clears a timeout.
     * @param {Timeout} timeout Timeout to cancel
     */
    clearTimeout(timeout) {
        clearTimeout(timeout);
        this._timeouts.delete(timeout);
    }

    /**
     * Sets an interval that will be automatically cancelled if the client is destroyed.
     * @param {Function} fn Function to execute
     * @param {number} delay Time to wait between executions (in milliseconds)
     * @param {...*} args Arguments for the function
     * @returns {Timeout}
     */
    setInterval(fn, delay, ...args) {
        const interval = setInterval(fn, delay, ...args);
        this._intervals.add(interval);
        return interval;
    }

    /**
     * Clears an interval.
     * @param {Timeout} interval Interval to cancel
     */
    clearInterval(interval) {
        clearInterval(interval);
        this._intervals.delete(interval);
    }
}
module.exports = BaseClient;