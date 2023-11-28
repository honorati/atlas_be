export function generateCode(length: number) {
   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let codeRandom = '';
   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      codeRandom += chars.charAt(randomIndex);
   }

   return codeRandom;
}
