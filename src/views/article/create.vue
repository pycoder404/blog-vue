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
                    <!-- fixme  mavonEdiotr 使用的highlight.js 9.2.0，该版本不支持 github-dark-->
                    <mavon-editor
                            ref="editor"
                            class="mavon-edtior-custom"
                            :ishljs="true"
                            code-style="vs2015"
                            v-model="postForm.content"
                            @imgAdd="handleImgUpload"
                    />

<!--                    <tiny-mce-->
<!--                    ref="editor"-->
<!--                    class="mavon-edtior-custom"-->
<!--                    v-model="postForm.content"-->
<!--                    height="800"-->
<!--                    width=100%-->
<!--                    >-->
<!--                    </tiny-mce>-->

                </el-form-item>
            </div>

            <el-form-item label="分类" prop="category">
                <el-radio-group v-model="postForm.category">
                    <el-radio-button
                            v-for="category in articleCategories"
                            :key="category['title']"
                            :label="category['title']"
                            :value="category['id']"
                    >
                        {{category['title']}}
                    </el-radio-button>
                    <el-button icon="PlusIcon" @click="addCategoryDialogVisible=true">新建分类</el-button>

                </el-radio-group>
            </el-form-item>

            <el-dialog v-model="addCategoryDialogVisible" title="添加分类">

                        <el-input v-model="newCategory" />
                <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="addCategoryDialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="submitToCreateCategory">Confirm</el-button>
                      </span>
                </template>
            </el-dialog>

            <el-form-item label='标签' prop="tags">
                <el-checkbox-group
                        v-model="postForm.tags"
                >
                    <el-checkbox
                            v-for="tag in articleTags"
                            :key="tag['title']"
                            :label="tag['title']"
                            :value="tag['title']"
                    />
                    <el-button icon="PlusIcon" @click="addTagDialogVisible=true">新建标签</el-button>
                </el-checkbox-group>
            </el-form-item>

            <el-dialog v-model="addTagDialogVisible" title="添加标签">
                <el-input v-model="newTag" />
                <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="addTagDialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="submitToCreateTag">Confirm</el-button>
                      </span>
                </template>
            </el-dialog>
        </el-form>

        <sticky-nav
                :class-name="'sub-navbar '+postForm.status"
                style="padding: 0px 45px 15px 45px;"
        >
            <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
                Submit
            </el-button>
        </sticky-nav>
    </div>
</template>

<script>
    // import Upload from '@/components/UploadFile/index'
    import StickyNav from '@/components/StickyNav' // 粘性header组件
    // import { validURL } from '@/utils/validate'
    import {getArticleDetail, createArticle, updateArticle} from '@/api/article'
    import {getTagList,createTag} from '@/api/tag'
    import {getCategoryList,createCategory} from '@/api/category'
    // import TinyMce from '@/components/TinyMce'
    // import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
    // import axios from 'axios'
    import {uploadFile} from "@/api/files";


    export default {
        name: 'CreateArticle',
        components: {
            // Upload,
            StickyNav,
            // TinyMce,
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
                postForm: {
                    status: 'draft',
                    title: '', // 文章题目
                    content: '', // 文章内容
                    importance: 1,
                    category: '',
                    tags: []

                },
                loading: false,
                addCategoryDialogVisible:false,
                addTagDialogVisible:false,
                newCategory:'',
                newTag: '',
                rules: {
                    title: [{validator: validateRequire}],
                    content: [{validator: validateRequire}],
                    category: [{validator: validateRequire}]
                },
                tempRoute: {},
                articleTags: [],
                articleCategories: [],
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
            // articleCategory:{
            //     return this.articleCategories
            // }
        },
        created() {
            // fixme 如果有异常了，不应该进入编辑界面，防止对原有文章的破坏
            this.fetchArticleTag()
            this.fetchArticleCategory()
            if (this.isEdit) {
                const articleId = this.$route.params && this.$route.params.id
                this.fetchArticle(articleId, {'isedit': this.isEdit})
            }

            // Why need to make a copy of this.$route here?
            // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
            // https://github.com/PanJiaChen/vue-element-admin/issues/1221
            this.tempRoute = Object.assign({}, this.$route)
        },
        methods: {
            fetchArticle(articleId, queryParam) {
                getArticleDetail(articleId, queryParam).then(response => {
                    this.postForm = response
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
            fetchArticleTag(queryParam) {
                getTagList(queryParam).then(response => {
                    this.articleTags = response.data
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
            fetchArticleCategory(queryParam) {
                getCategoryList(queryParam).then(response => {
                    this.articleCategories = response.data
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
                const formData = new FormData();
                formData.append('upload_file', $file)
                const that = this;
                uploadFile(formData).then((res)=>{
                    const img_url = res.data.url
                    that.$refs.editor.$img2Url(pos, img_url)

                }).catch(err => {
                          console.log(err)
                        })
                // const formData = new FormData()
                // formData.append('upload_file', blobInfo.blob(), blobInfo.filename())
                // axios({
                //     method: 'post',
                //     url: this.image_upload_url,
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     },
                //     data: formData
                // }).then(res => {
                //     // if (res.data.code !== 0) {
                //     //   failure('Http Error' + res.message)
                //     //   return
                //     // }
                //     const img_url = res.data.url
                //     that.$refs.editor.$img2Url(pos, img_url)
                // })

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
                        if (this.isEdit) {
                            const articleId = this.$route.params && this.$route.params.id
                            updateArticle(articleId, this.postForm).then((res) => {
                                const resp = res
                                this.$notify({
                                    title: 'Success',
                                    message: 'Update Successfully',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.$router.push({name:'articleDetailPage',params:{id:resp.id}})
                            })
                            .catch((err) => {
                                console.log("Error in update article",err)
                            })
                        } else {
                            createArticle(this.postForm).then((res) => {
                                const resp = res
                                this.$notify({
                                    title: 'Success',
                                    message: 'Created Successfully',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.$router.push({name:'articleDetailPage',params:{id:resp.id}})
                            })
                            .catch((err) => {
                                console.log("Error in create article",err)
                            })
                        }
                        this.loading = false
                    } else {
                        console.log('valid error!!')
                        return false
                    }
                })
            },
            submitToCreateCategory() {
                const data={title:this.newCategory}
                createCategory(data).then(() => {
                    this.addCategoryDialogVisible = false
                    this.fetchArticleCategory()
                    this.$notify({
                        title: 'Success',
                        message: 'Create Successfully',
                        type: 'success',
                        duration: 2000
                    })
                })
                    .catch((err) => {
                        console.log("Error: ",err)
                    })
            },
        submitToCreateTag() {
            const data={title:this.newTag}
            createTag(data).then(() => {
                this.addTagDialogVisible = false
                this.fetchArticleTag()
                this.$notify({
                    title: 'Success',
                    message: 'Create Successfully',
                    type: 'success',
                    duration: 2000
                })
            })
                .catch((err) => {
                    console.log("Error: ",err)
                })
        }
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
