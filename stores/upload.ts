export const useUploadStore = defineStore('upload', {
    state: () => ({
        isUploading: false,
        uploadSuccess: false,
        uploadedImageUrl: '',
        selectedFile: null as File | null,
        errorMessage: null as string | null,
    }),
    actions: {
        startUploading() {
            this.isUploading = true;
            this.uploadSuccess = false;
            this.errorMessage = null;
        },
        setUploadSuccess(imageUrl: string) {
            this.isUploading = false;
            this.uploadSuccess = true;
            this.uploadedImageUrl = imageUrl;
            console.log('Upload success:', this.uploadSuccess);
        },
        setUploadFailed(message: string) {
            this.isUploading = false;
            this.uploadSuccess = false;
            this.errorMessage = message;
            console.log('Upload failed:', this.errorMessage);
        },
        setSelectedFile(file: File) {
            this.selectedFile = file;
        },
        resetUpload() {
            this.isUploading = false;
            this.uploadSuccess = false;
            this.uploadedImageUrl = '';
            this.selectedFile = null;
            this.errorMessage = null;
        },
    },
});