const cpf = document.getElementById('cpf');
const email = document.getElementById('email');
const emailConfirm = document.getElementById('emailConfirm');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');

const name = document.getElementById('name');
const birthday = document.getElementById('birthday');
const rg = document.getElementById('rg');
const zipCode = document.getElementById('zipCode');
const address = document.getElementById('address');
const number = document.getElementById('number');
const neighborhood = document.getElementById('neighborhood');
const complement = document.getElementById('complement');
const city = document.getElementById('city');
const state = document.getElementById('state');
const phoneNumber = document.getElementById('PhoneNumber');
const mobileNumber = document.getElementById('MobileNumber');

const btnSubmitForm = document.getElementById('btnSubmitForm');

let data = {};
let count = 0;

btnSubmitForm.addEventListener('click', () => {
  const id = count++;
  
  data[id] = {
    'id' : id,
    'cpf': cpf.value,
    'email': email.value,
    'emailConfirm': emailConfirm.value,
    'password': password.value,
    'passwordConfirm': passwordConfirm.value,
    'name': name.value,
    'birthday': birthday.value,
    'rg': rg.value,
    'zipCode': zipCode.value,
    'address': address.value,
    'number': number.value,
    'neighborhood': neighborhood.value,
    'complement': complement.value,
    'city': city.value,
    'state': state.value,
    'phoneNumber': phoneNumber.value,
    'mobileNumber': mobileNumber.value
  };

  console.table(data);
});

zipCode.addEventListener('input', () => {
  if(zipCode.value.length === 8){
    const apiViaCep = `https://viacep.com.br/ws/${zipCode.value}/json/`

    fetch(apiViaCep).then(function(response){
      response.json().then(function(data) {
        address.value = data.logradouro;
        neighborhood.value = data.bairro;
        complement.value = data.complemento;
        city.value = data.localidade;
        state.value = data.uf;
      });
    });
  };
});