import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

const getPosts = async (page, limit) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}/posts?_sort=id&_order=desc&_page=${page}&_limit=${limit}`);
  } catch (err) {
    return err;
  }

  const count = Number(response.headers.get('X-Total-Count'));
  const data = await response.json();
  return [count, data];
};

const getOnePost = async (id) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}/posts?id=${id}`);
  } catch (err) {
    return err;
  }

  const data = await response.json();
  return data;
};

const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  const data = await response.json();
  return data;
};

const register = async (nickname, username, password) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nickname,
        username,
        password
      })
    });
  } catch (err) {
    return err;
  }

  const data = response.json();
  return data;
};

const post = async (title, body) => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    })
  });
  const data = await response.json();
  return data;
}

const getMe = async () => {
  const token = getAuthToken();
  if (!token) return;

  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
};


export { getPosts, getOnePost, login, getMe, register, post };