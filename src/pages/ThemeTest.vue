<template>
  <v-container class="pa-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6">
          <v-card-title class="text-h4 mb-6">
            🎨 Vuetify 테마 테스트
          </v-card-title>
          
          <v-card-text>
            <h3 class="mb-4">버튼 색상 테스트</h3>
            <div class="d-flex flex-wrap gap-3 mb-6">
              <v-btn color="primary">Primary Button</v-btn>
              <v-btn color="secondary">Secondary Button</v-btn>
              <v-btn color="accent">Accent Button</v-btn>
              <v-btn color="success">Success Button</v-btn>
              <v-btn color="warning">Warning Button</v-btn>
              <v-btn color="error">Error Button</v-btn>
              <v-btn color="info">Info Button</v-btn>
            </div>

            <h3 class="mb-4">버튼 변형 테스트</h3>
            <div class="d-flex flex-wrap gap-3 mb-6">
              <v-btn color="primary" variant="flat">Flat Primary</v-btn>
              <v-btn color="primary" variant="outlined">Outlined Primary</v-btn>
              <v-btn color="primary" variant="text">Text Primary</v-btn>
              <v-btn color="primary" variant="tonal">Tonal Primary</v-btn>
            </div>

            <h3 class="mb-4">카드와 색상</h3>
            <v-row class="mb-6">
              <v-col v-for="color in colors" :key="color" cols="6" md="3">
                <v-card :color="color" class="pa-4 text-center">
                  <v-card-text>
                    <div class="text-h6">{{ color }}</div>
                    <div class="text-caption">#F5FCC8</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="mb-4">Form 컴포넌트</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="testText"
                  label="Primary Color TextField"
                  color="primary"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="testSelect"
                  :items="['옵션 1', '옵션 2', '옵션 3']"
                  label="Primary Color Select"
                  color="primary"
                  variant="outlined"
                />
              </v-col>
            </v-row>

            <h3 class="mb-4">Progress & Sliders</h3>
            <v-progress-linear
              v-model="progress"
              color="primary"
              height="8"
              rounded
              class="mb-4"
            />
            <v-slider
              v-model="sliderValue"
              color="primary"
              thumb-label
              min="0"
              max="100"
              class="mb-4"
            />

            <h3 class="mb-4">테마 전환</h3>
            <v-switch
              v-model="isDark"
              @change="toggleTheme"
              color="primary"
              label="다크 모드"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'

// 테스트 데이터
const testText = ref('')
const testSelect = ref('')
const progress = ref(65)
const sliderValue = ref(30)
const isDark = ref(false)

const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info']

// 테마 전환
const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>

