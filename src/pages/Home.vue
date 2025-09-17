<script setup lang="ts">
import { ref } from 'vue'
import kakaoTalkSvg from '@/assets/image/kakaoTalk.svg'
import { orderService } from '@/services/orderService'

const firstProductCount = ref()
const secondProductCount = ref()
const eater = ref() // 받는이 이름
const customerPhoneNum = ref()
const customerAddress = ref()
const recommenderId = ref()
const customerName = ref()

const orderCompleteDialog = ref<boolean>(false)

// 로딩 상태
const isLoading = ref(false)

// 주문하기 함수
const submitOrder = async () => {

  if (!eater.value || eater.value.trim() === '') {
    alert('받는이 이름을 입력해주세요.')
    return
  }

  if (!customerPhoneNum.value || customerPhoneNum.value.trim() === '') {
    alert('받는이 연락처를 입력해주세요.')
    return
  }

  if (!customerAddress.value || customerAddress.value.trim() === '') {
    alert('받는이 주소를 입력해주세요.')
    return
  }

  if (!firstProductCount.value && !secondProductCount.value) {
    alert('주문할 상품을 선택해주세요.')
    return
  }

  if (!recommenderId.value) {
    alert('추천인을 선택해주세요.')
    return
  }

  try {

    const productIds = []
    if (firstProductCount.value && firstProductCount.value > 0) {
      productIds.push({ productId: 1, quantity: firstProductCount.value })
    }
    if (secondProductCount.value && secondProductCount.value > 0) {
      productIds.push({ productId: 2, quantity: secondProductCount.value })
    }

    const request = {
      orderItems: productIds, // 상품
      customerName: customerName.value, // 받는이 이름 (구매자)
      customerPhoneNum: customerPhoneNum.value, // 받는이 연락처
      customerAddress: customerAddress.value, // 주소
      recommenderId: recommenderId.value, // 추천인
      eater: eater.value, // 보내는이
    }

    const result = await orderService.createOrder(request)
    console.log('주문 결과:', result)
    orderCompleteDialog.value = true

  } catch (error) {
    console.error('주문 처리 중 오류:', error)
    alert('주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
  } finally {
  }
}

// 계좌번호 복사 함수
const copyAccountNumber = async () => {
  const accountNumber = '농협 351 0367 8557 33 조동순'
  try {
    await navigator.clipboard.writeText(accountNumber)
    alert('계좌번호가 복사되었습니다!')
  } catch (error) {
    console.error('복사 실패:', error)
    alert('복사 기능을 지원하지 않는 브라우저입니다.')
  }
}

// 문의 링크 함수들
const openKakaoTalk = () => {
  // 카카오톡 문의 링크 (실제 운영시에는 카카오톡 오픈채팅방 링크 등으로 변경)
  window.open('https://open.kakao.com/o/sOZwi6Rh', '_blank')
}

</script>

<template>
  <div class="home">
    <!-- 브랜드 이미지 -->
    <div class="brand-image">
      <img width="590" height="1151" alt="1111111111111111" src="https://github.com/user-attachments/assets/433a2819-4d30-4fbc-8687-3648d786eb44" />
      <img width="393" height="1013" alt="222222222222222222" src="https://github.com/user-attachments/assets/12e66293-1ea5-4237-83c6-291b6d63276b" />
      <img width="393" height="626" alt="3333333333333333333" src="https://github.com/user-attachments/assets/669fb970-f45d-4e09-8ec4-c8621adfce84" />
    </div>

    <!-- 주문폼 -->
    <div class="order-form-section">
      <h2 class="section-title">주문하기</h2>

      <div class="form-container">
        <!-- 선택 상품 -->
        <div class="form-row">
          <label class="form-label">상품 1번</label>
          <v-text-field
            v-model="firstProductCount"
            placeholder="구매할 숫자만 입력"
            variant="outlined"
            density="compact"
            class="form-input"
            hide-details
            type="number"
            oninput="javascript: this.value = this.value.replace(/\D/g, '');"
          />
          <label>개</label>
        </div>
        <!-- 선택 상품 -->
        <div class="form-row">
          <label class="form-label">상품 2번</label>
          <v-text-field
              v-model="secondProductCount"
              placeholder="구매할 숫자만 입력"
              variant="outlined"
              density="compact"
              class="form-input"
              hide-details
              type="number"
              oninput="javascript: this.value = this.value.replace(/\D/g, '');"
          />
          <label>개</label>
        </div>

        <!-- 받는이 이름 -->
        <div class="form-row">
          <label class="form-label">받는이 이름</label>
          <v-text-field
            v-model="eater"
            placeholder="받는이 이름"
            variant="outlined"
            density="compact"
            class="form-input"
            hide-details
          />
        </div>

        <!-- 받는이 연락처 -->
        <div class="form-row">
          <label class="form-label">받는이 연락처</label>
          <v-text-field
            v-model="customerPhoneNum"
            placeholder="010-1234-5678"
            variant="outlined"
            density="compact"
            type="tel"
            class="form-input"
            hide-details
          />
        </div>

        <!-- 받는이 주소 -->
        <div class="form-row">
          <label class="form-label">받는이 주소</label>
          <v-text-field
            v-model="customerAddress"
            placeholder="○○시 ○○구 ○○동"
            variant="outlined"
            density="compact"
            class="form-input"
            hide-details
          />
        </div>

        <!-- 추천인 -->
        <div class="form-row">
          <label class="form-label">추천인</label>
          <v-select
            v-model="recommenderId"
            :items="[
              {text: '유재경' , value: 1},
              {text: '조윤혁' , value: 2},
              {text: '조유나' , value: 3},
              {text: '조용준' , value: 4},
            ]"
            item-title="text"
            item-value="value"
            variant="outlined"
            density="compact"
            class="form-input"
            hide-details
            placeholder="추천인을 선택해주세요"
          />
        </div>

         <!-- 보내는이 이름 -->
         <div class="form-row form-row-separated">
           <label class="form-label">보내는이 이름</label>
            <v-text-field
              v-model="customerName"
              placeholder="선물로 경우, 꼭 입력해주세요."
              variant="outlined"
              density="compact"
              class="form-input"
              hide-details
            />
        </div>

        <!-- 주문하기 버튼 -->
        <div class="order-button-container">
          <v-btn
            class="order-button"
            size="large"
            color="#7E9509"
            block
            :loading="isLoading"
            :disabled="isLoading"
            @click="submitOrder"
          >
            {{ isLoading ? '주문 처리중...' : '주문하기' }}
          </v-btn>
        </div>
      </div>

      <!-- 입금 계좌번호 -->
      <div class="account-section">
        <h3 class="account-title">입금 계좌번호</h3>
        <div class="account-info">
          <div class="account-details">
            <span>농협 351 0367 8557 33 조동순</span>
            <v-btn size="small" color="success" class="confirm-btn" @click="copyAccountNumber">복사</v-btn>
          </div>
        </div>
      </div>

      <!-- 문의 버튼들 -->
      <div class="contact-buttons">
        <img
          :src="kakaoTalkSvg"
          alt="카카오톡 문의"
          class="contact-image kakao-image"
          @click="openKakaoTalk"
        />
      </div>
    </div>
  </div>
  <!-- 주문 완료 다이얼로그 -->
  <v-dialog v-model="orderCompleteDialog" max-width="300" width="75%" persistent>
    <v-card class="order-complete-card">
      <v-btn
        icon="mdi-close"
        variant="text"
        class="close-btn"
        @click="orderCompleteDialog = false"
      ></v-btn>

      <v-card-text class="text-center pa-6">
        <div class="check-icon-container">
          <v-icon color="#4CAF50" size="56">mdi-check-circle</v-icon>
        </div>

        <h2 class="order-complete-title mt-4 mb-4">주문이 접수되었어요!</h2>

        <div class="order-complete-message">
          <p class="message-text">주말 제외, 주문 이후</p>
          <p class="message-text">배송이 시작해요</p>
          <p class="delivery-info">(2-3일 이내 도착 예정)</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.home {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 브랜드 이미지 */
.brand-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 100%);
  padding: 20px;
}

