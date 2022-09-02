<template>
    <div>
        <p> comments:</p>
        <el-card
                class="comment-item"
                v-for="comment in commentList"
                :key="comment.id"
        >
            <template #header>
                <div class="card-header">
                    <!-- todo add isAuthor label -->
                    <span>
                      <b>{{ comment.comment_order}}             {{comment.author}}</b><span>{{comment.created_time}}</span>

                    </span>
                    <el-button class="button" text>Operation button</el-button>
                </div>
            </template>
            <div v-if="comment.parent">
                <span> replied to  <b>{{ comment.comment_order}}             {{comment.author}}</b></span>

            </div>
            <div v-hlcode v-html="comment.content"></div>
        </el-card>
    </div>

</template>

<script>


    import {getCommentList} from "@/api/comment";

    export default {
        name: 'ArticleComment',
        components: {},
        props: {
            articleId: {
                type: Number
            }
        },
        data() {

            return {
                loading: false,
                tempRoute: {},
                commentList: [],
                commentCount: 0,
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                const queryParams = {'article_id': this.articleId}
                getCommentList(queryParams).then(response => {
                    this.commentList = response.data
                    this.commentCount = response.count
                    this.listLoading = false
                })
            }

        }
    }

</script>

<style scoped>
    .comment-item {
        margin-top: 10px;

    }

    .card-header {

    }

</style>
