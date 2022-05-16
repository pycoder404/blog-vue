<template>
    <div>
        <el-row v-for="article in artcilesList" :key="article.id">
            <el-col style="background-color: cornsilk">
                <p>{{ article.content }}</p>
            </el-col>
        </el-row>
    </div>



</template>

<script>
    import { fetchArticleList } from '@/api/article'


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
                    limit: 20
                }
            }
        },
        created() {
            this.getList()
        },
        computed: {
            artcilesList(){
                return this.articleList
            }
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchArticleList(this.listQuery).then(response => {
                    console.log(response)
                    this.articleList = response.data
                    console.log(this.articleList)
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
</style>
