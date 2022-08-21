import { CronJob } from 'cron';
import { botConfig } from '../conf/config';

const markToDeleteJob = new CronJob('0 0/2 * * *', function () {
  const d = new Date();
  console.log('Mark to delete:', d);
});

const deleteJob = new CronJob(`${botConfig.MINUTES_BEFORE_CLEAN} 0/2 * * *`, function () {
  const d = new Date();
  console.log('Clean job:', d);
});
