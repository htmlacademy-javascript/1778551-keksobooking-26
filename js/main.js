//Вспомогательные функции
//источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

/**
 * @param {number} min - мнимальное число
 * @param {number} max - максимальное число
 * @return {float} - сгенерированное число с плавающей точкой
 * @return {string} - Строка при ошибке
 */

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

