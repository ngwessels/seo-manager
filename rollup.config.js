// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
// import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import { babel } from "@rollup/plugin-babel";
// import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import cleanup from "rollup-plugin-cleanup";

import analyze from "rollup-plugin-analyzer";

const limitBytes = 1e6;
const onAnalysis = ({ bundleSize }) => {
  if (bundleSize < limitBytes) return;
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`);
  return process.exit(1);
};

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/index.es.js",
        format: "es",
        sourcemap: true
      }
    ],
    plugins: [
      // resolve({ jsnext: true, main: true, browser: true, }),
      // nodeResolve(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        tsconfigDefaults: {
          declaration: true,
          declarationDir: "./dist"
        },
        exclude: "node_modules/**"
      }),
      commonjs(),
      cleanup({ include: [".js", ".mjs", ".jsx", ".ts", ".tsx"] }),
      babel({
        exclude: "node_modules/**"
      }),
      terser({ compress: true })
      // analyze({ onAnalysis, skipFormatted: true })
    ]
  },
  {
    input: "./src/frontend/index.mjs",
    output: [
      {
        file: "dist/helpers/index.cjs",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/helpers/index.es.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        tsconfigDefaults: {
          declaration: true,
          declarationDir: "./dist"
        }
      }),
      postcss({
        plugins: [],
        minimize: true
      }),
      json(),
      // resolve({ jsnext: true, main: true, browser: true }),
      commonjs(),
      babel({
        exclude: "node_modules/**"
      }),
      cleanup({ include: [".js", ".mjs", ".jsx", ".ts", ".tsx"] }),
      terser({ compress: true }),
      analyze({ onAnalysis, skipFormatted: true })
    ]
  },
  {
    input: "./src/frontend/components/SEOHelper/index.mjs",
    output: [
      {
        file: "dist/seohelper/index.es.js",
        format: "esm",
        sourcemap: false
      },
      {
        file: "dist/seohelper/index.cjs",
        format: "cjs",
        sourcemap: false
      }
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        tsconfigDefaults: {
          declaration: true,
          declarationDir: "./dist"
        }
      }),
      postcss({}),
      json(),
      // resolve({ jsnext: true, main: true, browser: true }),
      commonjs(),

      cleanup({ include: [".js", ".mjs", ".jsx", ".ts", ".tsx"] }),
      babel({
        exclude: "node_modules/**"
      }),
      terser({ compress: true }),
      analyze({ onAnalysis, skipFormatted: true })
    ],
    external: ["react", "react-dom"]
  }
];
