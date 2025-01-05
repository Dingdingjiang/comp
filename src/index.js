import Button from '../packages/button/index.js'

const components = [Button]

const install = (Vue) => {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

export default {
    install,
    Button
}