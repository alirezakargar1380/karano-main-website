import axios, { AxiosRequestConfig } from 'axios';
import { update } from 'lodash';

import { HOST_API, BACKEND_API } from 'src/config-global';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: BACKEND_API });
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

export const adminFetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  settings: {
    meta: '/api/settings/meta',
    landing: '/api/settings/landing',
    price_list: '/api/settings/price-list',
    direct_price_list: `${BACKEND_API}/api/settings/price-list`,
    direct_catalog: `${BACKEND_API}/api/settings/catalog`,
  },
  auth: {
    user: {
      check_phone: '/api/authentication/user/check-phone',
      login: '/api/authentication/user/login',
      loginSignUp: '/api/authentication/user/login-signup',
      resetPassword: '/api/authentication/user/reset-password',
      resetPasswordVerify: '/api/authentication/user/reset-password/verify',
      resetPasswordSetPassword: '/api/authentication/user/reset-password/set-password',
      me: '/api/authentication/user/me',
      verify: '/api/authentication/user/verify',
      add_password: (id: any) => '/api/authentication/user/add-password/' + id,
    },
    admin: {
      login: '/api/admin/login',
      create: '/api/admin',
      update: (id: number) => '/api/admin/' + id,
      me: '/api/admin/me',
    },
    register: '/api/authentication/user/register',
  },
  auth_code: {
    send_code: (phone: string) => `/api/auth-code/${phone}`,
    remaining_time: (phone: string) => `/api/auth-code/remainingTime/${phone}`
  },
  admin: {
    list: '/api/admin',
    one: (id: any) => '/api/admin/' + id,
  },
  image: {
    url: (name: string) => `${BACKEND_API}/api/images/` + name,
  },
  price_list: {
    search: '/api/price-list/search',
  },
  cart: {
    list: '/api/cart',
    emty: '/api/cart/emty',
    add: '/api/cart',
    update_product_assemble: (product_id: any) => `/api/cart/${product_id}/assemble`
  },
  addresses: {
    create: '/api/addresses',
    list: '/api/addresses',
    update: (id: any) => '/api/addresses/' + id,
    one: (id: any) => `/api/addresses/${id}`,
    delete: (id: any) => '/api/addresses/' + id,
  },
  cover_type: {
    list: '/api/products-cover-types',
    create: '/api/products-cover-types',
    one: (id: string) => `/api/products-cover-types/${id}`,
    update: (id: any) => `/api/products-cover-types/${id}`,
    get_image: (name: string) => `${BACKEND_API}/api/products-cover-types/${name}/icon`,
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
    room_dooor: (id: any) => '/api/products/' + id + '/room-door',
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
    report: {
      rejected: '/api/orders/report/rejection'
    },
    create: '/api/orders',
    list: '/api/orders',
    sales: '/api/orders/sales',
    tracking: '/api/orders/tracking',
    production_list: '/api/orders/production',
    delivery_list: '/api/orders/delivery',
    storage_list: '/api/orders/storage',
    one: (id: any) => '/api/orders/' + id,
    update: (id: any) => '/api/orders/' + id,
  },
  invoice: {
    calculate: (id: any) => `/api/invoice/${id}/calculate`,
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
    cancel_delete: (id: any) => `/api/order-product-properties/${id}/remove`,
  },
  category: {
    list: '/api/category',
    products: (id: any) => `/api/category/${id}/products`,
  },
  provinces: {
    list: '/api/provinces',
    cities: (id: any) => `/api/provinces/${id}/cities`,
  },
  notification: {
    seen: (notif_id: string) => `/api/notification/${notif_id}/seen`,
  },
  landing: {
    idea_images: {
      list: '/api/landing/idea-images',
      get_image: (name: string) => `${BACKEND_API}/api/landing/idea-image/${name}/image`,
    },
    idea: {
      list: '/api/landing/idea',
    }
  }
};
