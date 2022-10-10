// 用于存储音乐ids
export const setMusicList = (MUSICLIST) => {
  localStorage.setItem('MUSICLIST', MUSICLIST)
}

// 用于获取ids
export const getMusicList = () => {
  return localStorage.getItem('MUSICLIST')
}

// 用于移除ids
export const removeMusicList = () => {
  localStorage.removeItem('MUSICLIST')
}
