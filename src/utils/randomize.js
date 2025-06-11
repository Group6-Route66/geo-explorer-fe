export const randomize = (items, reqiuredLength) => {
  function getRandomInt(num) {
    return Math.floor(Math.random() * num);
  }
  const randomArray = [];
  if (items.length < reqiuredLength) {
    reqiuredLength = items.length;
  }
  
  while (randomArray.length < reqiuredLength) {
    const index = getRandomInt(items.length);
    if (!randomArray.includes(index)) {
      randomArray.push(index);
    }
  }
  return randomArray.map((index) => items[index]);
};