.brand-image-item {
  max-width: 100%;
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
}

/* 섹션 공통 스타일 */
.section-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #2c5234;
}

/* 주문폼 섹션 */
.order-form-section {
  background: linear-gradient(180deg, #f5f7c4 0%, #e8f0a6 100%);
  padding: 30px 20px;
  margin: 0;
  width: 100%;
}

.form-container {
  max-width: 400px;
  margin: 0 auto 30px;
}

/* 폼 행 - 라벨과 인풋이 같은 라인 */
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

.form-label {
  min-width: 80px;
  font-weight: bold;
  color: #2c5234;
  font-size: 14px;
  text-align: left;
  flex-shrink: 0;
}

.form-row-separated {
  border-top: 1px solid rgba(44, 82, 52, 0.3);
  padding-top: 15px;
  margin-top: 15px;
}

.form-input {
  flex: 1;
}

.form-input :deep(.v-field__input) {
  padding: 8px 12px;
  font-size: 14px;
}

.form-input :deep(.v-field) {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
}

/* 입금 계좌번호 */
.account-section {
  margin: 30px auto;
  max-width: 400px;
  text-align: center;
}

.account-title {
  margin-bottom: 15px;
  color: #2c5234;
  font-size: 16px;
  font-weight: bold;
  background: transparent;
}

.account-info {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
}

.account-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.account-details span {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
}

.confirm-btn {
  background-color: #C1C1C1 !important;
  color: white !important;
  border-radius: 20px;
  font-weight: bold;
  padding: 0 20px;
}

/* 주문하기 버튼 */
.order-button-container {
  margin-top: 25px;
  margin-bottom: 5px;
}

.order-button {
  background-color: #7E9509 !important;
  color: white !important;
  font-weight: bold;
  font-size: 16px !important;
  border-radius: 12px;
  height: 48px !important;
  text-transform: none !important;
  box-shadow: 0 4px 8px rgba(126, 149, 9, 0.3) !important;
}

/* 문의 버튼들 */
.contact-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 30px auto 0;
  max-width: 400px;
  width: 100%;
  flex-wrap: wrap;
}

