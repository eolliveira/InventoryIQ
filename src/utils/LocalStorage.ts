type LoginResponse = {
    token: string
};

const tokenKey = 'authData';

export function saveAuthData(obj: LoginResponse) {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
}

export function getAuthData() {
  return JSON.parse(localStorage.getItem(tokenKey) ?? '{}') as LoginResponse;
}

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};
