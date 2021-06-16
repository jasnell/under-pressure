import { default as Fastify } from 'fastify';

import { monitorEventLoopDelay } from 'perf_hooks';
const monitor = monitorEventLoopDelay();
monitor.enable();

const fastify = Fastify()

fastify.get('/', async (request, reply) => {
  for (let n = 0; n < 1e9; n++) {}
  console.log(monitor.mean, monitor.max);
  return { hello: 'world' };
})

fastify.listen(3000, function (err, address) {
  if (err) process.exit(1)
})
