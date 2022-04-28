<template>
    <el-row>
        <el-col :span="4">
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
            <p>left sidebar</p>
        </el-col>
        <el-col style="background-color: cornsilk" :span="16">

                    <div id="nav" class="grid-content margin-side backtest">
                        <h1 style="padding-left: 30px">{{ ArticleForm.title }}</h1>
                    </div>

                    <div class="grid-content bg-purple margin-left">
                        <div class="content-margin-left" v-html="ArticleForm.content" />
                    </div>

                    <div class="grid-content bg-purple margin-right">
                        <div v-html="ArticleForm.toc" />
                    </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple margin-right">
                <div v-html="ArticleForm.toc" />
            </div>
            <p>right sidebar</p>
        </el-col>
    </el-row>
</template>

<script>
    import { getArticleDetail } from '@/api/article'

    const defaultForm = {
        status: 'draft',
        title: 'title', // 文章题目
        content: 'content', // 文章内容
        toc: '', // 文章目录
        content_short: '', // 文章摘要
        source_uri: '', // 文章外链
        image_uri: '', // 文章图片
        display_time: undefined, // 前台展示时间
        id: undefined,
        platforms: ['a-platform'],
        comment_disabled: false,
        importance: 0
    }
    export default {
        name: "ArticleDetail",
        data() {
            return {
                ArticleForm: Object.assign({}, defaultForm),
                tempRoute: {}

            }
        },

        created() {
            const id = this.$route.params && this.$route.params.id
            this.fetchData({ id: id })
            // Why need to make a copy of this.$route here?
            // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
            // https://github.com/PanJiaChen/vue-element-admin/issues/1221
            this.tempRoute = Object.assign({}, this.$route)
        },
        methods: {
            fetchData(queryParam) {
                console.log("get article deatil queryparam: ",queryParam)
                getArticleDetail(queryParam).then(response => {
                    this.ArticleForm = response.data

                    // just for test
                    // this.postForm.title += `   Article Id:${this.postForm.id}`
                    // this.postForm.content_short += `   Article Id:${this.postForm.id}`

                    // set tagsview title
                    // this.setTagsViewTitle()
                    //
                    // // set page title
                    // this.setPageTitle()
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>
