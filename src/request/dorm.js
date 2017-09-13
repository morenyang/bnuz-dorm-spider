/**
 * Created by MorenYang on 2017/9/13.
 */
import {request} from './main'

const DORM_API = `http://dorm.bnuz.edu.cn/dormitoryStudent.do?method=goDormitory&id=`;

export const fetchDorm = ({id}) => {
  const API = `${DORM_API}${id}`;
  let options = {
    method: 'GET',
    uir: API
  };

  return request(options)
    .then(res => {
      if (!res) {
        return {status: false, message: 'network error', errCode: 103}
      }
      if (res.statusCode === 200) {
        if (res.body.indexOf('学校主页') > 0) {
          return {status: false, message: 'auth error', errCode: 101}
        } else if (res.body || res.body.length === 0) {
          return {status: false, message: 'no data', errCode: 201}
        } else {
          return {status: true, body: res.body}
        }
      } else {
        return {status: false, message: 'server error', errCode: 102}
      }
    })
};
