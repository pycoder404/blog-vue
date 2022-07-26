<template>
    <div>
        <div class="article-category">
            <span>分类: <router-link
                    :to="{name:'articleListPage',query:{category:'Linux'}}">{{articleDetail.category}}</router-link></span>
        </div>
        <div class="article-tag">
            <span>标签: </span>
            <router-link
                    v-for="tag in articleDetail.tags"
                    :key="tag"
                    :to="{name:'articleListPage',query:{tags:tag}}"
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
            // Upload,
            // StickyNav,
            // CommentDropdown,
            // PlatformDropdown,
            // SourceUrlDropdown
        },
        props: {
            articleDetail: {
                type: Object
            }
        },
        data() {

            return {
                image_upload_url: 'http://10.89.228.206:28088/files/upload/',
                // postForm: Object.assign({}, defaultForm),
                loading: false,
                tempRoute: {},
                articleTags: [],
                articleCategories: [],
            }
        },
        created() {
            // Why need to make a copy of this.$route here?
            // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
            // https://github.com/PanJiaChen/vue-element-admin/issues/1221
            this.tempRoute = Object.assign({}, this.$route)
        }
    }

</script>

<style scoped>
    .article-category {

    }

    .article-tag {

    }

</style>
