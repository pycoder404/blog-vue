<template>
    <div class="main-header">
        <div class="left-menu">
            <el-link href="/">HOME</el-link>
            <el-link href="/">LIST</el-link>
            <el-link href="/">HOME</el-link>
            <el-link href="/">HOME</el-link>
            <el-link href="/">HOME</el-link>
        </div>

        <div class="right-menu">
            <svg-icon icon="alipay"></svg-icon>
            <svg-icon icon="error"></svg-icon>
            <el-link href="https://github.com/pycoder404/blog-django" target="_blank"><svg-icon icon="git"></svg-icon></el-link>
            <svg-icon icon="gmail"></svg-icon>
            <svg-icon icon="qq"></svg-icon>
            <svg-icon icon="wechat"></svg-icon>

        </div>
    </div>
</template>

<script>
    // import {mapGetters} from 'vuex'
    // import Breadcrumb from '@/components/Breadcrumb'
    // import Hamburger from '@/components/Hamburger'
    import SvgIcon from '@/components/SvgIcon/index'
    export default {
        components:{
            SvgIcon
        }
        // components: {
        //     Breadcrumb,
        //     Hamburger
        // },
        // computed: {
        //     ...mapGetters([
        //         'sidebar',
        //         'avatar'
        //     ])
        // },
        // methods: {
        //     toggleSideBar() {
        //         this.$store.dispatch('app/toggleSideBar')
        //     },
        //     async logout() {
        //         await this.$store.dispatch('user/logout')
        //         this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        //     }
        // }
    }
</script>

<style lang="scss" scoped>
    .el-link {
        margin-right: 15px;
        line-height: 50px;
        font-size: 18px;
        font-weight: 500;
        font-family: serif;
        color: black;
    }

    .el-link .el-icon--right.el-icon {
        vertical-align: text-bottom;

    }

    .main-header {
        height: 50px;
        overflow: hidden;
        position: relative;
        /*background: #e9e5e5;*/
        background: white;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .left-menu {
            float: left;
            height: 100%;
            line-height: 50px;
            margin-left: 30px;
            display: flex;
            font-size: 30px;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;
            margin-right: 30px;
            display: flex;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;
                margin-right: 30px;
                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
