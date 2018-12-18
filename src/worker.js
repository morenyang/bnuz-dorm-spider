/**
 * Created by MorenYang on 2017/9/13.
 */

import {login} from "./request/login";
import {fetchDorm} from "./request/dorm";
import {dormParser} from "./parser";
import Bed from './models/Bed'
import Dorm from './models/Dorm'
import config from './config'
import Store from './store'

export const main = async (arg1, arg2) => {
  let {idStart, idEnd} = config;
  if (!!arg1) {
    if (typeof (arg1) === 'number') {
      idStart = arg1;
      idEnd = arg2
    } else {
      idStart = arg1.idStart;
      idEnd = arg1.idEnd
    }
  }
  console.log(`worker ${idStart} - ${idEnd}`);
  if (!Store.loginStatus) {
    try {
      await loginModule().then(res => {
        Store.loginStatus = !!res.status
      });
    } catch (err) {
      console.log(err)
    }
  }
  let currentId = idStart;
  for (; currentId <= idEnd; currentId++) {
    if (!Store.loginStatus) {
      currentId--;
      await loginModule().then(res => {
        Store.loginStatus = !!res.status;
      });
      continue;
    }
    await sleep(config.delay);
    let _dorm, _bedList, _res;
    try {
      _res = await fetchModule({id: currentId}).then(res => {
        if (res.status) {
          return dormParser(res.body)
        } else if (res.errCode === 202) {
          console.log(`${currentId} blank`);
          return false
        } else if (res.errCode === 201) {
          currentId--;
          Store.loginStatus = false;
          return false
        } else {
          console.log(res.message);
          return false
        }
      });
    } catch (err) {
      console.log(err)
    }

    if (!_res) {
      continue;
    }
    _dorm = _res.dorm;
    _bedList = _res.bedList;
    let dorm;
    try {
      dorm = await saveDorm({dorm: _dorm});
    } catch (err) {
      console.log(err)
    }
    for (let i = 0; i < _bedList.length; i++) {
      console.log(`${currentId} ${_bedList[i].building} ${_bedList[i].dormNumber} ${_bedList[i].bedNumber} ${_bedList[i].student.name}`);
      try {
        await saveBed({bed: _bedList[i]})
      } catch (err) {
        console.log(err)
      }
    }
  }
  return new Promise((resolve, reject) => {
    resolve(true)
  })
};


export const loginModule = () =>
  login({
    username: config.username,
    password: config.password
  }).then(res => {
    if (res.status) {
      console.log(`Login Success`)
    }
    return res
  });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchModule = ({id}) =>
  fetchDorm({id});

const saveDorm = ({dorm}) =>
  new Promise((resolve, reject) => {
    let dormInDB;
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

const saveBed = ({bed}) =>
  new Promise((resolve, reject) => {
    let _bed = new Bed(bed);
    bedPreSave(_bed).then(() => {
      if (!!bed.student.name.length)
        _bed.save((err, res) => {
          if (err) reject(err);
          resolve(res)
        });
      else {
        resolve(null);
      }
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
