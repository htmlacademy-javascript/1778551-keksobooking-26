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

//Функция для вывода правильного сообщение сколько гостей и комнат
const createCapacityMessage = (tag, rooms, guest) => {
  if (rooms === 1 && guest === 1) {
    tag.textContent = `${rooms} комната для ${guest} гостя`;
  } else if (rooms === 1 && guest === 2) {
    tag.textContent = `${rooms} комната для ${guest} гостей`;
  } else if (rooms >=2 && rooms <=4 && guest === 1) {
    tag.textContent = `${rooms} комнаты для ${guest} гостя`;
  } else if (rooms >=2 && rooms <=4  && guest >= 2) {
    tag.textContent = `${rooms} комнаты для ${guest} гостей`;
  } else if (rooms >=5  && guest === 1) {
    tag.textContent = `${rooms} комнат для ${guest} гостя`;
  } else if (rooms >=5  && guest >= 2) {
    tag.textContent = `${rooms} комнат для ${guest} гостей`;
  }
};

/**
 *Функция вызова случайного элемента массива
 * @param {Arr} имя массива, elements - элемент массива
 * @returns {string} [i] - рандомный элемент массива
 */
const getRandomElementArr = (element) => element[getRandomInt(0, element.length-1)];

//Функция для удаления элемента
function deleteElement (data, element) {
  if (data) {
    element.textContent = data;
  } else {
    element.remove();
  }
}

/**
 * Функция генерирует новый массив строк с случайной длинной массива из существующего
 * @param {array} массив от которого мы будем брать данные
 * @returns {resultArray} сгенерированный массив с случайной длинной
 */
const getRandomElementsArr = (array) => {
  const arrayRandomElements = [];
  while (arrayRandomElements.length < getRandomInt(1, array.length)) { //пока длинна нового массива меньше данного, производится генерация элементов в новый массив
    const randomElement = array[(getRandomInt(0, array.length - 1))]; // рандомный элемент берется из длинный массива
    if (!arrayRandomElements.includes(randomElement)) { //если в новом массиве нет рандомного элемента, тогда
      arrayRandomElements.push(randomElement); //добавляем этот элемент в созданный массив с случайной длинной
    }
  }
  return arrayRandomElements;
};

export {getRandomElementArr,  getRandomElementsArr, getRandomFloat, getRandomInt, deleteElement, createCapacityMessage};
