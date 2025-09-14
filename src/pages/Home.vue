<template>
  <div class="home">
    <div class="container">
      <h1 class="title">홈 페이지</h1>
      <p class="subtitle">테스트용 홈페이지입니다</p>
      
      <div class="content">
        <div class="card">
          <h2>환영합니다! 👋</h2>
          <p>이곳은 Jopodo 프로젝트의 메인 페이지입니다.</p>
          <button class="btn" @click="showMessage">클릭해보세요</button>
        </div>
        
        <div class="stats">
          <div class="stat-item">
            <h3>방문자 수</h3>
            <p>{{ visitorCount }}</p>
          </div>
          <div class="stat-item">
            <h3>현재 시간</h3>
            <p>{{ currentTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visitorCount = ref(1234)
const currentTime = ref(new Date().toLocaleString('ko-KR'))

const showMessage = () => {
  alert('홈페이지 버튼이 클릭되었습니다! 🎉')
}

onMounted(() => {
  // 1초마다 현재 시간 업데이트
  setInterval(() => {
    currentTime.value = new Date().toLocaleString('ko-KR')
  }, 1000)
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  max-width: 800px;
  width: 100%;
}

.title {
  font-size: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.8);
  text-align: center;
  margin-bottom: 40px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
}

.card h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.card p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

.stats {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
}

.stat-item {
  margin-bottom: 20px;
}

.stat-item h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.stat-item p {
  color: #667eea;
  font-size: 1.5rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2rem;
  }
}
</style>
