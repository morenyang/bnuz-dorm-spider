/**
 * Created by MorenYang on 2017/9/13.
 */

import config from './config'
import worker from './worker'

const mongoose = require('mongoose');
mongoose.connect(config.dbPath, {useMongoClient: true});

worker();
