const url = 'https://api.covid19api.com';

export function makeRequest<T = unknown>(endpoint: string, body?: object) {
  const headers = { 'content-type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  return fetch(url + endpoint, config).then(async response => {
    if (response.ok) {
      return (await response.json()) as Promise<T>;
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}
