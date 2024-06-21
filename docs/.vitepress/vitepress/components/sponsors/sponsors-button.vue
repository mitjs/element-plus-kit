<template>
    <div class="join">
        <el-tooltip placement="top" :hide-after="1000" :offset="20">
            <template #content>
                Please contact us via
                <a href="mailto:element-plus@outlook.com" target="_blank">
                    &nbsp;element-plus@outlook.com
                </a>
            </template>
            <a href="mailto:element-plus@outlook.com" target="_blank">
                <el-button style="overflow: hidden" :round="round">Become a Sponsor!</el-button>
            </a>
        </el-tooltip>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineProps<{ round?: boolean }>()
</script>