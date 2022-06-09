<template>
    <create-article :is-edit="true"></create-article>
</template>

<script>
    import CreateArticle from './create'
    export default {
        name: "EditArticle",
        components:{CreateArticle}
    }
</script>

<style scoped>

</style>
