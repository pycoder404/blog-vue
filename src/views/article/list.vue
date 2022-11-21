<template>
    <div style="background-color: #f7f5f5">
        <div v-for="article in articleList" :key="article.id" >
            <el-row style="background-color: white">
                <el-col :span="14" :offset="5" class="article-main" >
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
                            @{{article.created_time }} {{ article.author }}, views:{{article.views_count}} likes:{{article.likes_count}} comments:{{article.comments_count}}
                            <el-button icon="DeleteFilled" text/>
                            <router-link
                                    :to="'/article/edit/'+ article.id"
                                    class="article-title"
                            ><el-button
                                    icon="EditPen"
                                    text
                                    />
                        </router-link>
                        </span>

                    </div>
                </el-col>
            </el-row>
            <!--        <el-divider style="margin: 10px 0;"/>-->
        </div>
    </div>


</template>

<script>
    import {getArticleList} from '@/api/article'
    // import SvgIcon from '@/components/SvgIcon/index'

    export default {
        name: 'ArticleList',
        // components:{
        //     SvgIcon
        // },
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
        methods: {
            getList() {
                this.listLoading = true
                Object.assign(this.listQuery,this.$route.query)
                getArticleList(this.listQuery).then(response => {
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
        margin-top:10px;
        box-shadow: 1px 2px 3px #ddd;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .article-title {
        text-align: left;
        margin: 5px 10px;
        font-size: 20px;
        font-weight: bold;
        color: black;
        text-decoration: none

    }

    .article-body {
        padding: 10px
    }

    a:hover {
        color: blue;
    }

    .article-desc {
        font-size: 12px;
        color: #303030;
        margin: 5px 0;
        padding-right: 30px;
        text-align: right;
    }

</style>
