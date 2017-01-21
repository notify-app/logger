'use strict'

const assert = require('assert')
const sinon = require('sinon')
const Logger = require('../')

describe('Logger utility', function () {
  describe('Scenario: Logging a message:', function () {
    describe('While in a forked environment', function () {
      let worker = null

      beforeEach(function () {
        worker = {
          emit: sinon.stub()
        }
      })

      describe('Given a Logger instance in a particular namespace,', function () {
        let logger = null
        let namespace = null

        beforeEach(function () {
          namespace = 'custom-namespace'
          logger = new Logger(worker, namespace)
        })

        describe('when logging an info message:', function () {
          let messOne = null
          let messTwo = null

          beforeEach(function () {
            messOne = {}
            messTwo = {}

            logger.info(messOne, messTwo)
          })

          it('should notify the info log listeners in IPC-Emitter network', function () {
            assert.strictEqual(worker.emit.calledOnce, true)
            assert.deepStrictEqual(worker.emit.getCall(0).args, [
              'logs:info',
              `[${namespace}]`,
              messOne,
              messTwo
            ])
          })
        })

        describe('when logging an warn message:', function () {
          let messOne = null
          let messTwo = null

          beforeEach(function () {
            messOne = {}
            messTwo = {}

            logger.warn(messOne, messTwo)
          })

          it('should notify the warn log listeners in IPC-Emitter network', function () {
            assert.strictEqual(worker.emit.calledOnce, true)
            assert.deepStrictEqual(worker.emit.getCall(0).args, [
              'logs:warn',
              `[${namespace}]`,
              messOne,
              messTwo
            ])
          })
        })

        describe('when logging an error message:', function () {
          let messOne = null
          let messTwo = null

          beforeEach(function () {
            messOne = {}
            messTwo = {}

            logger.error(messOne, messTwo)
          })

          it('should notify the error log listeners in IPC-Emitter network', function () {
            assert.strictEqual(worker.emit.calledOnce, true)
            assert.deepStrictEqual(worker.emit.getCall(0).args, [
              'logs:error',
              `[${namespace}]`,
              messOne,
              messTwo
            ])
          })
        })

        describe('when logging an verbose message:', function () {
          let messOne = null
          let messTwo = null

          beforeEach(function () {
            messOne = {}
            messTwo = {}

            logger.verbose(messOne, messTwo)
          })

          it('should notify the verbose log listeners in IPC-Emitter network', function () {
            assert.strictEqual(worker.emit.calledOnce, true)
            assert.deepStrictEqual(worker.emit.getCall(0).args, [
              'logs:verbose',
              `[${namespace}]`,
              messOne,
              messTwo
            ])
          })
        })

        describe('when logging an debug message:', function () {
          let messOne = null
          let messTwo = null

          beforeEach(function () {
            messOne = {}
            messTwo = {}

            logger.debug(messOne, messTwo)
          })

          it('should notify the debug log listeners in IPC-Emitter network', function () {
            assert.strictEqual(worker.emit.calledOnce, true)
            assert.deepStrictEqual(worker.emit.getCall(0).args, [
              'logs:debug',
              `[${namespace}]`,
              messOne,
              messTwo
            ])
          })
        })

        describe('when logging an silly message:', function () {
          let messOne = null
          let messTwo = null

          beforeEach(function () {
            messOne = {}
            messTwo = {}

            logger.silly(messOne, messTwo)
          })

          it('should notify the silly log listeners in IPC-Emitter network', function () {
            assert.strictEqual(worker.emit.calledOnce, true)
            assert.deepStrictEqual(worker.emit.getCall(0).args, [
              'logs:silly',
              `[${namespace}]`,
              messOne,
              messTwo
            ])
          })
        })
      })
    })
  })
})
