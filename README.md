# vue-contacts

移动端页面，类似 iPhone 通讯录功能。实现了联系人按照拼音首字母分组、搜索联系人、滑动右侧字母列表联系人列表定位到对应位置。

[查看demo](http://mengyujing.com/vue-contacts/#/)  
> 移动端页面，使用 chrome 浏览器打开手机模拟，然后刷新页面，否则可能没有滑屏效果

* 使用 vue-cli 构建项目
* 使用 chinese-to-pinyin 插件，获取中文姓名拼音
* 使用 ES6 语法
* 使用 better-scroll 插件，实现滑屏  
> 滑屏功能开始使用的是 vue-scroller 插件，但是测试后发现，多次通过右侧字母列表定位联系人列表后，页面会无法滑动，控制台不报错，调试也没发现问题。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
