import { default as Fastify } from 'fastify';

import {
  createHistogram,
  performance,
} from 'perf_hooks';

import {
  generatePrime,
  generatePrimeSync
} from 'crypto';

const fastify = Fastify()

const h = createHistogram();

const timedHandler = performance.timerify(async () => {
  try {
    return Buffer.from(generatePrimeSync(1024)).toString('hex');

    // return await new Promise((res, rej) => {
    //   generatePrime(1024, (err, prime) => {

    //     res(Buffer.from(prime).toString('hex'));
    //   });
    // });
  } finally {
    console.log(h.mean, h.min, h.max);
  }
}, { histogram: h });

fastify.get('/', timedHandler)

fastify.listen(3000, function (err, address) {
  if (err) process.exit(1)
})
