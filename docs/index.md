---
layout: home

hero:
  name: ElementPlus Kit
  text: 摸鱼、开发两不误
  tagline: 🧬简单，灵活，高效。不信你试试
  image:
    src: logo.png
    alt: ElementPlus Kit
  actions:
   - theme: brand
     text: 🔎 什么是 ElementPlus Kit❔
     link: /doc/guide/design
   - theme: alt
     text: 快速开始
     link: /doc/guide/quickstart
   - theme: alt
     text: 🌟 Star 一下
     link: https://github.com/mitjs/element-plus-kit.git

features:
  - icon: 🌈
    title: 简单上手
  - icon: 🛠️
    title: 配置灵活
  - icon: ⚡️ 
    title: 开发提效
  - icon: 🙌
    title: 解放双手
  - icon: 🧮
    title: 丰富功能
  - icon: 🤏
    title: 做一个摸鱼开发
---


<script setup>
import DataPanel from './components/DataPanel.vue'
import Pay from './components/pay.vue'
</script>

<DataPanel/>
 <Pay/>
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe9e 50%, #47caff96  50%);
  --vp-home-hero-image-filter: blur(84px);
}
</style>
