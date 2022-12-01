<template>
    <div>
        <p> comment list:</p>
        <el-card
                class="comment-item"
                shadow="hover"
                v-for="comment in commentList"
                :key="comment.id"
        >
            <template #header>
                <div class="card-header">
                    <!-- todo add isAuthor label -->
                    <span>
                       {{ comment.comment_order}}楼  <b>{{comment.author}}</b>  @<span>{{comment.created_time}} </span>
                    </span>


                    <el-button
                            type="primary"
                            text
                            plain
                            @click="replyToSomeone(comment)"
                    >回复
                    </el-button>
                    <el-button
                            type="primary"
                            text
                            plain
                            @click="replyToSomeone(comment,quoted=true)"
                    >引用
                    </el-button>
                </div>
            </template>
            <div v-hlcode  class="comment-body" v-html="comment.mdcontent"></div>
        </el-card>
        <el-divider></el-divider>
        <div>
            <el-form ref="commentFormRef" :model="commentForm">
                <el-form-item prop="content">
                    <mavon-editor
                            ref="commentEditor"
                            class="mavon-edtior-custom-comment"
                            code-style="vs2015"
                            placeholder="发表评论，支持markdown语法"
                            :ishljs="true"
                            v-model="commentForm.content"
                    />
                </el-form-item>
            </el-form>
            <div class="comment-status">
                <span>当前用户 - </span> <span>{{username}} - </span>
                <el-button type="primary" @click="submitForm">
                    发布评论
                </el-button>
            </div>

        </div>
    </div>

</template>

<script>
    import {getCommentList, createComment} from "@/api/comment";
    import {mapGetters} from 'vuex'

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
                commentForm: {
                    article_id: 0,
                    content: '', // comment 内容
                    replied_to: 0,  // 回复给谁

                },
            }
        },
        computed: {
            ...mapGetters([
                'avatar',
                'username'
            ])
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
            },
            replyToSomeone(comment = undefined, quoted = false) {
                if (comment !== undefined) {
                    let content = ''
                    this.commentForm.replied_to = comment.comment_order
                    content = "> 回复 " + comment.comment_order + "楼  @" + comment.author
                    if (quoted) {
                        content =  "> 引用 " + comment.comment_order + "楼  @" + comment.author + "\n\n"

                        content = content + "<div class='quote-reply'>" +  comment.mdcontent + "</div>"
                    }

                    this.commentForm.content = content + "\n\n"
                }
                this.$refs.commentEditor.textAreaFocus()
            },
            submitForm() {
                console.log(this.postForm)
                this.loading = true
                this.commentForm.article_id = this.articleId
                createComment(this.commentForm).then((res) => {
                    this.$notify({
                        title: 'Success',
                        message: res.message || 'Comment Successfully',
                        type: 'success',
                        duration: 2000
                    })
                    this.commentForm.content = ''
                    this.commentForm.replied_to = 0
                    this.getList()
                })
                    .catch((err) => {
                        console.log("Error in posting comment", err)
                    })

                this.loading = false

            },

        }
    }

</script>

<style>
    @import '../styles/github-dark.css';

    .comment-item {
        margin-top: 10px;
        padding:5px;


    }
    .comment-body {
        padding-left: 30px;
        font-size: small;

    }

    .card-header {
        font-size: 1.5ch;
    }

    .mavon-edtior-custom-comment {
        width: 100%;
        min-height: 200px;
    }

    .quote-reply {
        background-color: #ccccc9;
        padding-left: 20px;
    }


    blockquote {
        padding:0 1em;
        color: black;
        border-left: 0.25em solid;
     }

    .comment-status {
        text-align: right;
        font-size: 16px;
        color: #a3aab1;
    }

</style>
