<template>
    <!--todo use 24 or 20 col?  两边是占满还是留一些空白？-->
    <el-row :gutter="20" style="margin-top:10px;">
        <el-col class="article-left-sidebar" :span="4">
            <div>
                <p>left sider</p>
            </div>
        </el-col>

        <el-col class="border-side" :span="16">
            <div class="article-body">
                <div>
                    <h3>{{ articleDetail.title }}</h3>
                </div>

                <div v-hlcode class="article-content" v-html="articleDetail.content"></div>

                <el-divider></el-divider>

                <category-and-tag :article-detail="articleDetail"></category-and-tag>
                <like-favorite></like-favorite>


                <div class="article-desc">
                        <span>
                            @{{articleDetail.created_time }} {{ articleDetail.author }},views:{{articleDetail.views_count}} likes:{{articleDetail.likes_count}} comments:0
                            <el-button icon="DeleteFilled" type="text"/>
                            <router-link
                                    :to="'/article/edit/'+ articleDetail.id"
                            ><el-button
                                    icon="EditPen"
                                    type="text"/>
                        </router-link>
                        </span>
                </div>

                <el-divider></el-divider>
                <article-comment :article-id="articleId"></article-comment>

                <br>
            </div>
        </el-col>


        <el-col class="article-right-sidebar" :span="4">
            <el-scrollbar :always="true">
                <div class="article-toc-card">
                    <el-card :body-style="tocBodyStyle" shadow="hover">
                        <div v-html="articleDetail.toc"/>
                    </el-card>
                </div>
            </el-scrollbar>
        </el-col>
    </el-row>
</template>

<script>
    import {getArticleDetail} from '@/api/article'
    // import SvgIcon from '@/components/SvgIcon/index'

    import LikeFavorite from "@/views/article/components/LikeFavorite"
    import CategoryAndTag from "@/views/article/components/CategoryAndTag"
    import ArticleComment from '@/views/article/components/ArticleComment'

    export default {
        name: "ArticleDetail",
        components: {LikeFavorite, CategoryAndTag,ArticleComment},
        data() {
            return {
                articleDetail: {},
                tempRoute: {},
                tocBodyStyle: {padding: '5px 20px 10px 0px'},
                articleId: Number
            }
        },

        created() {
            this.articleId = this.$route.params && this.$route.params.id
            this.fetchData(this.articleId)
            // Why need to make a copy of this.$route here?
            // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
            // https://github.com/PanJiaChen/vue-element-admin/issues/1221
            this.tempRoute = Object.assign({}, this.$route)
        },
        methods: {
            fetchData(articleId) {
                console.log("get article deatil queryparam: ", articleId)
                getArticleDetail(articleId).then(response => {
                    const data = response
                    data['toc'] = response['toc'].replaceAll('<ul', '<ul class=article-toc')
                    this.articleDetail = data
                    // just for test
                    // this.postForm.title += `   Article Id:${this.postForm.id}`
                    // this.postForm.content_short += `   Article Id:${this.postForm.id}`

                    // set tagsview title
                    // this.setTagsViewTitle()
                    //
                    // // set page title
                    // this.setPageTitle()
                }).catch(err => {
                    // FIXME  访问一个不存在的文章过程中应该跳转到404界面
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    /*@import './styles/atom-one-dark.css';*/
    @import './styles/github-dark.css';

    .content-margin-left {
        margin-left: 20px;
    }


    .bg-purple-dark {
        background: #99a9bf;
    }

    .article-desc {
        font-size: 16px;
        color: #303030;
        margin: 5px 0;
        padding-right: 30px;
        text-align: right;
    }

    .border-side {
        border-left-style: solid;
        border-right-style: solid;
        border-width: 1px;
        border-color: rgba(0, 0, 0, 0.125);
        background-color: white;
    }


    .article-left-sidebar {
        text-align: left;
        height: 100%;
        border-radius: 4px;
        padding-left: 20px;
    }

    .article-body {
        text-align: left;
        height: 100%;
        border-radius: 4px;
        padding-left: 20px;
    }

    .article-right-sidebar {
        text-align: left;
        border-radius: 4px;
    }

    .article-toc-card {

    }


</style>
<style>
    .article-toc {
        list-style-type: none;
        padding-inline-start: 20px;

    }

    a {
        color: blue;
    }

    .article-toc a:link {
        color: black;
    }

    .article-toc a:visited {
        color: gray;
    }

    .article-toc a:hover {
        color: blue;
    }

    .article-toc a:active {
        color: red;
    }

    .article-content a {
        color: blue;
    }

</style>
