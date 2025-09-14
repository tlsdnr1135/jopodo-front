import { api } from '@/utils/axios'

// 주문 폼 데이터 타입 정의
export interface OrderFormData {
  selectedProducts: string
  recipientName: string
  recipientPhone: string
  recipientAddress: string
  recommender: string
  senderName: string
}

// 주문 관련 API 서비스
export const orderService = {
  // 주문 생성
  createOrder: async (orderData: OrderFormData) => {
    try {
      const response = await api.post('/orders', orderData)
      return response.data
    } catch (error) {
      console.error('주문 생성 실패:', error)
      throw error
    }
  },

  // 주문 목록 조회
  getOrders: async () => {
    try {
      const response = await api.get('/orders')
      return response.data
    } catch (error) {
      console.error('주문 목록 조회 실패:', error)
      throw error
    }
  },

  // 특정 주문 조회
  getOrder: async (orderId: string) => {
    try {
      const response = await api.get(`/orders/${orderId}`)
      return response.data
    } catch (error) {
      console.error('주문 조회 실패:', error)
      throw error
    }
  },

  // 주문 수정
  updateOrder: async (orderId: string, orderData: Partial<OrderFormData>) => {
    try {
      const response = await api.put(`/orders/${orderId}`, orderData)
      return response.data
    } catch (error) {
      console.error('주문 수정 실패:', error)
      throw error
    }
  },

  // 주문 삭제
  deleteOrder: async (orderId: string) => {
    try {
      const response = await api.delete(`/orders/${orderId}`)
      return response.data
    } catch (error) {
      console.error('주문 삭제 실패:', error)
      throw error
    }
  },

  // 카카오톡 메시지 전송
  sendKakaoMessage: async (orderData: OrderFormData) => {
    try {
      const response = await api.post('/kakao/send-message', orderData)
      return response.data
    } catch (error) {
      console.error('카카오톡 메시지 전송 실패:', error)
      throw error
    }
  }
}

export default orderService
