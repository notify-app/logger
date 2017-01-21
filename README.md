# Notify Logger
Logger makes it easy for a developer to emit logs IPC-Emitter notifications to the main `app` module.

Note that the `Logger` utility can only be used in forked processes (i.e. the [process.send()](https://nodejs.org/api/process.html#process_process_send_message_sendhandle_options_callback) method needs to be present).

Example:
```javascript
const {worker} = require('ipc-emitter')
const logger = new Logger(worker, 'ws')

logger.info('test') // => worker.emit('logs:info', 'ws', 'test')
```