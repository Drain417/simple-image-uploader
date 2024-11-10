<script setup lang="ts">

const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);
const selectedFile = ref<File | null>(null);
const errorMessage = ref<string | null>(null);

const validateFile = (file: File) => {
  const allowedTypes = ['image/jpg', 'image/png', 'image/gif'];
  const maxSize = 2 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return 'Only JPG, PNG or GIF files are allowed.'
  }
  if (file.size > maxSize) {
    return 'File size should be less than 2MB.';
  }
  return null;
}

const onFileSelect = async(event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const error = validateFile(file);
    if (error) {
      errorMessage.value = error;
      selectedFile.value = null;
    } else {
      selectedFile.value = file;
      errorMessage.value = null;
      await uploadFile(file);
    }
  }
}

const onFileDrop = async(event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;

  const files = event.dataTransfer?.files;
  if (files && files[0]) {
    const file = files[0];
    const error = validateFile(file);
    if (error) {
      errorMessage.value = error;
      selectedFile.value = null;
    } else {
      selectedFile.value = file;
      errorMessage.value = null;
      await uploadFile(file);
    }
  }
}

const triggerFileInput = () => {
  if (fileInput.value) fileInput.value.click();
}

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      router.push('/upload')
    } else {
      throw new Error('Upload failed');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}
</script>

<template>
  <div class="upload-container" @dragover.prevent @drop="onFileDrop">
    <div class="upload-area" @click="triggerFileInput" :class="{ 'drag-over': isDragOver}">
      <img src="/exit.svg" alt="exit" class="exit-icon"/>
      <p v-if="!selectedFile" class="upload-text">
        Drag & drop a file or
        <span class="browse-link" @click="triggerFileInput">browse files</span>
      </p>
      <input ref="fileInput" type="file" accept="image/*" @change="onFileSelect" class="file-input" />
      <p v-if="selectedFile" class="file-name">{{ selectedFile.name }}</p>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
      <div class="file-restrictions">
        <p>JPG, PNG or GIF - Max file size 2MB</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 10px;
  width: 70%;
  margin: 10vh auto;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.upload-area {
  width: 100%;
  height: 100%;
  min-width: 70vh;
  min-height: 49vh;
  border: 2px dashed #E5E7EB;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.exit-icon {
  padding: 10px 0;
}
.upload-area.drag-over {
  background-color: rgba(0, 123, 255, 0.1);
}

.upload-text {
 font-family: 'Inter',sans-serif;
 font-size: 0.875rem;
}

.browse-link {
  font-family: 'Inter',sans-serif;
  font-size: 0.875rem;
  color: #3662E3;
}

.file-input {
  display: none;
}

.file-restrictions {
  font-family: 'Inter',sans-serif;
  font-size: 0.75rem;
  color: #4D5562;
}

</style>