//Вспомогательные функции
//источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

/**
 * @param {number} min - мнимальное число
 * @param {number} max - максимальное число
 * @return {float} - сгенерированное число с плавающей точкой
 * @return {string} - Строка при ошибке
 */

function getRandomIntInclusive(min, max, digits = 0) {
  if(min >= max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другое число.');
  }
  const k = Math.pow(10, digits);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * ((max - min + 1) + min) * k) / k;
}
getRandomIntInclusive(1, 5, 5);

