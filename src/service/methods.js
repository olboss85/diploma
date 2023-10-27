export function createId (){
    return new Date().getTime().toString()
  }


export function formatDate(date) {
  const _date = new Date(date.seconds * 1000);
  const day = _date.getDate();
  const month = _date.getMonth() + 1; // January is 0
  const year = _date.getFullYear();

  return `${day}.${month}.${year}`;
}