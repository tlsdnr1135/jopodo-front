<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo -->
        <div class="nav-logo">
          <img alt="Vue logo" src="./assets/logo.svg" width="40" height="40" />
          <router-link to="/" class="logo-text">Jopodo</router-link>
        </div>
        
        <!-- Desktop Menu -->
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">소개</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link" active-class="active">연락처</router-link>
          </li>
        </ul>
        
        <!-- Mobile Menu Button -->
        <div class="nav-toggle" @click="toggleMobileMenu">
          <span class="bar" :class="{ active: isMobileMenuOpen }"></span>
          <span class="bar" :class="{ active: isMobileMenuOpen }"></span>
          <span class="bar" :class="{ active: isMobileMenuOpen }"></span>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
        <router-link to="/" class="mobile-link" @click="toggleMobileMenu">홈</router-link>
        <router-link to="/about" class="mobile-link" @click="toggleMobileMenu">소개</router-link>
        <router-link to="/contact" class="mobile-link" @click="toggleMobileMenu">연락처</router-link>
      </div>
    </nav>
    
    <!-- Page Content -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navigation Styles */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.logo-text:hover {
  color: rgba(255,255,255,0.8);
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 25px;
  transition: all 0.3s;
  position: relative;
}

.nav-link:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

.nav-link.active {
  background: rgba(255,255,255,0.2);
  font-weight: 700;
}

/* Mobile Menu Toggle */
.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background: white;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.bar.active:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.bar.active:nth-child(2) {
  opacity: 0;
}

.bar.active:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu.active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 15px 20px;
  width: 100%;
  text-align: center;
  transition: background 0.3s;
}

.mobile-link:hover {
  background: rgba(255,255,255,0.1);
}

/* Main Content */
.main-content {
  flex: 1;
  width: 100%;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .nav-toggle {
    display: flex;
  }
  
  .nav-container {
    height: 60px;
    padding: 0 15px;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  .nav-container {
    padding: 0 10px;
  }
  
  .logo-text {
    font-size: 1.3rem;
  }
}
</style>
