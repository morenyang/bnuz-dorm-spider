/**
 * Created by MorenYang on 2017/9/13.
 */
const mongoose = require('mongoose')

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

class dormClass {
  static findDorm({building, dormNumber}) {
    return this.findOne({building, dormNumber})
  }
}

dormSchema.loadClass(dormClass);
export default mongoose.model('Dorm', dormSchema);
