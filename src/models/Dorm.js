/**
 * Created by MorenYang on 2017/9/13.
 */
const mongoose = require('mongoose')

mongoose.Promise = require('bluebird');

const dormSchema = new mongoose.Schema({
  building: {
    type: String
  },
  dormNumber: {
    type: String
  },
  dormType: {
    type: String
  },
  price: {
    type: Number
  }
});

export const Dorm = mongoose.model('Dorm', dormSchema);
