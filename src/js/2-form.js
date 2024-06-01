const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

form.addEventListener('input', () => {
  // console.log('hello');
  const data = new FormData(form);
  const email = data.get('email').trim();
  const message = data.get('message').trim();
  formData.email = email;
  formData.message = message;

  // const name = form.elements.name.value;
  // const message = form.elements.message.value;

  saveToLS('feedback-form-state', formData);

  // saveToLS('email', email);
  // saveToLS('message', message);
});

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS('feedback-form-state');
  formData.email = data?.email || '';
  formData.message = data?.message || '';

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
});

form.addEventListener('submit', el => {
  el.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert(`Fill please all fields`);
    return;
  }

  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  form.reset();
  formData.email = '';
  formData.message = '';
  // formData = null;
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}
