import { default as Fastify } from 'fastify';

import {
  generatePrime,
  generatePrimeSync
} from 'crypto';

const fastify = Fastify()

fastify.get('/', async (request, reply) => {

  return Buffer.from(generatePrimeSync(1024)).toString('hex');

  // return await new Promise((res, rej) => {
  //   generatePrime(1024, (err, prime) => {

  //     res(Buffer.from(prime).toString('hex'));
  //   });
  // });

})

fastify.listen(3000, function (err, address) {
  if (err) process.exit(1)
})
