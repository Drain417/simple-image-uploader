<script setup lang="ts">
const uploadStore = useUploadStore();
const imageUrl = uploadStore.uploadedImageUrl;
const themeStore= useThemeStore();

const copyUrl = () => {
  navigator.clipboard.writeText(imageUrl).then(() => {
    alert('URL copied to clipboard');
  });
};

const downloadImage = () => {
  const a = document.createElement('a');
  a.href = imageUrl;
  a.download = imageUrl.split('/').pop()!;
  a.click();
};
</script>

<template>
  <div class="upload-success">
    <div class="image-container" :style="{ backgroundColor: themeStore.isDarkMode? '#212936' : '#F9FAFB'}">
      <img :src="imageUrl" alt="Uploaded Image" class="uploaded-image"/>
    </div>
    <div class="button-container">
    <button @click="copyUrl" class="share-button">
      <img src="/Link.svg" alt="Share Icon" class="button-icon" />
      Share
    </button>
    <button @click="downloadImage" class="download-button">
      <img src="/download.svg" alt="Download Icon" class="button-icon" />
      Download
    </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.upload-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  text-align: center;
}

.image-container {
  width: 40vw;
  height: 40vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 40px;
  margin-top: 15vh;
  padding: 10px;
  border-radius: 10px;
}

.uploaded-image {
  width: 38vw;
  height: 38vh;
  object-fit: contain;
  overflow: auto;
  border-radius: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}


.upload-success button {
  display:flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  background-color: #3662E3;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  gap: 5px;
  font-family: 'Inter',sans-serif;
  font-size: 0.625rem;
}

.button-icon {
  width: 0.625rem;
  height: 0.625rem;
}
</style>