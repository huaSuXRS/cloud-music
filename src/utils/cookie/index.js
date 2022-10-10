export const setCookie = (COOKIE) => {
  localStorage.setItem('COOKIE', COOKIE)
}

export const getCookie = () => {
  return localStorage.getItem('COOKIE')
}

export const removeCookie = () => {
  localStorage.removeItem('COOKIE')
}
