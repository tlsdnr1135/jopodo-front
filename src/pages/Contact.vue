<template>
  <div class="contact">
    <div class="container">
      <div class="header">
        <h1 class="title">연락처</h1>
        <p class="subtitle">궁금한 점이 있으시면 언제든 연락해주세요!</p>
      </div>
      
      <div class="content">
        <div class="contact-info">
          <div class="info-card">
            <div class="icon">📧</div>
            <h3>이메일</h3>
            <p>contact@jopodo.com</p>
            <button class="copy-btn" @click="copyToClipboard('contact@jopodo.com')">복사</button>
          </div>
          
          <div class="info-card">
            <div class="icon">📱</div>
            <h3>전화번호</h3>
            <p>02-1234-5678</p>
            <button class="copy-btn" @click="copyToClipboard('02-1234-5678')">복사</button>
          </div>
          
          <div class="info-card">
            <div class="icon">📍</div>
            <h3>주소</h3>
            <p>서울시 강남구<br>테헤란로 123길</p>
          </div>
          
          <div class="info-card">
            <div class="icon">⏰</div>
            <h3>운영시간</h3>
            <p>평일: 09:00 - 18:00<br>주말: 휴무</p>
          </div>
        </div>
        
        <div class="contact-form">
          <h2>문의하기</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">이름 *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                :class="{ error: errors.name }"
              >
              <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
            </div>
            
            <div class="form-group">
              <label for="email">이메일 *</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                :class="{ error: errors.email }"
              >
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>
            
            <div class="form-group">
              <label for="subject">제목 *</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject" 
                required
                :class="{ error: errors.subject }"
              >
              <span v-if="errors.subject" class="error-text">{{ errors.subject }}</span>
            </div>
            
            <div class="form-group">
              <label for="message">메시지 *</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                required
                :class="{ error: errors.message }"
              ></textarea>
              <span v-if="errors.message" class="error-text">{{ errors.message }}</span>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">보내기</span>
              <span v-else>전송 중...</span>
            </button>
          </form>
          
          <div v-if="submitStatus === 'success'" class="success-message">
            ✅ 메시지가 성공적으로 전송되었습니다!
          </div>
          
          <div v-if="submitStatus === 'error'" class="error-message">
            ❌ 전송 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type SubmitStatus = 'success' | 'error' | null

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref<FormErrors>({})
const isSubmitting = ref<boolean>(false)
const submitStatus = ref<SubmitStatus>(null)

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.name.trim()) {
    errors.value.name = '이름을 입력해주세요'
  }
  
  if (!form.email.trim()) {
    errors.value.email = '이메일을 입력해주세요'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = '올바른 이메일 형식을 입력해주세요'
  }
  
  if (!form.subject.trim()) {
    errors.value.subject = '제목을 입력해주세요'
  }
  
  if (!form.message.trim()) {
    errors.value.message = '메시지를 입력해주세요'
  } else if (form.message.trim().length < 10) {
    errors.value.message = '메시지는 최소 10자 이상 입력해주세요'
  }
  
  return Object.keys(errors.value).length === 0
}

const submitForm = async (): Promise<void> => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    // 실제로는 API 호출을 하겠지만, 테스트용으로 setTimeout 사용
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('폼 데이터:', form)
    
    submitStatus.value = 'success'
    resetForm()
  } catch (error) {
    console.error('전송 오류:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    
    // 3초 후 상태 메시지 제거
    setTimeout(() => {
      submitStatus.value = null
    }, 3000)
  }
}

const resetForm = (): void => {
  Object.assign(form, {
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  errors.value = {}
}

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    alert(`클립보드에 복사되었습니다: ${text}`)
  } catch (error) {
    console.error('복사 실패:', error)
    alert('복사에 실패했습니다')
  }
}
</script>

<style scoped>
.contact {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 50px;
}

.title {
  font-size: 3rem;
  color: white;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.9);
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s;
}

.info-card:hover {
  transform: translateY(-3px);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.info-card h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.info-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.copy-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.copy-btn:hover {
  background: #5a67d8;
}

.contact-form {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.contact-form h2 {
  color: #333;
  margin-bottom: 25px;
  font-size: 1.8rem;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e53e3e;
}

.error-text {
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message,
.error-message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.success-message {
  background: #f0fff4;
  color: #38a169;
  border: 1px solid #c6f6d5;
}

.error-message {
  background: #fed7d7;
  color: #e53e3e;
  border: 1px solid #feb2b2;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2rem;
  }
}
</style>
