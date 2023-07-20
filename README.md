# Anytype
适用于MacOS、Linux和Windows的官方Anytype客户端。

## 使用源码构建程序
### 安装

```shell
git clone git@github.com:anyproto/anytype-ts.git
cd anytype-ts
npm install -D
```

Also, [install `gitleaks`](https://github.com/zricethezav/gitleaks#installing) to ensure proper work of pre-commit hooks.

### Install middleware library and protobuf bindings
Fetch the latest binary from the [github releases](https://github.com/anytypeio/go-anytype-middleware/releases/latest)

```shell
./update.sh <GITHUB_USER> <GITHUB_TOKEN> <macos-latest|ubuntu-latest|windows-latest>
```
	
Or compile from the source code. Follow instructions at [`anytype-heart`](https://github.com/anyproto/anytype-heart#how-to-build).

### 编译

首先需要编译 [`anytype-heart`](https://github.com/anyproto/anytype-heart).

```shell
npm run dist:(mac|win|linux)
```

选项:
- `ELECTRON_SKIP_NOTARIZE=1` — 跳过MacOS公证流程

## 运行

在本地运行Anytype之前, 你需要编译 [`anytype-heart`](https://github.com/anyproto/anytype-heart).

### MacOS, Linux
```shell
SERVER_PORT=<PORT> ANYPROF=:<PROFILER_PORT> npm run start:dev
```

### Windows
```shell
SERVER_PORT=<PORT> ANYPROF=:<PROFILER_PORT> npm run start:dev-win
```

选项:
- `SERVER_PORT` — NPM变量，本地服务器端口
- `ANYPROF` — Go variable, profiler port, access `http://localhost:<PORT>/debug/pprof/profile?seconds=30` for profiling

## Contribution
Thank you for your desire to develop Anytype together. 

Currently, we're not ready to accept PRs, but we will in the nearest future.

Follow us on [Github](https://github.com/anyproto) and join the [Contributors Community](https://github.com/orgs/anyproto/discussions).

---
Made by Any — a Swiss association 🇨🇭

Licensed under [Any Source Available License 1.0](./LICENSE.md).
