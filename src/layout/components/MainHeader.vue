<template>
    <div class="main-header">
        <div class="left-menu">
            <router-link to="/" class="left-menu-item">HOME</router-link>
            <router-link to="/article/list" class="left-menu-item">LIST</router-link>
            <router-link to="/article/list" class="left-menu-item">ARCHIVE</router-link>
            <router-link to="/article/create" class="left-menu-item">NEW</router-link>

        </div>

        <div class="right-menu">
            <el-button class="right-menu-item"> <el-icon><SearchIcon /></el-icon></el-button>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <el-avatar shape="square" :size="30" fit="fill" :src="avatar"></el-avatar>
                    <el-icon><CaretBottom /></el-icon>
                </div>

                <template #dropdown>
                <el-dropdown-menu>
                    <router-link to="/">
                        <el-dropdown-item>Home</el-dropdown-item>
                    </router-link>
                    <router-link to="/article/create">
                        <el-dropdown-item>New</el-dropdown-item>
                    </router-link>

                    <a target="_blank" href="https://github.com/pycoder404/blog-vue">
                        <el-dropdown-item>Github</el-dropdown-item>
                    </a>
                    <el-dropdown-item divided @click="logout">
                        <span style="display:block;">Log Out</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>


</template>

<script>
    /* eslint-disable */
    import {mapGetters} from 'vuex'
    // import Breadcrumb from '@/components/Breadcrumb'
    // import Hamburger from '@/components/Hamburger'
    import {ref} from 'vue'
    import SvgIcon from '@/components/SvgIcon/index'

    export default {
        components: {
            SvgIcon
        },
        data() {
            return {
            }

        },

        computed: {
            ...mapGetters([
                'avatar'
            ])
        },

        methods: {
            async logout() {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-header {
        height: 52px;
        overflow: hidden;
        position: relative;
        background: #24292f;
        /*background:#304156;*/
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        padding:16px 32px;
        .left-menu {
            float: left;
            height: 100%;
            /*line-height: 30px;*/


            &:focus {
                outline: none;
            }

            .left-menu-item {
                display: inline-block;
                margin: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #FFFFFF;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

        }

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

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

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {

                .avatar-wrapper {

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

    .el-link {
        margin-right: 15px;
        line-height: 50px;
        font-size: 18px;
        font-weight: 500;
        font-family: serif;
        color: black;
    }

    .center {
        margin: 0 20px;
        position: absolute;
        top: 25%;
    }

    .el-link .el-icon--right.el-icon {
        vertical-align: text-bottom;

    }

    .icon-padding {
        padding-bottom: 20px;
    }




</style>
