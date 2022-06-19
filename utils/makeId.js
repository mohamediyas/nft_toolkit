export const makeId = (length) => {
  let result = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  const characterLength = characters.length;

  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * characterLength));
  }

  return result;
};