.contact-image {
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.contact-image:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.contact-image:active {
  transform: scale(0.95);
}

.kakao-image {
  width: 400px;
  height: auto;
}

/* 주문 완료 다이얼로그 스타일 */
.order-complete-card {
  border-radius: 16px !important;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  max-width: 350px !important;
  width: 100% !important;
}

.close-btn {
  position: absolute !important;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 32px !important;
  height: 32px !important;
}

.check-icon-container {
  margin: 16px 0 12px;
}

.order-complete-title {
  color: #333;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
}

.order-complete-message {
  margin-top: 16px;
}

.message-text {
  color: #666;
  font-size: 15px;
  line-height: 1.4;
  margin: 2px 0;
  white-space: nowrap;
}

.delivery-info {
  color: #999;
  font-size: 13px;
  margin-top: 6px;
  white-space: nowrap;
}


/* 모바일 반응형 */
@media (max-width: 600px) {
  
  .section-title {
    font-size: 20px;
  }
  
  .order-form-section {
    padding: 20px 15px;
  }

  /* 모바일에서도 폼 행 스타일을 가로로 유지 */
  .form-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .form-row-separated {
    border-top: 1px solid rgba(44, 82, 52, 0.3);
    padding-top: 15px;
    margin-top: 15px;
  }

  .form-label {
    min-width: 70px;
    font-size: 13px;
  }

  .form-input {
    flex: 1;
  }

  .contact-buttons {
    gap: 10px;
    justify-content: center;
    max-width: calc(100% - 30px);
    margin: 30px 15px 0;
  }

  .contact-image {
    height: 35px;
  }

  .kakao-image {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  .account-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  
  .account-details span {
    font-size: 13px;
    flex: 1;
    text-align: left;
  }

  /* 모바일 주문 완료 모달 */
  .order-complete-card {
    max-width: calc(100vw - 30px) !important;
    width: calc(100vw - 30px) !important;
    margin: 15px auto !important;
  }

  .order-complete-card .v-card-text {
    padding: 20px 16px !important;
  }

  .close-btn {
    top: 8px !important;
    right: 8px !important;
    width: 28px !important;
    height: 28px !important;
  }

  .check-icon-container {
    margin: 12px 0 8px;
  }

  .check-icon-container .v-icon {
    font-size: 48px !important;
  }

  .order-complete-title {
    font-size: 18px !important;
    margin-bottom: 12px !important;
  }

  .order-complete-message {
    margin-top: 12px;
  }

  .message-text {
    font-size: 14px !important;
  }

  .delivery-info {
    font-size: 12px !important;
  }
}
</style>

<style>
/* 주문 완료 다이얼로그 전역 스타일 */
@media (max-width: 600px) {
  .v-overlay__content:has(.order-complete-card) {
    margin: 15px !important;
    max-width: calc(100vw - 30px) !important;
    width: calc(100vw - 30px) !important;
  }
}
</style>
