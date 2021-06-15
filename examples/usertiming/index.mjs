import { default as Fastify } from 'fastify';

import {
  performance,
  PerformanceObserver,
  createHistogram
} from 'perf_hooks';

import {
  generatePrime,
} from 'crypto';

const fastify = Fastify()

let n = 0;

const h = createHistogram();

const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  for (let n = 0; n < entries.length; n++)
    h.record((entries[n].duration * 1e6) | 0);
  console.log(h.mean, h.min, h.max);
});
obs.observe({ type: 'measure' });

fastify.get('/', async (request, reply) => {
  const a = ++n;
  performance.mark(`A${a}`);
  try {
    return await new Promise((res, rej) => {
      generatePrime(1024, (err, prime) => {
        res(Buffer.from(prime).toString('hex'));
        performance.mark(`B${a}`);
      });
    });
  } finally {
    performance.measure(`A${a} to B${a}`, `A${a}`, `B${a}`);
  }
})

fastify.listen(3000, function (err, address) {
  if (err) process.exit(1)
})
