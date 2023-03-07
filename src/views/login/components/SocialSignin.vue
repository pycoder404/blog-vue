<template>
    <div class="social-signup-container">
        <el-link :href="githubAuthUri" target="_self">
            <icon-github class="github-svg-container">
            </icon-github>
        </el-link>

        <el-link :href="githubAuthUri" target="_self">
            <icon-wechat class="wx-svg-container"></icon-wechat>
        </el-link>

    </div>
</template>

<script>
    // import openWindow from '@/utils/open-window'
    import IconGithub from "@/components/SvgIcon/components/IconGithub";
    import IconWechat from "@/components/SvgIcon/components/IconWechat";

    const GITHUB_CLIENT_ID = process.env.VUE_APP_GITHUB_CLIENT_ID
    export default {
        name: 'SocialSignin',
        components: {
            IconGithub,
            IconWechat
        },
        data() {
            return {
                githubAuthBaseUri: "https://github.com/login/oauth/authorize?client_id="
            }

        },
        computed: {
            githubAuthUri() {
                // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
                // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
                const thirdPart = window.location.search === '' ? "?thirdPart=github" : "&thirdPart=github"
                const redirect_uri = window.location.href + thirdPart
                return this.githubAuthBaseUri  + GITHUB_CLIENT_ID + "&redirect_uri=" + encodeURIComponent(redirect_uri)
            }
        }
        ,
        methods: {
            wechatHandleClick(thirdpart) {
                alert(thirdpart)
                console.log(thirdpart)
                // this.$store.commit('SET_AUTH_TYPE', thirdpart)
                // const appid = 'xxxxx'
                // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
                // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
                // openWindow(url, thirdpart, 540, 540)
            },
            githubHandleClick(thirdpart) {
                // alert(thirdpart)
                console.log(thirdpart)
                // this.$store.commit('SET_AUTH_TYPE', thirdpart)
                // const client_id = 'aa6d9aa35a3d63374015'
                // const redirect_uri = encodeURIComponent('/redirect?redirect=' + window.location.origin + '/auth-redirect')
                // const url = 'https://github.com/login/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri
                // const url = 'https://github.com/login/oauth/authorize?client_id=' + client_id
                // this.$router.push(url)
                // openWindow(url, thirdpart, 540, 540)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .social-signup-container {
        margin: 10px 10px;

        .sign-btn {
            display: inline-block;
            cursor: pointer;
        }

        .icon {
            color: #fff;
            font-size: 24px;
            margin-top: 8px;
        }

        .github-svg-container {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            padding-top: 1px;
            border-radius: 4px;
            margin-bottom: 20px;
            margin-right: 5px;
        }

        .wx-svg-container,
        .qq-svg-container {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            padding-top: 1px;
            border-radius: 4px;
            margin-bottom: 20px;
            margin-right: 5px;
        }

        .wx-svg-container {
            background-color: #24da70;
        }

        .qq-svg-container {
            background-color: #6BA2D6;
            margin-left: 50px;
        }
    }
</style>
