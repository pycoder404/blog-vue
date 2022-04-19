<template>
    <div>
        <nav-bar></nav-bar>
        <left-sidebar class="sidebar-container"></left-sidebar>

        <div class="main-container">
            <app-main></app-main>
        </div>
        <left-sidebar class="right-sidebar-container"></left-sidebar>

    </div>
</template>

<script>
    import {NavBar, LeftSidebar, AppMain} from './components'
    export default {
        name: 'LayOut',
        components: {
            NavBar,
            LeftSidebar,
            AppMain
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
</style>
