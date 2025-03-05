<script setup lang="ts">
import { computed } from 'vue'
import ApiTyping from './vp-api-typing.vue'
import { isString } from 'lodash-es';

const props = defineProps({
    values: {
        type: Array,
        required: true,
    },
})

const processString = (s: unknown) => (isString(s) ? `'${s}'` : s)

const details = computed(() => props.values.map(processString).join(' | '))
</script>

<template>
    <api-typing type="enum" :details="details" />
</template>
