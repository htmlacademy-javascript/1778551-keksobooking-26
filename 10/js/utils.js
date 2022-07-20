const getRoomWord = (rooms) => {
  if (rooms === 1){
    return 'комната';
  }
  if (rooms <=4) {
    return 'комнаты';
  }
  return 'комнат';
};

const getGuestWord = (guests) => {
  if (guests === 1){
    return 'гостя';
  }
  return 'гостей';
};

const createCapacityMessage = (tag, rooms, guest) => {
  tag.textContent = `${rooms} ${getRoomWord(rooms)} для ${guest} ${getGuestWord(guest)}`;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  createCapacityMessage,
  debounce
};
