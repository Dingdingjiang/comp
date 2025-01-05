import MyButton from './src/button.vue'

MyButton.install = function(Vue) {
    Vue.component(MyButton.name, MyButton)
}

export default MyButton