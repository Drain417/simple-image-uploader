<script setup lang="ts">
const router = useRouter();
const uploadStore = useUploadStore();

if (uploadStore.uploadSuccess) {
  setTimeout(() => {
    router.push('/upload-success');
  }, 1000);
}
</script>

<template>
  <div class="upload-loader">
    <div class="uploading-text">
      Uploading, please wait...
    </div>
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.upload-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loader-container {
  width: 200px;
  height: 20px;
  background-color: #E5E7EB;
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