import  { CronJob } from 'cron';
import moment from 'moment';
import { AppointmentModel } from '../models/models';

const notificationWorkerFactory = function() {
    return {
      run: function() {
        AppointmentModel.sendNotifications(() => console.log('callback!'));        
      },
    };
  };


const schedulerFactory = function() {
  return {
    start: function() {
      new CronJob('00 * * * * *', function() {
        console.log('Running Send Notifications Worker for ' +
          moment().format());
          notificationWorkerFactory().run();
      }, null, true, '');
    },
  };
};

export default schedulerFactory();