<script setup lang="ts">
import {onMounted, ref} from 'vue'
import orderService from "@/services/orderService.ts";
import {ca} from "vuetify/locale";
const tab = ref(1)

const items = [
  {text: '유재경' , value: 1},
  {text: '조윤혁' , value: 2},
  {text: '조유나' , value: 3},
  {text: '조용준' , value: 4}
]
// 표 데이터 포맷
const response = ref([{}])
const isDetail = ref(false)
const selectedItem = ref<any>(null)
const loading = ref(false)
const modalResponse = ref()

const changeHandle = async () => {
  try {
    loading.value = true
    const data = await orderService.searchOrderDetails(tab.value)
    response.value = data.data.data
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const viewDetail = async (item: any) => {
  console.log('자세히보기 클릭:', item)
  const data = await orderService.searchDetails(1)
  modalResponse.value = data.data.data
  try{

  }catch(err){
    console.log(err)
  }

  selectedItem.value = item
  isDetail.value = true
}

onMounted(async ()=>{
  await changeHandle()
})
</script>

<template>
  <div class="home">
    <!-- 브랜드 이미지 -->
    <div class="brand-image">
      <div style="font-size: 43px; color: #7E9509; font-weight: 700">샤인머스켓</div>
      <div style="font-size: 43px; color: #4B4B4B; font-weight: 700">관리자 페이지</div>
    </div>

    <!-- 주문폼 -->
    <div class="order-form-section">
      <v-tabs
          v-model="tab"
          height="30px"
          color="#7E9509"
          fixed-tabs
          class="custom-tabs"
          @click="changeHandle"
      >
        <v-tab
            v-for="item in items"
            :key="item.value"
            :text="item.text"
            :value="item.value"

        ></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item
            v-for="item in items"
            :key="item.value"
            :value="item.value"
        >
          <v-data-table-server
              :items="response"
              :items-length="response.length"
              :loading="loading"
              hide-default-header
              hide-default-footer
              class="mobile-table"
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td class="table-cell">{{ index + 1 }}</td>
                <td class="table-cell">{{ (item as any)?.eater || '-' }}</td>
                <td class="table-cell">
                   <v-select
                       v-model="(item as any).orderStatus"
                       :items="[
                         {text: '입금전' , value: 'AWAITING_PAYMENT'},
                         {text: '입금완료' , value: 'PAYMENT_COMPLETE'},
                         {text: '배송중' , value: 'SHIPPING'},
                         {text: '배송완료' , value: 'DELIVERED'},
                         {text: '주문취소' , value: 'CANCELED'},
                       ]"
                       item-title="text"
                       item-value="value"
                       variant="outlined"
                       density="compact"
                       size="x-small"
                       class="table-select"
                       hide-details
                       style="max-width: 90px; width: 90px; margin: 0 auto;"
                       :menu-props="{ 
                         maxWidth: 90,
                         minWidth: 70,
                         width: 80
                       }"
                   />
                </td>
                <td class="table-cell">
                  <v-btn
                      size="small"
                      color="#7E9509"
                      variant="elevated"
                      class="detail-btn"
                      @click="viewDetail(item)"
                  >
                    자세히보기
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table-server>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
  <!-- 자세히보기 -->
  <v-dialog 
    v-model="isDetail" 
    max-width="380" 
    width="85%" 
    :fullscreen="false"
    persistent
    class="detail-dialog"
  >
    <v-card class="detail-card">
      <v-card-title class="detail-header">
        <span class="detail-title">주문 내역</span>
        <v-btn 
          icon 
          size="small" 
          variant="text"
          @click="isDetail = false"
          class="close-btn"
        >
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <v-card-text class="detail-content">
        <div v-if="selectedItem" class="detail-fields">
          <div class="detail-row">
            <div class="detail-label">보내는이 이름</div>
            <div class="detail-value">{{ modalResponse?.customerName || '선물용도 아님!!' }}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">선택 상품</div>
            <div class="detail-value">{{ modalResponse?.productName }} - {{modalResponse?.productPrice }} 개</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">받는이 이름</div>
            <div class="detail-value">{{ modalResponse?.eater || '-' }}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">받는이 연락처</div>
            <div class="detail-value">{{ modalResponse?.customerPhoneNum || '-' }}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">받는이 주소</div>
            <div class="detail-value">{{ modalResponse?.customerAddress || '-' }}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">추천인</div>
            <div class="detail-value">{{ modalResponse?.recommenderName || '-' }}</div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.home {
  background-color: #f8f9fa;
  min-height: 100vh;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

/* 브랜드 이미지 */
.brand-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F5FCC8;
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
  background: white;
  margin: 0;
  width: 100%;
  overflow-x: hidden;
  padding: 0 10px;
}

