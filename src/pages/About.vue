<template>
  <div class="about">
    <div class="container">
      <div class="header">
        <h1 class="title">소개 페이지</h1>
        <p class="subtitle">Jopodo 프로젝트에 대해 알아보세요</p>
      </div>
      
      <div class="content">
        <div class="info-section">
          <div class="info-card">
            <div class="icon">🚀</div>
            <h3>프로젝트 목표</h3>
            <p>혁신적이고 사용자 친화적인 웹 애플리케이션을 개발하여 더 나은 사용자 경험을 제공합니다.</p>
          </div>
          
          <div class="info-card">
            <div class="icon">⚡</div>
            <h3>기술 스택</h3>
            <ul class="tech-list">
              <li>Vue.js 3</li>
              <li>Vite</li>
              <li>JavaScript</li>
              <li>CSS3</li>
            </ul>
          </div>
          
          <div class="info-card">
            <div class="icon">🎯</div>
            <h3>핵심 특징</h3>
            <ul class="feature-list">
              <li v-for="feature in features" :key="feature" @click="highlightFeature(feature)">
                <span :class="{ highlighted: selectedFeature === feature }">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="timeline">
          <h2>프로젝트 타임라인</h2>
          <div class="timeline-container">
            <div v-for="(event, index) in timeline" :key="index" class="timeline-item">
              <div class="timeline-date">{{ event.date }}</div>
              <div class="timeline-content">
                <h4>{{ event.title }}</h4>
                <p>{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TimelineEvent {
  date: string
  title: string
  description: string
}

const selectedFeature = ref<string | null>(null)

const features = ref<string[]>([
  '반응형 디자인',
  '모던한 UI/UX',
  '빠른 로딩 속도',
  '확장 가능한 구조',
  '모바일 최적화'
])

const timeline = ref<TimelineEvent[]>([
  {
    date: '2024.01',
    title: '프로젝트 시작',
    description: '초기 설계 및 기획 단계'
  },
  {
    date: '2024.02',
    title: '개발 환경 구축',
    description: 'Vue.js + Vite 환경 설정'
  },
  {
    date: '2024.03',
    title: '기본 구조 완성',
    description: '라우팅 및 컴포넌트 구조 설계'
  },
  {
    date: '2024.04',
    title: '테스트 페이지 생성',
    description: '현재 단계 - 기본 페이지들 구현'
  }
])

const highlightFeature = (feature: string) => {
  selectedFeature.value = selectedFeature.value === feature ? null : feature
  setTimeout(() => {
    selectedFeature.value = null
  }, 2000)
}
</script>

<style scoped>
.about {
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.info-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s;
}

.info-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.info-card h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.info-card p {
  color: #666;
  line-height: 1.6;
}

.tech-list, .feature-list {
  list-style: none;
  padding: 0;
}

.tech-list li, .feature-list li {
  background: #f8f9fa;
  margin: 8px 0;
  padding: 10px 15px;
  border-radius: 25px;
  color: #495057;
  border-left: 4px solid #f093fb;
}

.feature-list li {
  cursor: pointer;
  transition: all 0.3s;
}

.feature-list li:hover {
  background: #e9ecef;
}

.highlighted {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.timeline {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.timeline h2 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.timeline-container {
  position: relative;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #f093fb, #f5576c);
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
  padding-left: 60px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 5px;
  width: 18px;
  height: 18px;
  background: #f093fb;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 0 10px rgba(240, 147, 251, 0.5);
}

.timeline-date {
  font-weight: bold;
  color: #f5576c;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.timeline-content h4 {
  color: #333;
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.timeline-content p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
  
  .info-section {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .timeline-item {
    padding-left: 50px;
  }
}
</style>
