# 设计

## 设计背景

`Element Plus` UI组件库是国内不少公司和个人开发者在日常开发过程中使用的首选组件库之一，它拥有丰富的组件，给开发者和使用者都带来了不少的便利和更丰富的视觉体验。 但是，我在使用 `Element Plus` 组件的过程中也会有很多的苦恼，比如在使用`表单组件`和`表格组件`时，页面上大篇幅的组件带来让下一个开发者阅读起来很难受，甚至连自己写的代码，过段时间打开的时候，都会有阵阵恶心袭来；所以我在想能不能让代码看起来更美观、更简洁、更易读、更易维护，于是便设计了这个小工具。

## 设计初衷
了解了以上背景，你大概也就知道，我为什么要做这样一个轮子出来吧。如果你有跟我一样的困惑，你快来试试吧，如果用的不爽你就**把屎山扔我脸上**。

## 设计原则
### 简单
  - 页面简单：让组件页面尽可能的简单，减少页面不必要的代码冗余；
  - 使用简单：简单的配置，即可出效果，无需在官方来回的复制、粘贴重复不必要代码；
### 提效
  - 尽最大可能的减少代码量，减少重复代码，提高开发效率；
  - 让开发者可以在摸鱼的同时完成任务；
### 一致
 - 风格统一：和官网保持统一的设计风格；
 - 代码统一：和官网保持组件配置保持一致，减少学习成本。
### 可配置
 - 通过配置项，可以快速定制组件，满足不同的业务需求；
 - 用最少的配置实现最多的功能；

