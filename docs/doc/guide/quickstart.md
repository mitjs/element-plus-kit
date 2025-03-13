# 快速开始​
本节将介绍如何在项目中使用 Element Plus。
## 安装
:::danger 安全前必读
`@meetjs/element-plus-kit` 是基于 `element-plus` 进行的二次封装，所以在使用前请先安装 `element-plus`。
:::

### 库版本支持
:::tip 相关库版本

- **Element-Plus**：**`2.4.x`**
- **Vue**：**`3.x`**
- **Node**: **`>= 18.0.0`**

:::
### 安装 element-plus  
`Element Plus`安装 👉 [点击前往](https://element-plus.org/zh-CN/guide/installation.html)

### 安装 element-plus-kit
```shell
# npm
npm install @meetjs/element-plus-kit --save

# yarn
yarn add @meetjs/element-plus-kit

# pnpm
pnpm add @meetjs/element-plus-kit
```

## 用法​

### 完整引入
完整引入
```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElementPlusKit from '@meetjs/element-plus-kit' // [!code focus] // [!code ++] 
import 'element-plus-kit/style.css'  // [!code focus] // [!code ++]  

const app = createApp(App)
app.use(ElementPlus)
app.use(ElementPlusKit) // [!code focus] // [!code ++] 
```

#### 组件使用
```vue
<template>
    <q-form ref="formRef" :model="FormValue" :form-options="formOptions" /> // [!code focus] // [!code ++] 
    <q-table  :data="data" :columns="columns"  /> // [!code focus] // [!code ++] 
</template>
```
### 按需导入

```vue

<template>
    <q-form ref="formRef" :model="FormValue" :form-options="formOptions" /> // [!code focus] // [!code ++] 
    <q-table  :data="data" :columns="columns"  /> // [!code focus] // [!code ++] 
</template>

<script setup lang="ts" > 
import { QForm , QTable } from '@meetjs/element-plus-kit' // [!code focus] // [!code ++] 
</script>
```