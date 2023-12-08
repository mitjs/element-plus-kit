<template>
    <div class="">
        <QuickTable :data="data" :columns="columns" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { QuickTable } from 'meetjs-design';
const data = ref([])
const columns = ref([

])

</script>
<style lang="scss" scoped></style>