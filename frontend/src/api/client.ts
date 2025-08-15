import { RequestData } from "@/interfaces/auth";
import { getAuth } from "@/api/auth";
import { API_BASE_URL } from "@/constants/api"

export async function request({
  method,
  url,
  body,
} : RequestData): Promise<any> {
  let requestUrl = `${API_BASE_URL}/${url}`;
  if (method === 'GET') {
    const params = new URLSearchParams();

    if (body) {
      for (const key in body) {
        const value = body[key];
        if (typeof value === 'object') {
          params.append(key, JSON.stringify(value));
        } else {
          params.append(key, String(value));
        }
      }
    }

    requestUrl = `${requestUrl}?${body ? params.toString() : ''}`;
  }

  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  const isLogged = getAuth()

  if (isLogged) {
    headers['Authorization'] = `Token ${isLogged}`
  }

  console.log('oi')
  
  const response = await fetch(requestUrl,{
    method,
    headers,
    credentials: "include",
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  })
    .then(async res => {
      console.log('oi', res)
      if (!res.ok) return {success: false, data: null};
      const data = await res.json();
      return {
        success: true,
        data: data,
      };
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  return response
}