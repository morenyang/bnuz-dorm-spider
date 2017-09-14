/**
 * Created by MorenYang on 2017/9/13.
 */
const mongoose = require('mongoose')

const bedObject = {
  building: {
    type: String
  },
  dormNumber: {
    type: String
  },
  bedNumber: {
    type: String,
    required: true,
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
  },
  dorm: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Dorm'
  }
};

const bedSchema = new mongoose.Schema(bedObject);

export const Bed = mongoose.model('Bed', bedSchema);
export default Bed
