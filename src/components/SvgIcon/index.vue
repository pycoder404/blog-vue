<template>
    <div class="svg-icon">
        <slot name="icon">
            <component :is="iconElement"/>
        </slot>
    </div>
</template>
<script>
    import IconAlipay from "./components/IconAlipay";
    import IconError from "./components/IconError";
    import IconGithub from './components/IconGithub.vue';
    import IconGmail from "./components/IconGmail";
    import IconQq from "./components/IconQQ";
    import IconWechat from "./components/IconWechat";
    import IconLike from "./components/IconLike";
    import IconView from "./components/IconView";
    import IconComment from "./components/IconComment";

    const IconMap = {
        alipay: 'icon-alipay',
        error: 'icon-error',
        git: 'icon-github',
        gmail: 'icon-gmail',
        qq: 'icon-qq',
        wechat: 'icon-wechat',
        like: 'icon-like',
        view: 'icon-view',
        comment: 'icon-comment',
    }

    export default {
        name: 'SvgIcon',
        components: {
            IconAlipay,
            IconError,
            IconGithub,
            IconGmail,
            IconQq,
            IconWechat,
            IconLike,
            IconView,
            IconComment
        },
        props: {
            icon: {
                type: String,
                default: 'error'
            }
        },
        computed: {
            iconElement() {
                const icon = this.icon
                return icon && IconMap[icon] ? IconMap[icon] : 'icon-error'
            }
        }
    }
</script>

<style scoped>
    .icon-success {
        fill: #67C23A;
    }

    .icon-warning {
        fill: #E6A23C;
    }

    .icon-waiting {
        fill: #E6A23C;
    }

    .icon-error {
        fill: #F56C6C;
    }

    .icon-info {
        fill: #909399;
    }

    .icon-loading {
        fill: #20694d;
    }

    .svg-icon svg {
        width: 30px;
        height: 30px;
    }
</style>
