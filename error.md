# エラーの対処

## 目次

[プロパティ 'productDetail' は型 'JSX.IntrinsicElements' に存在しません](#プロパティ-productdetail-は型-jsxintrinsicelements-に存在しません)

---

## *プロパティ 'productDetail' は型 'JSX.IntrinsicElements' に存在しません*

> コンポーネントを大文字から始めないといけない  
> [引用元](https://ja.legacy.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)

```tsx
import productDetail from "@/productDetail";      //*
import React from "react";

function DetailPage() {
  return (
    <div>
      <productDetail />     //**
    </div>
  );
};

export default DetailPage;
```

```diff
*
- import productDetail from "@/productDetail";
+ import ProductDetail from "@/productDetail";

**
- <productDetail />
+ <ProductDetail />
```

---

[top](#エラーの対処)  
