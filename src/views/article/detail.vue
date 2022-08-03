<template>
    <el-row>
        <el-col :span="4">
            <div class="col-bg">
                <p>left sidebar</p>
            </div>
        </el-col>

        <el-col :span="16">
            <div class="col-bg" style="background-color: white">
                <div class="content-margin-left">
                    <h3>{{ articleDetail.title }}</h3>
                </div>
                <div v-hlcode v-html="articleDetail.content"></div>

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
                <br>
            </div>

        </el-col>

        <el-col :span="4">
            <div class="col-bg">
                <div v-html="articleDetail.toc"/>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import {getArticleDetail} from '@/api/article'
    // import SvgIcon from '@/components/SvgIcon/index'

    import LikeFavorite from "@/views/article/components/LikeFavorite";
    import CategoryAndTag from "@/views/article/components/CategoryAndTag";
    //

    export default {
        name: "ArticleDetail",
        components:{LikeFavorite,CategoryAndTag},
        data() {
            return {
                articleDetail: {},
                tempRoute: {},
            }
        },

        created() {
            const articleId = this.$route.params && this.$route.params.id
            this.fetchData(articleId)
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
                    data['toc'] = response['toc'].replaceAll('<ul','<ul class=article-toc')
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

    .grid-content {
        border-radius: 4px;
    }

    .margin-side {
        margin: 5px 15px 0px 15px;
    }

    .margin-left {
        height: 100%;
        margin-left: 30px;
    }

    .content-margin-left {
        margin-left: 20px;
    }

    .margin-right {
        margin-right: 30px;
        height: 100%;
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


    .col-bg {
        text-align: left;
        height: 100%;
        border-radius: 4px;
        margin-left: 15px;
        background: #d3dce6;
    }

</style>
<style>
    .article-toc {
        list-style-type: none;
        padding: 0px 15px;


    }


</style>
