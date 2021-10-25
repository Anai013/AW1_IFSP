/**********************FORM FOCUS**********************/
const inputs = document.querySelectorAll('.input')

function focusFunc() {
  let parent = this.parentNode
  parent.classList.add('focus')
}

function blurFunc() {
  let parent = this.parentNode
  if (this.value == '') {
    parent.classList.remove('focus')
  }
}

inputs.forEach(input => {
  input.addEventListener('focus', focusFunc)
  input.addEventListener('blur', blurFunc)
})

/**********************MASK**********************/
const masks = {
  phone(value) {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1')
  },

  cpf(value) {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  },

  cep(value) {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }
}
document.querySelectorAll('input').forEach($input => {
  const field = $input.dataset.js

  $input.addEventListener(
    'input',
    e => {
      e.target.value = masks[field](e.target.value)
    },
    false
  )
})

/**********************VALIDATION**********************/
const button = document.getElementById('button')

button.addEventListener('click', event => {
  event.preventDefault()

  const name = document.getElementById('name')
  const phone = document.getElementById('phone')
  const email = document.getElementById('email')
  const cpf = document.getElementById('cpf')
  const cep = document.getElementById('cep')
  const password = document.getElementById('password')

  if (name.value == '') {
    name.classList.add('errorInput')
  } else {
    name.classList.remove('errorInput')
  }
  if (phone.value == '' || phone.value.length < 14) {
    phone.classList.add('errorInput')
  } else {
    phone.classList.remove('errorInput')
  }
  if (
    email.value == '' ||
    email.value.indexOf('@') == -1 ||
    email.value.indexOf('.') == -1 ||
    email.value.indexOf('.') - email.value.indexOf('@') == 1
  ) {
    email.classList.add('errorInput')
  } else {
    email.classList.remove('errorInput')
  }
  if (cpf.value == '' || cpf.value.length < 14) {
    cpf.classList.add('errorInput')
  } else {
    cpf.classList.remove('errorInput')
  }
  if (cep.value == '' || cep.value.length < 9) {
    cep.classList.add('errorInput')
  } else {
    cep.classList.remove('errorInput')
  }
  if (password.value == '' || password.value.length < 8) {
    password.classList.add('errorInput')
  } else {
    password.classList.remove('errorInput')
  }
})
