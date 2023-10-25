<template>
    <div>
        <ul>
            <li v-for="item of stepList">{{ item.label }}</li>
        </ul>
    </div>
</template>
<script setup lang="ts" name="Single">
import { ref } from 'vue'
const selectVlaue = ref<any>()
const stepList = [
    { label: '开始' },
    { label: 'POSUI' },
    { label: '11' },
    { label: 'GX123' },
    { label: '烘干破碎' },
    { label: '车间仓库' },
    { label: 'ui3333' },
    { label: 'hhh333' },
]
const selectChange = (val: any) => {
    console.log('selectChange', val, selectVlaue.value)
}
</script>
  