/* 탭 너비 제한 */
.custom-tabs :deep(.v-tab) {
  max-width: 80px !important;
  min-width: 40px !important;
  width: 60px !important;
  flex: 0 0 60px !important;
  padding: 0 8px !important;
}

.custom-tabs :deep(.v-tabs--fixed-tabs .v-tab) {
  max-width: 80px !important;
  width: 80px !important;
}

.custom-tabs :deep(.v-slide-group__content) {
  justify-content: center !important;
}

/* 탭 콘텐츠 */
.tab-content {
  padding: 20px;
  text-align: center;
  color: #2c5234;
  font-size: 16px;
  font-weight: 500;
}

/* 작은 페이지네이션 */
.pagination-small {
  padding: 10px;
}

:deep(.pagination-small .v-pagination__item) {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  font-size: 12px !important;
}

:deep(.pagination-small .v-btn) {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  font-size: 12px !important;
}

/* 모바일 친화적 테이블 스타일 */
.mobile-table {
  width: 100% !important;
  max-width: 100% !important;
  overflow-x: hidden !important;
}

:deep(.mobile-table .v-table) {
  width: 100% !important;
  table-layout: fixed !important;
}

:deep(.mobile-table .v-data-table__td) {
  padding: 8px 4px !important;
  font-size: 12px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  word-break: break-all !important;
}

:deep(.mobile-table .v-data-table__tr) {
  height: auto !important;
  min-height: 36px !important;
}

/* 각 컬럼 너비 비율로 조정 */
:deep(.mobile-table .v-data-table__td:nth-child(1)) {
  width: 15% !important;
  max-width: 15% !important;
}

:deep(.mobile-table .v-data-table__td:nth-child(2)) {
  width: 25% !important;
  max-width: 25% !important;
}

:deep(.mobile-table .v-data-table__td:nth-child(3)) {
  width: 35% !important;
  max-width: 35% !important;
}

:deep(.mobile-table .v-data-table__td:nth-child(4)) {
  width: 25% !important;
  max-width: 25% !important;
}

/* 테이블 셀 스타일 */
.table-cell {
  padding: 12px 8px !important;
  font-size: 13px !important;
  border-bottom: 1px solid #e0e0e0 !important;
  vertical-align: middle !important;
  text-align: center !important;
}

/* 자세히보기 버튼 */
.detail-btn {
  font-size: 11px !important;
  height: 28px !important;
  min-width: 60px !important;
  border-radius: 6px !important;
  font-weight: 500 !important;
}

/* 테이블 행 호버 효과 */
:deep(.mobile-table tr:hover) {
  background-color: #f5f5f5 !important;
}

/* 테이블 내 셀렉트박스 스타일 */
.table-select {
  max-width: 100px !important;
  min-height: 28px !important;
  width: 100px !important;
  margin: 0 auto !important;
}

:deep(.table-select .v-field) {
  min-height: 28px !important;
  font-size: 11px !important;
  max-width: 100px !important;
}

:deep(.table-select .v-field__input) {
  min-height: 28px !important;
  padding: 2px 6px !important;
  font-size: 11px !important;
  text-align: center !important;
}

:deep(.table-select .v-field__outline) {
  --v-field-border-width: 1px !important;
}

:deep(.table-select .v-select__selection) {
  font-size: 11px !important;
  text-align: center !important;
  justify-content: center !important;
}

:deep(.table-select .v-input__control) {
  min-height: 28px !important;
}

:deep(.table-select .v-field__append-inner) {
  padding: 0 2px !important;
}

