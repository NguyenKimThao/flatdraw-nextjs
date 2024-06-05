import { DataResponse, UserInfoResponse } from '~/config/types';

function buildQueryString(params: any) {
  const items = Object.keys(params).map((key) => {
    if (
      params[key] === "undefined" ||
      params[key] === "null" ||
      params[key] === void 0 ||
      params[key] === null ||
      params[key] === ""
    ) {
      return void 0;
    }

    return `${key}=${encodeURIComponent(params[key])}`;
  });

  const result = items.filter((t) => t !== void 0).join("&");

  return result;
}

function buildURLWithParams(url: string, params?: any) {
  if (!params) return url;
  const queryString = buildQueryString(params);

  return url + (queryString ? `?${queryString}` : "");
}

const convertError = (err: any) => {
  try {
    try {
      return "" + err.message;
    } catch (ex) {
    }
    return "" + err;
  } catch (error) {
  }
  return 'Unknow Exception'
}

export const fetchData = (url: string,
  params?: any,
  options?: RequestInit
): Promise<DataResponse<any>> => {
  return new Promise<DataResponse<any>>((resolve, reject) => {
    try {
      if (!options) {
        options = {};
      }
      options.credentials = 'include';
      const queryString = buildURLWithParams(url, params);
      fetch(queryString, options)
        .then(res => res.json())
        .then((data) => {
          if (!data) {
            return resolve({ error: -1002, message: 'Unknow Network', data: null });
          }
          if (data.error || data.error !== 0) {
            return resolve({ error: data.error, message: data.message, data: null });
          }
          if (!data.data) {
            return resolve({ error: -1003, message: 'Unknow Data', data: null });
          }
          resolve(data);
        })
        .catch((err) => {
          resolve({ error: -1001, message: convertError(err), data: null });
        })
    } catch (err) {
      resolve({ error: -1000, message: convertError(err), data: null });
    };
  });
};

export const postData = (url: string,
  params?: any,
  data?: any | null,
  options?: any
): Promise<DataResponse<any>> => {
  if (!options) {
    options = {};
  }
  if (!options.headers) {
    options.headers = {}
  }
  options.method = "POST"
  options.headers['content-type'] = 'application/json';
  options.body = JSON.stringify(data);
  return fetchData(url, params, options);
};
