var fs = require('fs');
var path = require('path');
var Components = require('../../components.json');
Components = Object.keys(Components);

/**
 * 'theme-chalk': 表示自动生成的是 .scss 文件
 * 'theme-default': 表示自动生成的是 .css 文件
 */

var themes = ['theme-chalk'];

var bashpath = path.resolve(__dirname, '../../packages/');

function fileExists(filePath) {
    try {
      return fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
}

themes.forEach((theme) => {
  var isSCSS = theme !== 'theme-default';

  var skipComps = ['icon', 'option', 'option-group'];
  
  Components.forEach(function(key) {
    if (skipComps.indexOf(key) !== -1) return;
    var fileName = key + (isSCSS ? '.scss' : '.css');
    var filePath = path.resolve(bashpath, theme, 'src', fileName);
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, '遗漏的', key, '文件已补全');
    }
  });
});