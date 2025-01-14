import Button from '../packages/button/index.js'
import Divider from '../packages/divider/index.js'

const components = [Button, Divider]

const install = (Vue) => {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

export default {
    install,
    Button,
    Divider
}