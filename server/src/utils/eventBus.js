const EventEmitter = require('events');

class AppEventBus extends EventEmitter {}

const eventBus = new AppEventBus();
// Increase listener limit for multiple open browser tabs
eventBus.setMaxListeners(50);

module.exports = eventBus;
