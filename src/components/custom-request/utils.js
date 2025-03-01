export const utils = {
  formatDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  },
  formatOnlyDate(date) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
  formatOnlyTime(date) {
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  },
  formatDateWithYear(date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  },
  debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
};
