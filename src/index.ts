
var PAD = 2;
const MS_PER_DAY = 86400000;
const MS_PER_HOUR = 3600000;
const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;

const LOCALE_WEEK_DAY = '周日_周一_周二_周三_周四_周五_周六'.split('_');

var rules = {
  'YYYY': function (date: Date) {
    return date.getFullYear().toString();
  },
  'yyyy': function (date: Date) {
    return date.getFullYear().toString();
  },
  'MM': function (date: Date) {
    return fixNumberPad(date.getMonth() + 1, PAD);
  },
  'ddd': function (data: Date) {
    const day = data.getDay();
    return LOCALE_WEEK_DAY[day];
  },
  'DD': function (date: Date) {
    return fixNumberPad(date.getDate(), PAD);
  },
  'dd': function (date: Date) {
    return fixNumberPad(date.getDate(), PAD);
  },
  'HH': function (date: Date) {
    return fixNumberPad(date.getHours(), PAD);
  },
  'mmm': function (date: Date) {
    return fixNumberPad(
      Math.floor(date.getTime() / MS_PER_MINUTE),
      PAD
    );
  },
  'mm': function (date: Date) {
    return fixNumberPad(date.getMinutes(), PAD);
  },
  'ss': function (date: Date) {
    return fixNumberPad(date.getSeconds(), PAD);
  }
};

var keys = Object.keys(rules);
var ruleKeysReg = new RegExp(keys.join('|'), 'g');

function formatDate (date: Date | number, fmt: string) {
  var currentDate: Date;
  if (!(date instanceof Date)) {
    currentDate = new Date(date);
  } else {
    currentDate = date;
  }

  if (typeof fmt === 'string') {
    return fmt.replace(ruleKeysReg, function (key) {
      return rules[(key as keyof typeof rules)](currentDate);
    });
  }
  return date.toString();
}

const diffTimeRules = {
  'hhh': function (time: number) {
    return fixNumberPad(
      Math.floor(time / MS_PER_HOUR),
      PAD
    );
  },
  'hh': function (time: number) {
    return fixNumberPad(
      Math.floor(
        (time % MS_PER_DAY) / MS_PER_HOUR
      ),
      PAD
    );
  },
  'mmm': function (time: number) {
    return fixNumberPad(
      Math.floor(time / MS_PER_MINUTE),
      PAD
    );
  },
  'mm': function (time: number) {
    return fixNumberPad(
      Math.floor(
        (time % MS_PER_HOUR) / MS_PER_MINUTE
      ),
      PAD
    );
  },
  'sss': function (time: number) {
    return fixNumberPad(
      Math.floor(time / MS_PER_SECOND),
      PAD
    );
  },
  'ss': function (time: number) {
    return fixNumberPad(
      Math.floor(
        (time % MS_PER_MINUTE) / MS_PER_SECOND
      ),
      PAD
    );
  },
};

var diffTimeRuleKeys = Object.keys(diffTimeRules);
var diffTimeRuleKeysReg = new RegExp(diffTimeRuleKeys.join('|'), 'g');

function formatDiffTime (diffTime: number, fmt: string) {
  if (typeof fmt === 'string') {
    return fmt.replace(diffTimeRuleKeysReg, function (key) {
      return diffTimeRules[(key as keyof typeof diffTimeRules)](diffTime);
    });
  }
  return diffTime;
}

function fixNumberPad (num: number | string, size: number) {
  var str = num.toString();
  var current;
  if (str.length >= size) {
    current = str;
  } else {
    current = Array(size - str.length + 1).join('0') + str;
  }
  return current;
}

interface Format {
  (date: number | Date, fmt: string): string;
  formatDiffTime: (diffTime: number, fmt: string) => string | number
}

let format = formatDate;
(format as Format).formatDiffTime = formatDiffTime;
export default format as Format;

export function isThisYear (date: Date|number) {
  var currentDate: Date;
  if (!(date instanceof Date)) {
    currentDate = new Date(date);
  } else {
    currentDate = date;
  }

  return currentDate.getFullYear() === new Date().getFullYear();
}
