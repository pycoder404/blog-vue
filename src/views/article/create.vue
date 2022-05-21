<template>
    <div class="createPost-container">
        <el-form ref="postFormRef" :model="postForm" :rules="rules">
            <div class="createPost-main-container">
                <el-form-item prop="title">
                    <el-input v-model="postForm.title" style="width: 100%" :maxlength="100" required>
                        Title
                    </el-input>
                </el-form-item>

                <el-form-item prop="content">
                    <mavon-editor
                            ref="editor"
                            class="mavon-edtior-custom"
                            :ishljs="true"
                            v-model="postForm.content"
                            @imgAdd="handleImgUpload"
                    />
                    <!--          <Tinymce ref="editor" v-model="postForm.content" :height="600" />-->
                    <!--          <vue-ueditor-wrap v-model="postForm.content" :config="editorConfig" :height="800" />-->
                    <!--          <markdown-editor v-model="postForm.content" height="600px" />-->
                </el-form-item>
            </div>
        </el-form>

        <sticky-nav
                :z-index="1800"
                :class-name="'sub-navbar '+postForm.status"
                style="padding: 0px 45px 20px 50px;margin-bottom: 30px;"
        >
            <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
                Submit
            </el-button>
        </sticky-nav>
    </div>
</template>

<script>
    // import Tinymce from '@/components/Tinymce'
    // import Upload from '@/components/UploadFile/index'
    import StickyNav from '@/components/StickyNav' // 粘性header组件
    // import { validURL } from '@/utils/validate'
    import {getArticleDetail, createArticle,} from '@/api/article'

    // import { searchUser } from '@/api/remote-search'
    // import Warning from './Warning'
    // import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
    import axios from 'axios'
    // import VueUeditorWrap from 'vue-ueditor-wrap'
    // import MarkdownEditor from '@/components/MarkdownEditor'

    // const defaultForm = {
    //     status: 'draft',
    //     title: '', // 文章题目
    //     content: '', // 文章内容
    //     content_short: '', // 文章摘要
    //     id: undefined,
    //     platforms: ['a-platform'],
    //     comment_disabled: false,
    //     importance: 0
    // }

    export default {
        name: 'ArticleDetail',
        components: {
            // Tinymce,
            // Upload,
            StickyNav,
            // CommentDropdown,
            // PlatformDropdown,
            // SourceUrlDropdown
        },
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validateRequire = (rule, value, callback) => {
                if (value === '') {
                    this.$message({
                        message: rule.field + '为必传项',
                        type: 'error'
                    })
                    callback(new Error(rule.field + '为必传项'))
                } else {
                    callback()
                }
            }

            return {
                image_upload_url: 'http://10.89.228.206:28088/files/upload/',
                // postForm: Object.assign({}, defaultForm),
                postForm: {
                    status: 'draft',
                    title: '', // 文章题目
                    content: '', // 文章内容
                    importance: 1
                },
                html: '',
                loading: false,
                editorConfig: {
                    UEDITOR_HOME_URL: '/ueditor/'
                },
                userListOptions: [],
                rules: {
                    title: [{validator: validateRequire}],
                    content: [{validator: validateRequire}]
                },
                tempRoute: {}
            }
        },
        computed: {
            displayTime: {
                // set and get is useful when the data
                // returned by the back end api is different from the front end
                // back end return => "2013-06-25 06:59:25"
                // front end need timestamp => 1372114765000
                get() {
                    return (+new Date(this.postForm.display_time))
                },
                set(val) {
                    this.postForm.display_time = new Date(val)
                }
            }
        },
        created() {
            if (this.isEdit) {
                const id = this.$route.params && this.$route.params.id
                this.fetchData({id: id, isedit: this.isEdit})
            }

            // Why need to make a copy of this.$route here?
            // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
            // https://github.com/PanJiaChen/vue-element-admin/issues/1221
            this.tempRoute = Object.assign({}, this.$route)
        },
        methods: {

            submit() {
                console.log(this.content)
                console.log(this.html)
            },
            fetchData(queryParam) {
                getArticleDetail(queryParam).then(response => {
                    this.postForm = response.data

                    // just for test
                    // this.postForm.title += `   Article Id:${this.postForm.id}`
                    // this.postForm.content_short += `   Article Id:${this.postForm.id}`

                    // set tagsview title
                    this.setTagsViewTitle()

                    // set page title
                    this.setPageTitle()
                }).catch(err => {
                    console.log(err)
                })
            },
            handleImgUpload(pos, $file) {
                var formdata = new FormData()
                formdata.append('upload_file', $file)
                var that = this
                // const formData = new FormData()
                // formData.append('upload_file', blobInfo.blob(), blobInfo.filename())
                axios({
                    method: 'post',
                    url: this.image_upload_url,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: formdata
                }).then(res => {
                    // if (res.data.code !== 0) {
                    //   failure('Http Error' + res.message)
                    //   return
                    // }
                    const img_url = res.data.url
                    that.$refs.editor.$img2Url(pos, img_url)
                })

                // fixme 这里使用封装的方法错误，提示object(...) is not a function,应该是返回类型不对(promise?)
                // uploadFiles(formData).then((res) => {
                //   console.log('xxxxxx')
                //   const img_url = res.data.url
                //   success(img_url)
                // }).catch(err => {
                //   console.log('errrrrrrrrrr')
                //   failure('出现未知问题，刷新页面，或者联系程序员')
                //   console.log(err)
                //   return
                // })
            },
            setTagsViewTitle() {
                const title = 'Edit Article'
                const route = Object.assign({}, this.tempRoute, {title: `${title}-${this.postForm.id}`})
                this.$store.dispatch('tagsView/updateVisitedView', route)
            },
            setPageTitle() {
                const title = 'Edit Article'
                document.title = `${title} - ${this.postForm.id}`
            },
            submitForm() {
                console.log(this.postForm)
                this.$refs.postFormRef.validate(valid => {
                    if (valid) {
                        this.loading = true
                        createArticle(this.postForm).then(() => {
                            // this.list.unshift(this.temp)
                            this.recordDialogVisible = false
                            this.$notify({
                                title: 'Success',
                                message: 'Created Successfully',
                                type: 'success',
                                duration: 2000
                            })
                        })
                        this.loading = false
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .mavon-edtior-custom {
        width: 100%;
        min-height: 600px;
    }
    .createPost-container {
        position: relative;
        .createPost-main-container {
            padding: 10px 50px 20px 50px;
            .postInfo-container {
                position: relative;
                @include clearfix;
                margin-bottom: 10px;

                .postInfo-container-item {
                    float: left;
                }
            }
        }

        .word-counter {
            width: 40px;
            position: absolute;
            right: 10px;
            top: 0px;
        }
    }

    .article-textarea ::v-deep {
        textarea {
            padding-right: 40px;
            resize: none;
            border: none;
            border-radius: 0px;
            border-bottom: 1px solid #bfcbd9;
        }
    }
</style>
