<template>
    <router-view :key="key"></router-view>
</template>

<script>

    export default {
        name: "AppMain",
        computed: {
            key() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>

</style>
