<template>
    <div class="main-footer">
        <span>Copyright@pycoder404</span>
        <br>
        <el-link href="https://beian.miit.gov.cn" type="info"> {{ ICP_ID }}</el-link>
        <el-link href="https://beian.miit.gov.cn" type="info"> {{ POL_ICP_ID }}</el-link>

    </div>
</template>

<script>
    const VUE_APP_ICP_ID = process.env.VUE_APP_ICP_ID
    const VUE_APP_POL_ICP_ID = process.env.VUE_APP_POL_ICP_ID
    export default {
        name: "MainFooter",
        data() {
            return {
                ICP_ID: VUE_APP_ICP_ID,
                POL_ICP_ID:VUE_APP_POL_ICP_ID
            }
        }
    }
</script>

<style scoped>
    .main-footer {
        padding: 5px 0px;
        overflow: hidden;
        display: block;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    }
</style>
