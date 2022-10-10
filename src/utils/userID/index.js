// 存储用户信息到本地

export const setUserID = (USERID) => {
  localStorage.setItem('USERID', USERID)
}

export const getUserID = () => {
  return localStorage.getItem('USERID')
}

export const removeUserID = () => {
  localStorage.removeItem('USERID')
}
