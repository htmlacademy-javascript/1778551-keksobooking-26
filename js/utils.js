/**
 * Функция вызова случайного целого числа
 * @param {number} a - мнимальное число
 * @param {number} b - максимальное число
 * @return {Int} - сгенерированное целое число
 */
function getRandomInt(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

/**
 * Функция вызова случайного числа(Float)
 * @param {number} a - мнимальное число
 * @param {number} b - максимальное число
 * @param {toFixed} digits - количество цифр после запятой
 * @return {Float} - сгенерированное число(Float)
 */
function getRandomFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

/**
 *Функция вызова случайного элемента массива
 * @param {Arr} имя массива, elements - элемент массива
 * @returns {string} [i] - рандомный элемент массива
 */
const getRandomElementArr = (elements) => elements[getRandomInt(0, elements.length-1)];

/**
 * Функция генерирует новый массив строк с случайной длинной массива из существующего
 * @param {array} массив от которого мы будем брать данные
 * @returns {resultArray} сгенерированный массив с случайной длинной
 */
const collectRandomEl = (array) => {
  const resultArray = [];
  while (resultArray.length < getRandomInt(1, array.length)) { //пока длинна нового массива меньше данного, производится генерация элементов в новый массив
    const randomElement = array[(getRandomInt(0, array.length - 1))]; // рандомный элемент берется из длинный массива
    if (!resultArray.includes(randomElement)) { //если в новом массиве нет рандомного элемента, тогда
      resultArray.push(randomElement); //добавляем этот элемент в созданный массив с случайной длинной
    }
  }
  return resultArray;
};

export {getRandomElementArr,  collectRandomEl,  getRandomFloat, getRandomInt};
