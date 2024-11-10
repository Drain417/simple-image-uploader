export const useUploadStore = defineStore('upload', {
    state: () => ({
        isUploading: false,
        uploadSuccess: false,
        uploadedImageUrl: '',
        selectedFile: null as File | null,
    }),
    actions: {
        startUploading() {
            this.isUploading = true;
            this.uploadSuccess = false;
        },
        setUploadSuccess(imageUrl: string) {
            this.isUploading = false;
            this.uploadSuccess = true;
            this.uploadedImageUrl = imageUrl;
        },
        setUploadFailed() {
            this.isUploading = false;
            this.uploadSuccess = false;
        },
        setSelectedFile(file: File) {
            this.selectedFile = file;
        },
        resetUpload() {
            this.isUploading = false;
            this.uploadSuccess = false;
            this.uploadedImageUrl = '';
            this.selectedFile = null;
        },
    },
});