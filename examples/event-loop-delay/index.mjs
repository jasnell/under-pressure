import { default as Fastify } from 'fastify';

import { monitorEventLoopDelay } from 'perf_hooks';
const monitor = monitorEventLoopDelay();
monitor.enable();

const fastify = Fastify()

fastify.get('/', async (request, reply) => {
  const duration = (Math.random() * 1e6) | 0;
  syncSleep(duration);
  console.log(monitor.mean, monitor.max, duration);
  return { hello: 'world' };
})

fastify.listen(3000, function (err, address) {
  if (err) process.exit(1)
})

function syncSleep(n) {
  const sab = new SharedArrayBuffer(4);
  Atomics.wait(new Int32Array(sab), 0, 1, n);
}
