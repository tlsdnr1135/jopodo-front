import apiClient from '@/utils/axios'

// 주문 폼 데이터 타입 정의
export interface OrderFormData {
  orderItems: {
    productId: number
    quantity: number
  }[], // 상품 배열
  customerName: string, // 받는이 이름 (구매자)
  customerPhoneNum: string, // 받는이 연락처
  customerAddress: string, // 주소
  recommenderId: number, // 추천인 (문자열)
  eater: string, // 보내는이
}

// 주문 관련 API 서비스
export const orderService = {
  // 주문 생성
  createOrder: async (orderData: OrderFormData) => {
    return await apiClient.post('/jopodo/orders', orderData)
  },
  // 추천인별로 주문 조회
  searchOrderDetails: async (userId: number ) => {
    return await apiClient.get('/jopodo/orders', {
      params: { userId }
    })
  },
  // 주문 상세 조회
  searchDetails: async (userId: number ) => {
    return await apiClient.get(`/jopodo/orders/${userId}`)
  },
}

export default orderService

