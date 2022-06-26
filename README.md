# 腾讯云函数部署:

1. 克隆代码

```shell
  git clone https://github.com/ZiuChen/juejin-helper.git
```

2. 将 `juejin-helper` 重命名为 `src` 后进入 `src` 目录安装依赖

```shell
  mv juejin-helper src && cd src/ && npm i
```

## 函数入口:

保持默认: `index.main_handler`

## 环境变量:

见[iDerekLi/juejin-helper](https://github.com/iDerekLi/juejin-helper)

## 更新函数:

在 **根目录** 下执行:

```shell
  cd src && git pull
```

## 开发:

Branch `main` <-- Branch `tx-SCF`