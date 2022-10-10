export const setMusic = (MUSIC) => {
  localStorage.setItem('MUSIC', MUSIC)
}

export const getMusic = () => {
  return localStorage.getItem('MUSIC')
}
