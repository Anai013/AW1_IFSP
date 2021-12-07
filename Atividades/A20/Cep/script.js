const btn = document.querySelector('[type="button"]')
const inputCEP = document.querySelector('[name="cep"]')
const inputRoad = document.querySelector('[name="road"]')
const inputDistrict = document.querySelector('[name="district"]')
const inputCity = document.querySelector('[name="city"]')
const inputUF = document.querySelector('[name="uf"]')

btn.addEventListener('click', event => {
  let cep = inputCEP.value
  const url = `https://viacep.com.br/ws/${cep}/json/`

  axios
    .get(url)
    .then(response => {
      inputRoad.value = response.data.logradouro
      inputDistrict.value = response.data.bairro
      inputCity.value = response.data.localidade
      inputUF.value = response.data.uf
    })
    .catch(error => console.log(error))
})

/*****************MASK*****************/
const mask = {
  cep(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }
}

document.querySelectorAll('input').forEach($input => {
  const field = $input.dataset.js

  $input.addEventListener(
    'input',
    e => {
      e.target.value = mask[field](e.target.value)
    },
    false
  )
})
