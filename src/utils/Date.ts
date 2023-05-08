export function toDate(param: string) {
  // 01/03/2023
  const date = new Date(param);
  return date
    .toLocaleString('pt-BR')
    .slice(0, date.toLocaleString('pt-BR').indexOf(','));
}

export function toDateTime(param: string) {
  // 01/03/2023 00:00:00
  const date = new Date(param);
  return date.toLocaleString('pt-BR').replace(',', '');
}