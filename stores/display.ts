export const useDisplayStore = defineStore('display', {
    state: () => ({
        uploadedImageUrl: '',
    }),
    actions: {
        setUploadedImageUrl(imageUrl: string) {
            this.uploadedImageUrl = imageUrl;
        },
        resetImage() {
            this.uploadedImageUrl = '';
        },
    },
});