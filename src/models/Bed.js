/**
 * Created by MorenYang on 2017/9/13.
 */
import mongoose from 'mongoose'

const bedSchema = new mongoose.Schema({
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
      type: Number
    },
    major: {
      type: Number
    }
  },
  dorm: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
});

export const Bed = mongoose.model('Bed', bedSchema);
export default Bed
