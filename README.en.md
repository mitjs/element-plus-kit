
<p align="center">
  <img width="300px" src="https://element-plus-kit.netlify.app/logo.png">
</p>

Element-Plus-Kit 是一个基于 Element-Plus 二次封装的插件库，它可以帮助开发者快速构建高质量的 Vue 3 应用程序。

# Getting Started

使用文档地址：[element-plus-kit](https://element-plus-kit.netlify.app/)

## Installation

```bash
# npm
npm install @meetjs/element-plus-kit --save

# yarn
yarn add @meetjs/element-plus-kit

# pnpm
pnpm add @meetjs/element-plus-kit

```

## Usage

```ts
import ElementPlusKit from '@meetjs/element-plus-kit' 
import 'element-plus-kit/dist/index.css' 

app.use(ElementPlusKit)
```

```html
<template>
    <q-form ref="formRef" :model="FormValue" :form-options="formOptions" /> 
    <q-table  :data="data" :columns="columns"  /> 
</template>
```