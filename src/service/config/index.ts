let BASE_URL = ''
if (import.meta.env.PROD) {
  //生产环境
  BASE_URL = '/api'
} else {
  //开发环境
  BASE_URL = '/api'
}

export const TIME_OUT = 10000
export { BASE_URL }
