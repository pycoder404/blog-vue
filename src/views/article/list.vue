<template>
    <el-row>
<!--        <el-col :span="4">-->
<!--            <p>left sidebar</p>-->
<!--        </el-col>-->
        <el-col style="background-color: cornsilk" :span="16">
            <p >Hello List </p>
            <p >Hello List </p>
            <p >Hello List </p>
            <p >Hello List </p>
            <p >Hello List </p>
        </el-col>
        <el-col :span="4">
            <p>right sidebar</p>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ArticleList"
    }
</script>

<style scoped>

</style>
