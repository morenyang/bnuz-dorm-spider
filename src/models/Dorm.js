/**
 * Created by MorenYang on 2017/9/13.
 */
const mongoose = require('mongoose')

const dormSchema = new mongoose.Schema({
  building: {
    type: String,
    required: true
  },
  dormNumber: {
    type: String,
    required:true
  },
  dormType: {
    type: String
  }
});

class dormClass {
  static findDorm({building, dormNumber}) {
    return this.findOne({building, dormNumber})
  }
}

dormSchema.loadClass(dormClass);
export default mongoose.model('Dorm', dormSchema);
