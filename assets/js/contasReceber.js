const tabItems = document.querySelectorAll('.tabs__item');
const tabCard = document.querySelectorAll('.card');

tabItems.forEach(item => {
  item.addEventListener('click', () => {
    tabItems.forEach(item => {
      item.classList.remove('tabs__active')
    });
    item.classList.add('tabs__active');
  
    tabCard.forEach(content => {
      content.classList.add('is-to-hide');
    });
  
    const tabId = item.getAttribute('data-tab');
    const tabContent = document.getElementById(tabId);
    tabContent.classList.remove('is-to-hide');
  });
})

const descriptionToPay = document.getElementById('descriptionToPay');
const payDate = document.getElementById('payDate');
const amountPay = document.getElementById('amountPay');
const payMeansOfPayment = document.getElementById('payMeansOfPayment');
const remarkToPay = document.getElementById('remarkToPay');
const btnSubmitFormPay = document.getElementById('btnSubmitFormPay');

function populateMeansOfPaymentSelect(run) {
  fetch('http://localhost:3000/means')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.meansName;
        run.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar dados da API:', error);
    });
}

window.addEventListener('load', populateMeansOfPaymentSelect(payMeansOfPayment));
window.addEventListener('load', populateMeansOfPaymentSelect(meansOfPaymentReceive));

amountPay.addEventListener('keyup', (event) => {
  let valueKeyup = event.target.value.replace(/\D/g,"");
  valueKeyup = (valueKeyup/100).toFixed(2) + "";
  valueKeyup = valueKeyup.replace(".", ",");
  valueKeyup = valueKeyup.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  valueKeyup = valueKeyup.replace(/(\d)(\d{3}),/g, "$1.$2,");
  event.target.value = valueKeyup;
});

btnSubmitFormPay.addEventListener('click', () => {
  if(descriptionToPay.value !== '' && payDate.value !== '' && amountPay.value !== '' && payMeansOfPayment.value !== ''){
    const fullDate = payDate.value;

    const formData = {
      descriptionToPay: descriptionToPay.value,
      payDateYear: parseInt(fullDate.slice(0,4)),
      payDateMonth: parseInt(fullDate.slice(5,7)),
      payDateDay: parseInt(fullDate.slice(8,10)),
      amountPay: parseFloat(amountPay.value.replace(/\./g, '').replace(/,/g, '.')),
      payMeansOfPayment: payMeansOfPayment.value,
      remarkToPay: remarkToPay.value
    };
    fetch('http://localhost:3000/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      const status = response.status;
      return response.text().then((message) => {
        return { status, message };
      });
    })
    .then((data) => {
      showAlert(data.status, 'Adicionado com sucesso');
    });
  } else {
    showAlert(453,'Todos os campos obrigatórios devem ser preenchidos')
  }

});

function showAlert (status,message){
  const alertMessages = document.getElementById('alertMessages');

  if(status == 201) {
    alertMessages.innerText = message;
    alertMessages.classList.remove('is-to-hide');
    alertMessages.classList.add('is-to-display','is-success');
    setTimeout(function(){
      alertMessages.classList.remove('is-to-display','is-success');
      alertMessages.classList.add('is-to-hide');
    }, 5000)
  }
  if(status == 453){
    alertMessages.innerText = message;
    alertMessages.classList.remove('is-to-hide');
    alertMessages.classList.add('is-to-display','is-error');
    setTimeout(function(){
      alertMessages.classList.remove('is-to-display','is-error');
      alertMessages.classList.add('is-to-hide');
    }, 5000)
  }
}

const descriptionToReceive = document.getElementById('descriptionToReceive');
const receivableDate = document.getElementById('receivableDate');
const amountReceivable = document.getElementById('amountReceivable');
const meansOfPaymentReceive = document.getElementById('meansOfPaymentReceive');
const remarkToReceive = document.getElementById('remarkToReceive');
const btnSubmitFormReceive = document.getElementById('btnSubmitFormReceive');