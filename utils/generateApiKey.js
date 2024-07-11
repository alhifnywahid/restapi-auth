function generateApiKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  let usedIndices = new Set();

  while (result.length < 10) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      if (!usedIndices.has(randomIndex)) {
          usedIndices.add(randomIndex);
          result += characters.charAt(randomIndex);
      }
  }
  
  return result;
}


module.exports = generateApiKey;
