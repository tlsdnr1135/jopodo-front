<script setup lang="ts">
import { ref } from 'vue'
const tab = ref('Appetizers')

const items = [
  '남신욱',
  '윤원준',
  '조유나',
  '김범수',
]
const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
    iron: '0',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
    iron: '6',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16,
    carbs: 23,
    protein: 6,
    iron: '7',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
    iron: '16',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
    iron: '1',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25,
    carbs: 51,
    protein: 4.9,
    iron: '22',
  },
]
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
      >
        <v-tab
            v-for="item in items"
            :key="item"
            :text="item"
            :value="item"
        ></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item
            v-for="item in items"
            :key="item"
            :value="item"
        >
          <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items="items"
              :items-length="items.length"
              :loading="loading"
              :search="search"
              item-value="name"
              @update:options="loadItems"
          ></v-data-table-server>
        </v-tabs-window-item>
      </v-tabs-window>
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
