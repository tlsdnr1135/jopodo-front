import axios from 'axios'

// axios 인스턴스 생성
const apiClient = axios.create({
  // 기본 URL 설정 (실제 API 서버 URL로 변경하세요)
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-api-server.com/api' 
    : 'http://localhost:3000/api',
  
  // 기본 타임아웃 설정 (10초)
  timeout: 10000,
  
  // 기본 헤더 설정
  headers: {
    'Content-Type': 'application/json',
  }
})

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전에 실행될 코드
    console.log('API 요청:', config.method?.toUpperCase(), config.url)
    
    // 인증 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // 응답 성공 시 실행될 코드
    console.log('API 응답:', response.status, response.config.url)
    return response
  },
  (error) => {
    // 응답 오류 시 실행될 코드
    console.error('API 오류:', error.response?.status, error.config?.url)
    
    // 401 Unauthorized 에러 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      // router.push('/login') // 필요시 라우터 사용
    }
    
    return Promise.reject(error)
  }
)

export default apiClient

// 편의 함수들
export const api = {
  get: (url: string, config?: any) => apiClient.get(url, config),
  post: (url: string, data?: any, config?: any) => apiClient.post(url, data, config),
  put: (url: string, data?: any, config?: any) => apiClient.put(url, data, config),
  delete: (url: string, config?: any) => apiClient.delete(url, config),
  patch: (url: string, data?: any, config?: any) => apiClient.patch(url, data, config),
}
