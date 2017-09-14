/**
 * Created by MorenYang on 2017/9/13.
 */

import config from './config'

const mongoose = require('mongoose');
mongoose.connect(config.dbPath, {useMongoClient: true});


import worker from './worker'

worker();
