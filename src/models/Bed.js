/**
 * Created by MorenYang on 2017/9/13.
 */
const mongoose = require('mongoose')

const bedObject = {
  building: {
    type: String,
    required: true
  },
  dormNumber: {
    type: String,
    required: true
  },
  bedNumber: {
    type: String,
    required: true,
  },
  dormType: {
    type: String
  },
  student: {
    name: {
      type: String,
      required: true
    },
    grade: {
      type: Number
    },
    college: {
      type: String
    },
    major: {
      type: String
    }
  }
};

const bedSchema = new mongoose.Schema(bedObject);

export const Bed = mongoose.model('Bed', bedSchema);
export default Bed
