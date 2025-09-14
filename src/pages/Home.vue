<script setup lang="ts">
import { ref } from 'vue'
import firstImageSvg from '@/assets/image/firstImage.svg'
import secondImageSvg from '@/assets/image/secondImage.svg'
import thirdImageSvg from '@/assets/image/thirdImage.svg'
import kakaoTalkSvg from '@/assets/image/kakaoTalk.svg'

// 주문 폼 데이터
const orderForm = ref({
  selectedProducts: '예시) 1번 2개, 2번 1개',
  recipientName: '',
  recipientPhone: '',
  recipientAddress: '',
  recommender: '',
  senderName: ''
})

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
      <img :src="firstImageSvg" alt="조씨네 샤인머스켓 - 첫번째" class="brand-image-item" />
      <img :src="secondImageSvg" alt="조씨네 샤인머스켓 - 두번째" class="brand-image-item" />
      <img :src="thirdImageSvg" alt="조씨네 샤인머스켓 - 세번째" class="brand-image-item" />
    </div>

    <!-- 주문폼 -->
    <div class="order-form-section">
      <h2 class="section-title">주문하기</h2>
      
      <div class="form-container">
        <!-- 선택 상품 -->
        <div class="form-row">
          <label class="form-label">선택 상품</label>
          <v-text-field
            v-model="orderForm.selectedProducts"
            placeholder="예시) 1번 2개, 2번 1개"
            variant="outlined"
            density="compact"
            class="form-input"
            hide-details
          />
        </div>

        <!-- 받는이 이름 -->
        <div class="form-row">
          <label class="form-label">받는이 이름</label>
          <v-text-field
            v-model="orderForm.recipientName"
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
            v-model="orderForm.recipientPhone"
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
            v-model="orderForm.recipientAddress"
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
          <v-text-field
            v-model="orderForm.recommender"
            placeholder="추천인 이름을 입력해주세요."
            variant="outlined"
            density="compact"
            class="form-input"
            hide-details
          />
        </div>

         <!-- 보내는이 이름 -->
         <div class="form-row form-row-separated">
           <label class="form-label">보내는이 이름</label>
          <v-text-field
            v-model="orderForm.senderName"
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
          >
            주문하기
          </v-btn>
        </div>
      </div>

      <!-- 입금 계좌번호 -->
      <div class="account-section">
        <h3 class="account-title">입금 계좌번호</h3>
        <div class="account-info">
          <div class="account-details">
            <span>농협 351 0367 8557 33 조동순</span>
            <v-btn size="small" color="success" class="confirm-btn">복사</v-btn>
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


/* 모바일 반응형 */
@media (max-width: 600px) {
  
  .section-title {
    font-size: 20px;
  }
  
  .order-form-section,
  .product-section,
  .order-method-section {
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
}
</style>
