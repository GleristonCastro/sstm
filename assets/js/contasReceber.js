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

const descriptionToReceive = document.getElementById('descriptionToReceive');
const receivableDate = document.getElementById('receivableDate');
const amountReceivable = document.getElementById('amountReceivable');
const meansOfPaymentReceive = document.getElementById('meansOfPaymentReceive');
const remarkToReceive = document.getElementById('remarkToReceive');
const btnSubmitFormReceive = document.getElementById('btnSubmitFormReceive');

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

payDate.addEventListener('keyup', (event) => {
  let valueKeyup = event.target.value.replace(/\D/g,"");
  valueKeyup = valueKeyup.replace(/(\d{2})(\d)/,"$1/$2") 
  valueKeyup = valueKeyup.replace(/(\d{2})(\d)/,"$1/$2") 
  event.target.value = valueKeyup;
});

amountPay.addEventListener('keyup', (event) => {
  let valueKeyup = event.target.value.replace(/\D/g,"");
  valueKeyup = (valueKeyup/100).toFixed(2) + "";
  valueKeyup = valueKeyup.replace(".", ",");
  valueKeyup = valueKeyup.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  valueKeyup = valueKeyup.replace(/(\d)(\d{3}),/g, "$1.$2,");
  event.target.value = valueKeyup;
})

btnSubmitFormPay.addEventListener('click', () => {
  let countToPay = 0;
  let id = countToPay++

  const formData = {
    pay: {
    id: id,
    descriptionToPay: descriptionToPay.value,
    payDate: payDate.value,
    amountPay: amountPay.value,
    payMeansOfPayment: payMeansOfPayment.value,
    remarkToPay: remarkToPay.value
    },
  };

  fetch('http://localhost:3000/salvar-dados', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
    });
});
