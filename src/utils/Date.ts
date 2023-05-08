export function toDate(param: string) {
  const date = new Date(param);
  return date
    .toLocaleString('pt-BR')
    .slice(0, date.toLocaleString('pt-BR').indexOf(',')); // 01/03/2023
}

export function toDateTime(param: string) {
  const date = new Date(param);
  return date.toLocaleString('pt-BR').replace(',', ''); // 01/03/2023 00:00:00
}
