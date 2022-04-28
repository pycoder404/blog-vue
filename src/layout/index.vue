<template>
    <div class="container">
        <el-row class="el-margin-side">
            <el-col :span="24">
                <main-header></main-header>
            </el-col>
        </el-row>

        <el-row class="el-margin-side main-content">
            <el-col :span="24">
                <app-main class="main-container"></app-main>
            </el-col>
        </el-row>

        <el-row class="el-margin-side">
            <el-col :span="24">
                <main-footer></main-footer>
            </el-col>
        </el-row>
    </div>


</template>

<script>
    import {MainHeader, AppMain,MainFooter} from './components'
    export default {
        name: 'LayOut',
        components: {
            MainHeader,
            AppMain,
            MainFooter
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/mixin.scss";
    @import "../styles/variables.scss";
    @import "../styles/sidebar.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }
    .container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
    }
    .el-margin-side {
        margin-left: 5px;
        margin-right: 5px;
    }
    .main-content {
        flex:1;
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }

    .mobile .fixed-header {
        width: 100%;
    }

    html, body, #app.el-container {
        height: 100%;
    }

    .common-layout {
        .el-header,
        .el-footer,
        .el-main,
        .el-aside {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .el-header,
        .el-footer {
            background-color: var(--el-color-primary-light-7);
            color: var(--el-text-color-primary);
            text-align: center;
        }


        .el-aside {
            background-color: var(--el-color-primary-light-8);
            color: var(--el-text-color-primary);
            text-align: center;
        }

        .el-main {
            background-color: var(--el-color-primary-light-9);
            color: var(--el-text-color-primary);
            text-align: center;

            height: 150px;
        }
    }

</style>
