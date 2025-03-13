import type { App, Plugin } from 'vue'

import { each } from 'lodash-es'

type SFCWidthInstall<T> = T & Plugin;

export function makeInStaller(components: Plugin[]) {
    const installer = (app: App) => {
        each(components, (c) => app.use(c))
    }

    return installer as Plugin
}

export const withInstall = <T>(component: T) => {
    const comp = component as SFCWidthInstall<T>
    comp.install = (app: App) => {
        const name = (component as any).name;
        app.component(name, comp as Plugin)
    }
    return comp as SFCWidthInstall<T>
}