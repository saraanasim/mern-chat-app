'use server';
import { cookies } from 'next/headers';
import { HTTP_METHODS, SERVER_BASE_URL } from './constants';
import { HeadersType } from './types';

const fetchCookieToken = () => {
  const auth = cookies().get('auth');
  if (!auth) console.error('Auth cookie not found');
  return auth?.value;
};

export const sendRequest = async (
  method: HTTP_METHODS,
  path: string,
  data?: any,
) => {
  try {
    const headers: HeadersType = {
        Authorization: fetchCookieToken() as string,
        'Content-Type':'application/json'
      };

    const requestOptions: RequestInit = {
      method: method,
      headers: headers,
      cache: 'no-store',
      body:JSON.stringify(data)
    };

    const res = await fetch(`${SERVER_BASE_URL}${path}`, requestOptions);
    return await res.json();

  } catch (error) {
    throw error;
  }
};