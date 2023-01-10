(async () => {
  const Redis = require('ioredis');

  const redis = new Redis({
    port: 6381,
  });

  await redis.set('name', 'crystal');
  const keys = await redis.keys('*');

  console.log('keys', keys);
})();
