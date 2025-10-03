 //Formats a Date object into a readable string format: "day Month, year"
//Example output: "13 June, 2025"
  
export function formatDate(date = new Date()) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}
