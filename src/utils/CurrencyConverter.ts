export function formatarMoeda(valor: string) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  
    return formatter.format(Number(valor));
  }