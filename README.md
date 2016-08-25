# 使用redux改写的github-explorer

# Introduction

刚学习了redux不久，恰好看到一个优秀的react项目[github-explorer][1]，该应用使用了RxJS去处理数据流，为了巩固学习便有了使用redux改写的想法。


[源码地址][2]
[DEMO地址][3]

## 自定义中间件

应用中使用了自定义个中间件**api**，方便编写异步的 action creators。异步action可以定义成以下方式

```
export function loadUserProfileRepos (username) {
  return {
    types: [USER_PROFILE_REPOS_REQUEST, USER_PROFILE_REPOS_RECEIVED, USER_PROFILE_REPOS_FAILURE],
    callAPI: () => api('fechURL`)
  }
}
```

中间件接收到这种形式的action，会处理异步请求并在适当的时候dispatch`types`中的各项。

## 其他
 
应用的拉取数据的进度条方面，负责拉取状态reducer在接收到诸如`xx_REQUEST`和`xx_RECEIVED`的actions后，会更新表示进度条状态的数据。

因为只是巩固redux学习，所以原应用的部分动画效果没有加上。

除了数据流部分，应用大部分都是照搬了原应用。


#dependencies
使用了redux后加上的依赖

 - redux
 - react-router-redux

# Development

开发

```
npm install
npm run start
```

打包

```
npm run dist
```

# Reference

[github-explorer][1]
[redux 文档][4]

  [1]: https://github.com/trungdq88/github-explorer
  [2]: https://github.com/cnu4/github-explorer-redux
  [3]: https://cnu4.github.io/github-explorer-redux
  [4]: http://cn.redux.js.org/index.html
