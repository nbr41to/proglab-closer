type InputDateFormatProps = {
  date?: Date;
  format?: string;
};

/* 引数がなければ, 現在時刻を 'YYYY/MM/DD hh:mm:ss' のフォーマットで返す*/

export const dateFormatted = (input?: InputDateFormatProps): string => {
  const { date, format } = input || {};
  let d: Date, f: string;
  if (!date) {
    d = new Date();
  } else if (date instanceof Date) {
    d = date;
  } else {
    d = new Date(date);
  }
  if (!format) {
    f = 'YYYY/MM/DD hh:mm:ss';
  } else {
    f = format;
  }
  f = f.replace(/YYYY/, d.getFullYear().toString());
  f = f.replace(/MM/, ('0' + (d.getMonth() + 1)).slice(-2));
  f = f.replace(/DD/, ('0' + d.getDate()).slice(-2));
  f = f.replace(/hh/, ('0' + d.getHours()).slice(-2));
  f = f.replace(/mm/, ('0' + d.getMinutes()).slice(-2));
  f = f.replace(/ss/, ('0' + d.getSeconds()).slice(-2));
  return f;
};
