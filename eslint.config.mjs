import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node, // Node.js 전역 객체 (React Native에서 유사)
        ...globals.es2021, // 최신 ECMAScript 전역 객체
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off", // require() 허용
      "react-hooks/exhaustive-deps": "warn", // useEffect 의존 배열 경고
      "no-unused-vars": "error", // 사용되지 않는 변수 오류
      "react/prop-types": "off", // React Native에서는 PropTypes 대신 TS 권장
      "react/react-in-jsx-scope": "off", // React 17+ 및 React Native에서는 필요 없음
      "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx", ".ts", ".tsx"] }], // JSX 파일 확장자 허용
    },
    settings: {
      react: {
        version: "detect", // React 버전 자동 감지
      },
    },
  },
  js.configs.recommended, // 기본 JS 규칙
  ...tseslint.configs.recommended, // TypeScript 규칙
];
