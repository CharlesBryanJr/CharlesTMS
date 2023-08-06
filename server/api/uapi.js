import axios from 'axios';

const UAPI = axios.create({ baseURL: 'https://sandbox.unified-api.triumphpay.com' });
// https://sandbox.unified-api.triumphpay.com/
// https://unified-api.triumphpay.com/

export const test_request_auth = () => UAPI.post('/brokers/test_request_auth', {});
export const createCarrierUAPI = (newCarrier) => UAPI.post('/brokers/carriers', newCarrier);
export const createLoadUAPI = (newLoad) => UAPI.post('/brokers/loads', newLoad);
export const createInvoiceUAPI = (newInvoice) => UAPI.post('/invoices', newInvoice);