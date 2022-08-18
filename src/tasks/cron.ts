import { CronJob } from 'cron';

const markToDeleteJob = new CronJob('0 0/2 * * *', function () {
  const d = new Date();
  console.log('First:', d);
});

const deleteJob = new CronJob('15 0/2 * * *', function () {
  const d = new Date();
  console.log('First:', d);
});
