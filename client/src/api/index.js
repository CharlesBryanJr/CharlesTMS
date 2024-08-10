import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchCarrier = (id) => API.get(`/carriers/${id}`);
export const fetchCarriers = (page) => API.get(`/carriers?page=${page}`);
export const fetchCarrierBySearch = (searchQuery) => API.get(`/carriers/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createCarrier = (newCarrier) => API.post('/carriers', newCarrier);
export const updateCarrier = (id, updatedCarrier) => API.patch(`/carriers/${id}`, updatedCarrier);
export const deleteCarrier = (id) => API.delete(`/carriers/${id}`);

export const fetchLoad = (id) => API.get(`/loads/${id}`);
export const fetchLoads = (page) => API.get(`/loads?page=${page}`);
export const fetchLoadBySearch = (searchQuery) => API.get(`/loads/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createLoad = (newLoad) => API.post('/loads', newLoad);
export const updateLoad = (id, updatedLoad) => API.patch(`/loads/${id}`, updatedLoad);
export const deleteLoad = (id) => API.delete(`/loads/${id}`);

export const fetchInvoice = (id) => API.get(`/invoices/${id}`);
export const fetchInvoices = (page) => API.get(`/invoices?page=${page}`);
export const fetchInvoiceBySearch = (searchQuery) => API.get(`/invoices/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createInvoice = (newInvoice) => API.post('/invoices', newInvoice);
export const updateInvoice = (id, updatedInvoice) => API.patch(`/invoices/${id}`, updatedInvoice);
export const deleteInvoice = (id) => API.delete(`/invoices/${id}`);

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchDraft = (draftDateFrom, draftDateTo) => API.get('/drafts', {
  params: {
    draftDateFrom,
    draftDateTo,
  },
});

export const askQuestion_local = (prompt) => API.post('http://127.0.0.1:5001/api/ask', prompt, {
  headers: {
    'Content-Type': 'application/json'
  }
});

export const askQuestion_ec2 = (prompt) => API.post('http://54.244.177.73:8000/api/ask', prompt, {
  headers: {
    'Content-Type': 'application/json'
  }
});