<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore();
</script>

<template>
  <div :class="['layout-container', {'dark-mode': themeStore.isDarkMode}]">
    <header class="header">
      <div class="logo-container">
        <img src="/logo.svg" alt="Logo" class="logo logo-large" />
        <img src="/logo-small.svg" alt="Logo Small" class="logo logo-small" />
        <div class="dark-mode-text" v-if="themeStore.isDarkMode">ImageUpload</div>
      </div>
      <button @click="themeStore.toggleDarkMode" :class="['dark-mode-toggle', {'dark-mode-button': themeStore.isDarkMode}]">
        <img :src="themeStore.isDarkMode ? '/Sun_fill.svg' : '/Moon_fill.svg'" alt="Dark Mode" />
      </button>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  width: 90%;
  height: 90%;
  margin: 0 auto;
}

.layout-container.dark-mode {
  background-color: #121826;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
}

.dark-mode header {
  border-bottom: 1px solid #4D5562;
}

.logo-container {
  display: flex;
  align-items: center;
  position: relative;
}

.logo-large {
  opacity: 1;
  width: 150px;
  height: 30px;
  margin-left: 30px;
  position: absolute;
  top:0;
  left: 0;
}

.logo-small {
  opacity: 0;
}

.dark-mode .logo-small {
  opacity: 1;
  width: 30px;
  height: 28px;
  margin-left: 90px;
  position: absolute;
  top:-1px;
  left: -56px;
}

.dark-mode-text {
  color: #FFFFFF;
  position: relative;
  left: 75px;
  top: 2px;
}


.dark-mode .logo-large {
  opacity: 0;
}

.dark-mode-toggle {
  background-color: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 20%;
  padding: 2px 4px;
  cursor: pointer;
}

.dark-mode-toggle.dark-mode-button {
  background-color: #4D5562;
  border: none;
}

.dark-mode-toggle img {
  width: 25px;
  height: 25px;
  position: relative;
  top: 2px;
}

.dark-mode header {
  background-color: #121826;
}

</style>