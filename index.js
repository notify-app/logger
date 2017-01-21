'use strict'

/**
 * Logger makes it easy for a developer to emit logs IPC-Emitter notifications
 * to the master process.
 *
 * Note that this utility can only be used in forked processes (i.e. the
 * process.send() method needs to be present).
 *
 * @example
 * const {worker} = require('ipc-emitter')
 * const logger = new Logger(worker, 'ws')
 *
 * logger.info('test') // => worker.emit('logs:info', 'ws', 'test')
 *
 * @param {IPC-Emitter Worker} worker    IPC Emitter worker.
 * @param {String}             namespace Namespace for the logs.
 */
function Logger (worker, namespace) {
  /**
   * IPC Emitter worker
   * @type {IPC-Emitter Worker}
   */
  this.worker = worker

  /**
   * Namespace for the logs
   * @type {String}
   */
  this.namespace = namespace
}

// Create methods
;['error', 'warn', 'info', 'verbose', 'debug', 'silly'].forEach(type => {
  Logger.prototype[type] = function (...payload) {
    this.worker.emit(`logs:${type}`, `[${this.namespace}]`, ...payload)
  }
})

module.exports = Logger
