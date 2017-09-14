/**
 * Created by MorenYang on 2017/9/13.
 */


const cheerio = require('cheerio');

export const dormParser = function (body) {
  const $ = cheerio.load(body);
  const _dorm = $('.table1');
  const _beds = $('.table1[cellspacing]');

  // dorm parser
  // console.log(parseInt($($(_dorm).find('td')[7]).text().replace(/[\S]+：/g, '')));
  let dorm = {
    building: $($(_dorm).find('td')[1]).text().replace(/[\S]+：/g, '').textFormat(),
    dormNumber: $($(_dorm).find('td')[2]).text().replace(/[\S]+：/g, ''),
    dormType: $($(_dorm).find('td')[4]).text().replace(/[\S]+：/g, '').textFormat(),
    price: parseInt($($(_dorm).find('td')[7]).text().replace(/[\S]+：/g, ''))
  };

  let bedList = [];
  $(_beds).find('tr').each((i, el) => {
    if (i === 0) return;

    let _bed = {
      building: $($(el).find('td')[0]).text(),
      dormNumber: $($(el).find('td')[1]).text(),
      bedNumber: $($(el).find('td')[2]).text(),
      student: {
        name: $($(el).find('td')[3]).text(),
        grade: parseInt($($(el).find('td')[4]).text()),
        college: $($(el).find('td')[5]).text(),
        major: $($(el).find('td')[6]).text()
      }
    };
    // console.log(_bed);
    if (!!_bed.student.name.length)
      bedList.push(_bed);
  });
  return {dorm, bedList}
};

String.prototype.textFormat = function () {
  return this.replace(/\n/g, '').replace(/\t/g, '').replace(/ /g, '');
};
