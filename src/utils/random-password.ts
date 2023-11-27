export function gerarCodigoAleatorio(tamanho: number) {
   const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let codigoAleatorio = '';
   for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigoAleatorio += caracteres.charAt(indiceAleatorio);
   }

   return codigoAleatorio;
}
