/**
 * Created by MorenYang on 2017/9/13.
 */

import config from './config'
import worker, {loginModule} from './worker'

const mongoose = require('mongoose');
mongoose.connect(config.dbPath, {useMongoClient: true});
mongoose.Promise = require('bluebird');

const WORKER_STEP = 100;

let freeWorker = config.maxWorkerNumber;
let currentStart = config.idStart;

async function main() {
  await loginModule();
  if (config.idEnd - config.idStart < WORKER_STEP) {
    worker()
  } else {
    init()
  }
}

function init() {
  if (freeWorker > 0) {
    freeWorker--;
    workerInit();
    init();
  }
}

function workerInit() {
  if (currentStart <= config.idEnd) {
    worker(currentStart, currentStart + WORKER_STEP - 1)
      .then(() => {
        freeWorker++;
        init();
      });
    currentStart += WORKER_STEP;
  }
}

main();
