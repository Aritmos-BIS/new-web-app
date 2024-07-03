export const apiFetch = async ({ payload, method }, url) => {
  const URL = url;
  const token = localStorage.getItem('token');

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (payload) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(URL, options);
    return response.json();
  } catch (err) {
    console.error(err);
  }
};
