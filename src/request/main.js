/**
 * Created by MorenYang on 2017/9/13.
 */

const rp = require('request-promise');
import config from '../config'

export const request = rp.defaults({
  jar: true,
  resolveWithFullResponse: true,
  proxy: !!config.proxy ? config.proxy : undefined
});
export default request

