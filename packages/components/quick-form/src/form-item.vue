<template>
    <el-form-item :label="isString(label) ? label : null" :prop="prop" v-bind="formItem">
        <template v-if="isFunction(label)" #label>
            <component :is="label" />
        </template>
        <QFormComp :label="isString(label) ? label : ''" :type="type" :prop="prop" :formValue="formValue"
            :options="options" :orgAttrs="attrs" :readonly="readonly" />
    </el-form-item>
</template>

<script lang="ts" setup>
import { isArray, isFunction, isString } from "lodash-es";
import { defineProps, toRefs, watch } from 'vue'
import type { ItemRowProps } from './types'
import QFormComp from './qf-component'

const props = defineProps<Omit<ItemRowProps, 'col' | 'vIf'> & { formValue: Indexable, readonly?: boolean }>()

const { type, label, prop, formItem, options, attrs, formValue, readonly } = toRefs(props)

</script>
<style lang="scss" scoped></style>