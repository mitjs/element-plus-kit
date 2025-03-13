<script setup lang="ts">
import { computed } from 'vue'
import { isClient } from '@vueuse/core'

const goHome = () => {
    if (!isClient) return
    window.location.href = `/en-US/`
}
</script>

<template>
    <el-result icon="error" title="Resource not found" sub-title="The page you requested does not exist">
        <template #extra>
            <el-button @click="goHome">Back to Home</el-button>
        </template>
    </el-result>
</template>

<style scoped>
.el-result {
    height: 100vh;
    width: 100vw;
}
</style>
