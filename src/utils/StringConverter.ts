export function toCamelCase(text: string) {
  let words = text.split(' ');

  for (let i = 0; i < words.length; i++)
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();

  return words.join(' ');
}


export function removeUnderline(texto: string): string {
  return texto.replace('_', ' ');
}

