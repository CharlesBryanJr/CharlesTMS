import axios from 'axios';

const TP = axios.create({ baseURL: 'https://api.onb-triumphpay.com' });

// https://secure.onb-triumphpay.com/
// Function to get the access token using BasicAuthentication
// "api_key": "c89e2a50-d63e-4e13-8027-5af22d656103",
// "username": "charlesabryanjr@gmail.com",
// 05208541-4e9c-4126-9411-cd13fa1b6d27

export const getAccessToken = () => {
  return TP.post('/APILogin/BasicAuthentication', {
    "api_key": "0c2108d6-3b87-46cf-8e81-6b99a774e4d6",
    "username": "cbryan@triumphpay.com",
    "password": "TPcab312.jr02tp",
    "Include_Token_Info": "true"
  })
  .then(response => {
    return response.data.access_token;
  })
  .catch(error => {
    console.error('Error fetching access token:', error);
    throw error;
  });
};

export const BasicAuthentication = () => TP.post('/APILogin/BasicAuthentication', {
    "api_key": "0c2108d6-3b87-46cf-8e81-6b99a774e4d6",
    "username": "cbryan@triumphpay.com",
    "password": "TPcab312.jr02tp",
    "Include_Token_Info": "true"
});

export const createCarrier_tp = (newCarrier) => {
  console.log(newCarrier);
  return getAccessToken()
    .then(accessToken => {
      return TP.post('/APISubmitPayor/PayeeProfile', newCarrier, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    })
    .catch(error => {
      console.error('Error creating carrier:', error);
      throw error;
    });
};

export const createLoad_tp = (newLoad) => {
  console.log(newLoad);
  return getAccessToken()
    .then(accessToken => {
      return TP.post('/APISubmitPayor/Load', newLoad, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    })
    .catch(error => {
      console.error('Error creating load:', error);
      throw error;
    });
};

export const createInvoice_tp = (newInvoice) => {
  console.log(newInvoice);
  return getAccessToken()
    .then(accessToken => {
      return TP.post('/APISubmitPayor/Invoice', newInvoice, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    })
    .catch(error => {
      console.error('Error creating invoice:', error);
      throw error;
    });
};

export const InvoiceDrafts = (requestBody) => {
  console.log();
  return getAccessToken()
    .then(accessToken => {
      return TP.post('/APIReportPayor/InvoiceDrafts', requestBody, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
    });
  })
  .catch(error => {
    console.error('Error Getting InvoiceDrafts:', error);
    throw error;
  });
};
