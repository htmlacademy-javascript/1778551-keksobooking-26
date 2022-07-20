const URL_GET ='https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://26.javascript.pages.academy/keksobooking';
const METHOD = 'POST';
const messageFail = 'Не удалось загрузить данные';

const getData = (onSuccess, onFail) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then((cards) => {
      onSuccess(cards);
    })
    .catch(() => {
      onFail(messageFail);
    });
};

const sendData = (form, onSuccess, onFail) => {
  fetch(
    URL_SEND,
    {
      method: METHOD,
      body: form,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};
