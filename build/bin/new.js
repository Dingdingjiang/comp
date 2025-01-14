process.on('exit', () => {
  console.log('exit')
})

if (!process.argv[2]) {
  console.error('请输入要创建的组件名')
  process.exit(1);
}

const path = require('path');
// const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentName = uppercamelcase(process.argv[2]);
const packagePath = path.resolve(__dirname, '../../packages', componentName);

const componentsFile = require('../../components.json');
if(componentsFile[componentName]) {
  console.log('组件已存在');
  process.exit(1);
}
// 添加componets.json
componentsFile[componentName] = `./packages/${componentName}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
        .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
        .end('\n');
        
// 创建scss主文件
const sassIdxPath= path.resolve(__dirname, '../../packages/theme-chalk/src/index.scss');
// const sassIndexContent = `${fs.readFileSync(sassIdxPath)}@use "./${componentName}.scss";`;
const sassIndexContent = Object.keys(componentsFile).map(name => `@use "./${name}.scss";`).join('\n');
fileSave(sassIdxPath)
  .write(sassIndexContent, 'utf8')
  .end('\n');

const files = [
  {
    filename: 'index.js',
    content: `import ${componentName} from './src/${componentName}.vue'; 

${componentName}.install = function(Vue) {
  Vue.component(${componentName}.name, ${componentName});
};

export default ${componentName};`
  },
  {
    filename: `src/${componentName}.vue`,
    content: `<template>
  <div class="my-${componentName}"></div>
</template>

<script>  
export default {
  name: 'My${componentName}'
}
</script>

<style lang="scss">
</style>`
  },
  {
    filename: path.join('../../packages/theme-chalk/src', `${componentName}.scss`),
    content: `@use '../common/var.scss';
@use '../common/mixins.scss';

.my-${componentName} {
  
}`
  }
]

files.forEach(file => {
  fileSave(path.resolve(packagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
})
