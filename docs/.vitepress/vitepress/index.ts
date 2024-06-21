// import "normalize.css";
import type { Component } from 'vue'
import './style/css-vars.scss'
import './style/index.scss'

import VPDemo from "./components/vp-demo/index.vue";
import ApiExternalType from './components/globals/vp-api-external.vue'
import ApiTyping from './components/globals/vp-api-typing.vue'
import ApiFunctionType from './components/globals/vp-api-function.vue'
import ApiBooleanType from './components/globals/vp-api-bool.vue'
import ApiStringType from './components/globals/vp-api-string.vue'
import ApiNumberType from './components/globals/vp-api-number.vue'
import ApiRefType from './components/globals/vp-api-ref.vue'
import ApiEnumType from './components/globals/vp-api-enum.vue'
export { default as NotFound } from './components/vp-not-found.vue'

export const globals: [string, Component][] = [
    ['Demo', VPDemo],
    ['ExternalType', ApiExternalType],
    ['ApiTyping', ApiTyping],
    ['FunctionType', ApiFunctionType],
    ['EnumType', ApiEnumType],
    ['BooleanType', ApiBooleanType],
    ['StringType', ApiStringType],
    ['NumberType', ApiNumberType],
    ['RefType', ApiRefType],
];
