<script setup lang="ts">
const router = useRouter();
const uploadStore = useUploadStore();
const themeStore = useThemeStore();

if (uploadStore.uploadSuccess) {
  setTimeout(() => {
    router.push('/upload-success');
  }, 1000);
}

</script>

<template>
  <div class="upload-loader" :style="{backgroundColor: themeStore.isDarkMode? '#212936' : 'white'}">
    <div class="uploading-text" >
      <b :style="{color: themeStore.isDarkMode ? 'white' : '#4D5562'}">Uploading</b>, please wait...
    </div>
    <div class="loader-container" :style="{backgroundColor: themeStore.isDarkMode ? '#4D5562' : '#E5E7EB'}">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.upload-loader {
  display: flex;
  width: 55vw;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 30vh auto;
  padding: 5vh 0;
  border-radius: 10px;
}

.uploading-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #4D5562;
}

.loader-container {
  width: 30vw;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
}

.loader {
  width: 100%;
  height: 100%;
  background-color: #3662E3;
  animation: loading 2s infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>