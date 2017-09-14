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
      type: Number
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

bedSchema.pre('save', function (next) {
  this.findOne({
    building: this.building,
    dormNumber: this.dormNumber,
    bedNumber: this.bedNumber
  }, (err, res) => {
    if (err) console.log(err);
    if (res) res.remove((err, res) => {
      if (err) {
        console.log(err);
      } else {
        next()
      }
    });
    else next()
  })
});

export const Bed = mongoose.model('Bed', bedSchema);
export default Bed
