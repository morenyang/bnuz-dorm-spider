/**
 * Created by MorenYang on 2017/9/13.
 */

import {login} from "./request/login";
import {fetchDorm} from "./request/dorm";
import {dormParser} from "./parser";
import Bed from './models/Bed'
import Dorm from './models/Dorm'
import config from './config'

const main = async () => {
  let _loginStatus = false;
  await loginModule().then(res => {
    _loginStatus = res.status
  });
  let currentId = config.idStart;
  for (; currentId <= config.idEnd; currentId++) {
    if (!_loginStatus) {
      await loginModule().then(res => {
        _loginStatus = res.status;
      });
      continue;
    }

    let _dorm, _bedList;
    const _res = await fetchModule({id: currentId}).then(res => {
      if (res.status) {
        return dormParser(res.body)
      } else if (res.errCode === 202) {
        console.log(`${currentId} blank`)
        return false
      } else if (res.errCode === 201) {
        currentId--;
        _loginStatus = false;
        return false
      } else {
        console.log(res.message);
        return false
      }
    });
    if (!_res) {
      continue;
    }
    _dorm = _res.dorm;
    _bedList = _res.bedList;
    let dorm = await saveDorm({dorm: _dorm});
    for (let i = 0; i < _bedList.length; i++) {
      console.log(`${currentId} ${_bedList[i].building} ${_bedList[i].dormNumber} ${_bedList[i].bedNumber} ${_bedList[i].student.name}`);
      saveBed({dorm, bed: _bedList[i]})
    }
  }
};


const loginModule = () =>
  login({
    username: config.username,
    password: config.password
  }).then(res => {
    if (res.status) {
      console.log(`Login Success`)
    }
    return res
  });

const fetchModule = ({id}) =>
  fetchDorm({id});

const saveDorm = ({dorm}) =>
  new Promise((resolve, reject) => {
    let dormInDB = undefined;
    Dorm.findOne({building: dorm.building, dormNumber: dorm.dormNumber}, (err, res) => {
      if (err) {
        console.log(err);
        reject(err)
      }
      if (!res) {
        const _dorm = new Dorm(dorm);
        _dorm.save((err, res) => {
          dormInDB = res;
        })
      } else {
        dormInDB = res
      }
      resolve(dormInDB)
    });
  });

const saveBed = ({dorm, bed}) =>
  new Promise((resolve, reject) => {
    bed.dorm = dorm;
    let _bed = new Bed(bed);
    bedPreSave(_bed).then(() => {
      _bed.save((err, res) => {
        if (err) reject(err);
        resolve(res)
      })
    })
  });

const bedPreSave = (bed) =>
  new Promise((resolve, reject) => {
    Bed.findOne({
      building: bed.building,
      dormNumber: bed.dormNumber,
      bedNumber: bed.bedNumber
    }, (err, res) => {
      if (err) console.log(err);
      if (res) res.remove((err, res) => {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          resolve()
        }
      });
      else resolve()
    })
  });

export default main;
