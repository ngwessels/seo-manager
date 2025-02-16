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
        sourcemap: false
      },
      {
        file: "dist/index.es.js",
        format: "es",
        sourcemap: false
      }
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true
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
    ]
  },
  {
    input: "src/init.ts",
    output: [
      {
        file: "dist/init.cjs",
        format: "cjs",
        sourcemap: false
      },
      {
        file: "dist/init.es.js",
        format: "es",
        sourcemap: false
      }
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true
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
    ]
  },
  {
    input: "./src/robotshelper/default.mjs",
    output: [
      {
        file: "dist/robotshelper/index.cjs",
        format: "cjs",
        sourcemap: false
      },
      {
        file: "dist/robotshelper/index.es.js",
        format: "esm",
        sourcemap: false
      }
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        tsconfigDefaults: {
          declaration: true,
          declarationDir: "./dist"
        }
      }),
      json(),
      commonjs(),
      babel({
        exclude: "node_modules/**"
      }),
      cleanup({ include: [".js", ".mjs", ".jsx", ".ts", ".tsx"] }),
      terser({ compress: true })
    ]
  },
  {
    input: "./src/sitemapshelper/default.mjs",
    output: [
      {
        file: "dist/sitemapshelper/index.cjs",
        format: "cjs",
        sourcemap: false
      },
      {
        file: "dist/sitemapshelper/index.es.js",
        format: "esm",
        sourcemap: false
      }
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        tsconfigDefaults: {
          declaration: true,
          declarationDir: "./dist"
        }
      }),
      json(),
      commonjs(),
      babel({
        exclude: "node_modules/**"
      }),
      cleanup({ include: [".js", ".mjs", ".jsx", ".ts", ".tsx"] }),
      terser({ compress: true })
    ]
  },
  {
    input: "./src/seohelper/default.mjs",
    output: [
      {
        dir: "dist/seohelper",
        format: "esm",
        sourcemap: false
      }
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true
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
      commonjs(),

      cleanup({ include: [".js", ".mjs", ".jsx", ".ts", ".tsx"] }),
      babel({
        exclude: "node_modules/**"
      }),
      terser({ compress: true }),
      analyze({ onAnalysis, skipFormatted: true })
    ],
    external: ["react", "react-dom"]
  },

  {
    input: "./src/seomanager/index.tsx",
    output: [
      {
        dir: "dist/seo-manager",
        format: "esm",
        sourcemap: false
      }
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true
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
