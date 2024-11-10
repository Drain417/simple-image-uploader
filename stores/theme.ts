export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDarkMode: false,
    }),
    actions: {
        toggleDarkMode() {
            console.log('Toggling dark mode', this.isDarkMode);
            this.isDarkMode = !this.isDarkMode;
        },
    },
})