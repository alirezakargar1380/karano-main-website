import axios, { AxiosRequestConfig } from 'axios';
import { update } from 'lodash';

import { HOST_API, BACKEND_API } from 'src/config-global';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: HOST_API });
const backend_axios = axios.create({ baseURL: BACKEND_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

backend_axios.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export const server_axios = backend_axios;
export default axiosInstance;


// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await server_axios.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    user: {
      check_phone: '/api/authentication/user/check-phone',
      login: '/api/authentication/user/login',
      loginSignUp: '/api/authentication/user/login-signup',
      me: '/api/authentication/user/me',
      verify: '/api/authentication/user/verify',
      add_password: (id: any) => '/api/authentication/user/add-password/' + id,
    },
    admin: {
      login: '/api/admin/login',
      create: '/api/admin',
      me: '/api/admin/me',
    },
    register: '/api/authentication/user/register',
  },
  admin: {
    list: '/api/admin',
  },
  image: {
    url: (name: string) => `${BACKEND_API}/api/images/` + name,
  },
  addresses: {
    create: '/api/addresses',
    list: '/api/addresses',
  },
  cover_type: {
    list: '/api/products-cover-types',
    create: '/api/products-cover-types',
    one: (id: string) => `/api/products-cover-types/${id}`,
    update: (id: any) => `/api/products-cover-types/${id}`,
    get_image: (name: string) => `${BACKEND_API}/api/products-cover-types/icons/${name}`,
    upload_icon: (id: any) => `/api/products-cover-types/${id}/icon`
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  user: {
    update: (id: any) => `/api/users/${id}`,
    user_update: `/api/users`,
  },
  product: {
    list: '/api/product/list',
    one: (id: any) => '/api/products/' + id,
    details: '/api/product/details',
    search: '/api/product/search',
  },
  orderForm: {
    one: (id: any) => '/api/order-form/' + id,
  },
  orderProducts: {
    one: (id: any) => '/api/order-products/' + id,
    update: (id: any) => '/api/order-products/' + id,
    ready_products_list: (id: any) => `/api/order-products/ready-products/${id}`,
    update_ready_product_status: (id: any) => `/api/order-products/${id}/ready-products/status`,
  },
  orders: {
    create: '/api/orders',
    list: '/api/orders',
    tracking: '/api/orders/tracking',
    production_list: '/api/orders/production',
    delivery_list: '/api/orders/delivery',
    storage_list: '/api/orders/storage',
    one: (id: any) => '/api/orders/' + id,
    update: (id: any) => '/api/orders/' + id,

  },
  favorite: {
    list: '/api/favorites',
    create: '/api/favorites',
    delete: (id: any) => `/api/favorites/${id}`,
  },
  orderProductProperties: {
    update: (id: any) => `/api/order-product-properties/${id}`,
    delete: (id: any) => `/api/order-product-properties/${id}`,
    update_approve: (id: any) => `/api/order-product-properties/${id}/approve`,
  },
  category: {
    list: '/api/category',
    products: (id: any) => `/api/category/${id}/products`,
  },
};
