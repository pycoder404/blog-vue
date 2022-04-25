<template>
    <el-row>
        <el-col :span="18">
            <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="handleSelect"
            >
                <el-menu-item index="1">
                    <el-link href="/">HOME</el-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-link href="/">HOME</el-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-link href="/">HOME</el-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-link href="/">HOME</el-link>
                </el-menu-item>
                <el-menu-item class="right-menu" index="5">
                    <el-link href="/">HOME</el-link>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="6">

            <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
            >
                <el-menu-item index="1">
                    <el-link href="https://github.com/pycoder404/blog-django" target="_blank">
                        <svg-icon icon="git"></svg-icon>
                    </el-link>
                </el-menu-item>

                <el-menu-item index="3">
                    <el-link href="https://github.com/pycoder404/blog-django" target="_blank">
                        <svg-icon icon="gmail"></svg-icon>
                    </el-link>
                </el-menu-item>
                <el-menu-item style="" index="4">
                    <el-link href="https://github.com/pycoder404/blog-django" target="_blank">
                        <svg-icon icon="wechat"></svg-icon>
                    </el-link>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>

</template>

<script>
    /* eslint-disable */
    // import {mapGetters} from 'vuex'
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
                activeIndex: ref('1'),
                activeIndex2: ref('2')

            }

        },

        // computed: {
        //     ...mapGetters([
        //         'sidebar',
        //         'avatar'
        //     ])
        // },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath)
            }
        }
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

    .right-menu {
        float: right;
        height: 100%;
        margin-right: 30px;
        display: flex;
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
            line-height: 100%;
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
