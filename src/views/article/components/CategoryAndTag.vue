<template>
    <div>
        <div class="article-category">
            <span>分类: <router-link
                    :to="{name:'articleListPage',query:{category:articleDetail.category}}">{{articleDetail.category}}</router-link></span>
        </div>
        <div class="article-tag">
            <span>标签: </span>
            <router-link
                    v-for="tag in articleDetail.tags"
                    :key="tag"
                    :to="{name:'articleListPage',query:{tags: tag}}"
            >
                {{' ' + tag }}
            </router-link>
        </div>

    </div>

</template>

<script>

    export default {
        name: 'CategoryAndTag',
        components: {
        },
        props: {
            articleDetail: {
                type: Object
            }
        },
    }

</script>

<style scoped>
    .article-category {

    }

    .article-tag {

    }

</style>
