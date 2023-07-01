export function toDate(param: string) {
  if (!param || param.trim() === '') return ''

  const date = new Date(param);
  return date
    .toLocaleString('pt-BR')
    .slice(0, date.toLocaleString('pt-BR').indexOf(','));   
}

export function toDateTime(param: string) {
  if (!param || param.trim() === '') return ''
  
  const date = new Date(param);
  return date.toLocaleString('pt-BR').replace(',', '');
}