## 腾讯云函数部署

1. 创建函数:

从头开始 / 事件函数 / 环境`Nodejs16` / 内存`64MB` / 勾选异步执行 / 执行超时时间`86400` / 参数填入环境变量

**其余内容保持默认** 可根据实际情况配置`触发器`定时执行

2. 克隆代码:

使用腾讯云函数的 在线编辑器 点击 `终端/新终端` 并按步骤键入以下代码

```shell
  git clone https://github.com/ZiuChen/juejin-helper.git
```

3. 安装依赖:

将 `juejin-helper` 重命名为 `src` 后进入 `src` 目录安装依赖

```shell
  mv juejin-helper src && cd src/ && npm i
```

### 环境变量

见[iDerekLi/juejin-helper](https://github.com/iDerekLi/juejin-helper)

### 更新函数

在 **根目录** 下执行:

```shell
  cd src && git pull
```

## 开发相关

Branch `main` <-- Branch `tx-SCF`