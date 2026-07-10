# 标冻中央计划中心

采购计划、报价协同和供应商报价的端到端交互原型。

## 本地运行

```bash
npm ci
npm run dev
```

## 构建

```bash
npm run build
```

## GitHub Pages

仓库使用 `main/docs` 发布 GitHub Pages。更新原型后执行：

```bash
npm run build -- --outDir docs
git add docs
git commit -m "Update prototype"
git push
```
