/**
 * Created by MorenYang on 2017/9/13.
 */
import request from './main'

const LOGIN_API = `http://dorm.bnuz.edu.cn/login.do`;

export const login = ({username, password}) => {
  let options = {
    method: 'POST',
    uri: LOGIN_API,
    form: {
      tssName: username,
      tssPassword: password
    }
  };

  return request(options)
    .then(res => {
      if (!res) {
        return {status: false}
      }
      if (res.statusCode === 200) {
        if (res.body.indexOf('密码不正确') > 0) {
          return {status: false}
        }
        if (res.body.indexOf('退出') > 0) {
          return {status: true}
        }
      }
      return {status: false}
    })
    .catch(({response}) => {
      if (!response) return {status: false}
    })
};
