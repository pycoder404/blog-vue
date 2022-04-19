<template>
    <div>
        <p>Article Index Page</p>
        <router-link to="/article/list">/article/list</router-link>
        <br />
        <router-link to="/article/detail"
        >/article/detail</router-link
        >
        <br />
        <router-link to="/article/create">/article/create</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "ArticleIndex"
    }
</script>

<style scoped>

</style>
