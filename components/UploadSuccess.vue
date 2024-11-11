<script setup lang="ts">
const uploadStore = useUploadStore();
const imageUrl = uploadStore.uploadedImageUrl;

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
    <h2>Upload Successful!</h2>
    <img :src="imageUrl" alt="Uploaded Image" />
    <button @click="copyUrl">Share</button>
    <button @click="downloadImage">Download</button>
  </div>
</template>

<style scoped>
.upload-success {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-success img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

.upload-success button {
  margin-top: 20px;
}
</style>