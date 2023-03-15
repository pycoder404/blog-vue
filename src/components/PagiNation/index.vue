<template>
    <div :class="{'hidden':hidden}" class="pagination-container">
        <el-pagination
                :background="background"
                small="true"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :layout="layout"
                :page-sizes="pageSizes"
                :total="total"
                v-bind="$attrs"
                default-current-page=1
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
    // fixme why use this, @pycoder404
    import { scrollTo } from '@/utils/scroll-to'

    export default {
        name: 'PagiNation',
        emits:['update:page','update:limit'],

        props: {
            total: {
                required: true,
                type: Number
            },
            page: {
                type: Number,
                default: 1
            },
            limit: {
                type: Number,
                default: 20
            },
            pageSizes: {
                type: Array,
                default() {
                    return [10, 20, 30, 50]
                }
            },
            layout: {
                type: String,
                default: 'prev,pager,next,jumper,sizes,total'
            },
            background: {
                type: Boolean,
                default: true
            },
            autoScroll: {
                type: Boolean,
                default: true
            },
            hidden: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            currentPage: {
                get() {
                    return this.page
                },
                set(val) {
                    this.$emit('update:page', val)
                }
            },
            pageSize: {
                get() {
                    return this.limit
                },
                set(val) {
                    this.$emit('update:limit', val)
                }
            }
        },
        methods: {
            // 这里是原有代码的流程，但是page和pagesize已经是在父组件和子组件通过emit事件双向绑定了，
            // 外面直接使用即可，不需要在这里调用的时候传递了
            // handleSizeChange(val) {
            //     this.$emit('pagination', { page: 1, limit: val })
            //     if (this.autoScroll) {
            //         scrollTo(0, 800)
            //     }
            // },
            handleSizeChange() {
                this.$emit('update:page', 1)
                this.$emit('pagination')
                if (this.autoScroll) {
                    scrollTo(0, 800)
                }
            },
            handleCurrentChange() {
                this.$emit('pagination')
                if (this.autoScroll) {
                    scrollTo(0, 800)
                }
            }
        }
    }
</script>

<style scoped>
    .pagination-container {
        margin-top:0px;
        /*background: #fff;*/
        padding: 15px 16px;
    }
    .pagination-container.hidden {
        display: none;
    }
</style>