/* 셀렉트박스 드롭다운 메뉴 크기 조정 - 강력한 선택자 */

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

  /* 모바일에서 테이블 셀과 버튼 크기 조정 */
  .table-cell {
    padding: 8px 4px !important;
    font-size: 11px !important;
  }

  .detail-btn {
    font-size: 10px !important;
    height: 24px !important;
    min-width: 50px !important;
    padding: 0 6px !important;
  }

  /* 모바일에서 셀렉트박스 더 작게 */
  .table-select {
    max-width: 80px !important;
    min-height: 28px !important;
  }

  :deep(.table-select .v-field) {
    min-height: 28px !important;
    font-size: 11px !important;
  }

  :deep(.table-select .v-field__input) {
    min-height: 28px !important;
    padding: 2px 6px !important;
    font-size: 11px !important;
  }

  :deep(.table-select .v-select__selection) {
    font-size: 11px !important;
  }

  /* 모바일에서 드롭다운 메뉴 더 작게 */
  :deep(.table-select-menu .v-list) {
    min-width: 100px !important;
    max-width: 120px !important;
  }

  :deep(.table-select-menu .v-list-item) {
    min-height: 32px !important;
    padding: 2px 8px !important;
    font-size: 11px !important;
  }

  :deep(.table-select-menu .v-list-item__content) {
    font-size: 11px !important;
  }

  :deep(.table-select-menu .v-list-item-title) {
    font-size: 11px !important;
    line-height: 1.1 !important;
  }
}

/* 상세보기 모달 스타일 */
.detail-card {
  background-color: white !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  width: 100% !important;
  max-width: 400px !important;
  min-width: 300px !important;
}

.detail-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 16px 20px 12px !important;
  border-bottom: 1px solid #e0e0e0 !important;
  min-height: 60px !important;
}

.detail-title {
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #333 !important;
  white-space: nowrap !important;
}

.close-btn {
  margin-left: auto !important;
  color: #666 !important;
  flex-shrink: 0 !important;
}

.detail-content {
  padding: 20px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

.detail-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.detail-row {
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
}

.detail-label {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
  white-space: nowrap;
}

.detail-value {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  padding-left: 4px;
  word-wrap: break-word;
  white-space: pre-line;
  width: 100%;
}

/* 모바일 모달 스타일 */
@media (max-width: 600px) {
  .detail-card {
    margin: 0 auto !important;
    max-width: calc(100vw - 30px) !important;
    min-width: calc(100vw - 30px) !important;
    width: calc(100vw - 30px) !important;
  }
  
  .detail-header {
    padding: 12px 16px 8px !important;
    min-height: 50px !important;
  }
  
  .detail-title {
    font-size: 16px !important;
  }
  
  .detail-content {
    padding: 16px !important;
  }
  
  .detail-row {
    padding: 10px;
  }
  
  .detail-label {
    font-size: 11px;
    padding: 3px 6px;
  }
  
  .detail-value {
    font-size: 13px;
    padding-left: 2px;
  }
}
</style>

<style>
/* 전역 Vuetify 셀렉트박스 드롭다운 스타일 */
.v-overlay .v-list {
  min-width: 80px !important;
  max-width: 100px !important;
  width: 90px !important;
}

.v-overlay .v-list-item {
  min-height: 24px !important;
  padding: 2px 6px !important;
  font-size: 10px !important;
}

.v-overlay .v-list-item__content {
  font-size: 10px !important;
}

.v-overlay .v-list-item-title {
  font-size: 10px !important;
  line-height: 1.1 !important;
  text-align: center !important;
}

.v-overlay__content {
  min-width: 80px !important;
  max-width: 100px !important;
  width: 90px !important;
}

/* 모든 v-select 스타일 강제 적용 */
.v-select .v-field {
  max-width: 100px !important;
}

.v-select .v-input__control {
  max-width: 100px !important;
}

/* 상세 모달 완전한 가운데 정렬 */
.detail-dialog .v-overlay__scrim {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.detail-dialog .v-overlay__content-container {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  height: 100% !important;
}

@media (max-width: 600px) {
  .detail-dialog .v-overlay__scrim {
    padding: 15px !important;
  }
  
  .detail-dialog .v-overlay__content-container {
    padding: 15px !important;
  }
}

/* 다이얼로그 전체 스타일 */
.detail-dialog .v-overlay__content {
  margin: 15px auto !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.detail-dialog .v-overlay {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

/* 모바일 다이얼로그 오버라이드 */
@media (max-width: 600px) {
  .detail-dialog {
    margin: 0 !important;
  }
  
  .detail-dialog .v-overlay__content {
    margin: 15px auto !important;
    max-width: calc(100vw - 30px) !important;
    width: calc(100vw - 30px) !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
}
</style>
