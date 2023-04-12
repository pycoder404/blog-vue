<template>
    <div class="content-main">
        <el-row style="background-color: white;">
            <el-col :span="14" :offset="5">
                <div v-for="article in articleList" :key="article.id">
                    <div class="article-main">
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
                                <el-button v-if=false icon="DeleteFilled" text/>
                                <router-link
                                        v-if="false"
                                        :to="'/article/edit/'+ article.id"
                                        class="article-title"
                                ><el-button
                                        icon="EditPen"
                                        text/>
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
                <!--  <el-divider style="margin: 1px 0;"/>-->
            </el-col>
        </el-row>

        <pagi-nation
                :total="total"
                :background="true"
                v-model:page="listQuery.page"
                v-model:limit="listQuery.pagesize"
                @pagination="getList"
        />

    </div>

</template>

<script>
    import {getArticleList} from '@/api/article'
    import PaginNation from '@/components/PagiNation'
    import {mapGetters} from "vuex";
    // import SvgIcon from '@/components/SvgIcon/index'

    export default {
        name: 'ArticleList',
        components: {
            PagiNation: PaginNation,
        },
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
                listLoading: true,
                total: 0,
                listQuery: {
                    page: 1,
                    pagesize: 10
                }
            }
        },
        created() {
            this.getList()
        },
        computed: {
            ...mapGetters([
                'roles'
            ])
        },
        methods: {
            getList() {
                // this.listLoading = true
                // fixme 这里在前端的url界面没有显示 ?page=1&pagesize=10,并且这里如果地址栏如果人工输入，会导致pagination 显示错乱
                Object.assign(this.listQuery, this.$route.query)
                getArticleList(this.listQuery).then(response => {
                    this.articleList = response.data
                    this.total = response.count
                    this.listLoading = false
                }).catch(() => {
                    // console.info('error in page')
                    // console.info(this.$route)
                    // this.$router.push({path:this.$route.path})
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
        margin-top: 10px;
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

    .content-main {
        height: 100%;
        width: 100%;
        display: flex;
        background-color: #f7f5f5;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;

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
