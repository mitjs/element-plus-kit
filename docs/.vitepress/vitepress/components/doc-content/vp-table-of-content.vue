<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { useToc } from '../../composables/use-top'

import tag from '../../../plugins/tag'
// import SponsorLarge from '../vp-sponsor-large.vue'

const localMd = MarkdownIt().use(tag)
const headers = useToc()
</script>

<template>
    <aside ref="container" class="toc-wrapper">
        <nav class="toc-content">
            <h3 class="toc-content__heading">Contents</h3>
            <ClientOnly>
                <el-anchor :offset="70" :bound="120">
                    <el-anchor-link v-for="{ link, text, children } in headers" :key="link" :href="link" :title="text">
                        <div v-html="localMd.render(text)" />
                        <template v-if="children" #sub-link>
                            <el-anchor-link v-for="{ link: childLink, text: childText } in children" :key="childLink"
                                :href="childLink" :title="text">
                                <div v-html="localMd.render(childText)" />
                            </el-anchor-link>
                        </template>
                    </el-anchor-link>
                </el-anchor>
            </ClientOnly>
        </nav>
    </aside>
</template>
<style scoped lang="scss">
.sponsors-button:deep {
    button {
        width: 100%;
    }
}
</style>
