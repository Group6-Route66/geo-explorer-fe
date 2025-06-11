export const randomize = (items, reqiredLength) => {
    function getRandomInt(num) {
      return Math.floor(Math.random() * num);
    }
    const randomArray = [];
    while (randomArray.length < reqiredLength) {
      const index = getRandomInt(items.length);
      if (!randomArray.includes(index)) {
        randomArray.push(index);
      }
    }
    return randomArray.map((index) => items[index]);
  }