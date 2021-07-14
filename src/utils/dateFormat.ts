export const dateFormat = (date: any) => {
  let format = 'YYYY/MM/DD hh:mm:ss';
  format = format.replace(/YYYY/, date.getFullYear());
  format = format.replace(/MM/, date.getMonth() + 1);
  format = format.replace(/DD/, date.getDate());
  format = format.replace(/hh/, ('00' + date.getHours()).slice(-2));
  format = format.replace(/mm/, ('00' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/, ('00' + date.getSeconds()).slice(-2));
  return format;
};
