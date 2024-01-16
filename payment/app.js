const paytm = require('paytm-business');

const client = paytm.init({
  apiKey: 'YOUR_API_KEY',
});

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const vpA = document.querySelector('#vpA').value;
  const amount = document.querySelector('#amount').value;

  const validateVPAResponse = await client.validateVPA({
    vpA,
  });

  if (validateVPAResponse.success) {
    const initiatePaymentResponse = await client.initiatePayment({
      amount,
      vpA,
    });

    if (initiatePaymentResponse.success) {
      console.log('Payment successful!');
    } else {
      console.log('Payment failed!');
    }
  } else {
    console.log('Invalid VPA!');
  }
});
