<template>
    <div style="background-color: #f7f5f5">
        <div v-for="article in articleList" :key="article.id" class="article-main">
            <el-row style="background-color: white">
                <el-col>
<!--                                        <div class="article-title">-->
<!--                                            <a :href="'/#/article/detail/'+article.id" class="article-title" style="text-decoration:none">-->
<!--                                                {{ article.title }}-->
<!--                                            </a>-->
<!--                                        </div>-->
                    <div class="article-title">
                        <router-link
                                :to="'/article/detail/'+ article.id"
                                class="article-title"
                        >{{article.title}}
                        </router-link>
                    </div>
                    <el-divider border-style="dotted" style="margin: 1px 0;"/>

                    <div class="article-desc">
                        <span>
                            @{{article.created_time }} {{ article.author.username }}, 30000 views,20 likes,30 comments
                        </span>
                    </div>
                </el-col>
            </el-row>
            <!--        <el-divider style="margin: 10px 0;"/>-->
        </div>
    </div>


</template>

<script>
    import {fetchArticleList} from '@/api/article'


    export default {
        name: 'ArticleList',
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                articleList: null,
                articleCount: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    pagesize: 20
                }
            }
        },
        created() {
            this.getList()
        },
        computed: {
            artcilesList() {
                return this.articleList
            }
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchArticleList(this.listQuery).then(response => {
                    this.articleList = response.data
                    this.articleCount = response.count
                    this.listLoading = false
                })
            }
        }
    }
</script>

<style scoped>
    .edit-input {
        padding-right: 100px;
    }

    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }

    .article-main {
        margin: 20px 100px;
        box-shadow: 1px 2px 3px #ddd;
        border: 1px solid #ddd;
    }

    .article-title {
        text-align: left;
        margin: 5px 10px;
        font-size: 20px;
        font-weight: bold;
        color: black;
        text-decoration:none

    }

    .article-body {
        padding: 10px
    }
    a:hover{
        color: blue;
    }
    .article-desc {
        font-size: 12px;
        color: #303030;
        margin: 5px 0;
        padding-right: 20px;
        text-align: right;
    }

</style>
