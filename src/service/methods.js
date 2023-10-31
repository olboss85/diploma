export function createId (){
    return new Date().getTime().toString()
  }


  export function formatDate(date) {
    if (date && date.toDate) {
      const _date = date.toDate();
      const day = _date.getDate();
      const month = _date.getMonth() + 1; // Январь - это 0
      const year = _date.getFullYear();
  
      return `${day}.${month}.${year}`;
    } else {
      // Обработка случая, когда date не определено или не содержит метод toDate
      return 'Неверная дата';
    }
  }