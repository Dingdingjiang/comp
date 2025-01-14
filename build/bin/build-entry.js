var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var endOfLine = require('os').EOL;

// 模板
var preTemplate = `
{{include}};

const components = [
{{list}}
];

const install = (Vue) => {
  components.forEach(component => {
    Vue.use(component);
  });
};

export default {
  install,
{{list}}
};
`;

// 生产模板字段
var CompnontsFile = require('../../components.json');
var ComponentsName = Object.keys(CompnontsFile);
var IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
var includeComponentTemplate = [];
var listTemplate = [];

ComponentsName.forEach(name => {
  var componentName = uppercamelcase(name);
  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));
  listTemplate.push(`  ${componentName}`);
});


var template = render(preTemplate, {
  include: includeComponentTemplate.join(endOfLine),
  list: listTemplate.join(','+endOfLine)
});

// 写入文件
const path = require('path');
const fs = require('fs');
var OUTPUT_PATH = path.resolve(__dirname, '../../src/index.js');
fs.writeFileSync(OUTPUT_PATH, template);