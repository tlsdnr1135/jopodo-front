import axios from 'axios'

// axios 인스턴스 생성
const apiClient = axios.create({
  // 기본 URL 설정 (개발환경에서는 프록시 사용)
  baseURL: process.env.NODE_ENV === 'production'
    ? 'http://210.113.57.20:8080' 
    : '',
  
  // 기본 타임아웃 설정 (10초)
  timeout: 20000,
  
  // 기본 헤더 설정
  headers: {
    'Content-Type': 'application/json',
  }
})

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
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