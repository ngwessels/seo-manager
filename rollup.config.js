import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import sourcemaps from "rollup-plugin-sourcemaps";
// import typescript from "rollup-plugin-typescript2";

//Plugins
import json from "@rollup/plugin-json";

export default [
  {
    input: "./src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs"
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named"
      }
    ],
    plugins: [
      json(),
      postcss({
        plugins: [],
        minimize: true
      }),
      resolve(),

      external(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }),
      commonjs()
      // terser()
    ]
  },
  {
    input: "./src/frontend/components/SEOHelperLite/default.js",
    output: [
      {
        file: "dist/frontend/SEOHelperLite/index.js",
        format: "cjs"
      },
      {
        file: "dist/frontend/SEOHelperLite/index.es.js",
        format: "es",
        exports: "named"
      }
    ],
    plugins: [
      json(),
      postcss({
        plugins: [],
        minimize: true
      }),
      resolve(),

      external(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }),
      commonjs(),
      terser()
    ]
  },
  {
    input: "./src/frontend/components/SEOHelper/default.js",
    output: [
      {
        file: "dist/frontend/SEOHelper/index.js",
        format: "cjs"
      },
      {
        file: "dist/frontend/SEOHelper/index.es.js",
        format: "es",
        exports: "named"
      }
    ],
    plugins: [
      json(),
      postcss({
        plugins: [],
        minimize: true
      }),
      resolve(),

      external(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }),
      commonjs(),
      terser()
    ]
  },
  {
    input: "./src/frontend/components/RobotsHelper/default.js",
    output: [
      {
        file: "dist/frontend/RobotsHelper/index.js",
        format: "cjs"
      },
      {
        file: "dist/frontend/RobotsHelper/index.es.js",
        format: "es",
        exports: "named"
      }
    ],
    plugins: [
      json(),
      postcss({
        plugins: [],
        minimize: true
      }),
      resolve(),

      external(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }),
      commonjs(),
      terser()
    ]
  },
  {
    input: "./src/frontend/components/SitemapHelper/default.js",
    output: [
      {
        file: "dist/frontend/SitemapHelper/index.js",
        format: "cjs"
      },
      {
        file: "dist/frontend/SitemapHelper/index.es.js",
        format: "es",
        exports: "named"
      }
    ],
    plugins: [
      json(),
      postcss({
        plugins: [],
        minimize: true
      }),
      resolve(),

      external(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }),
      commonjs(),
      terser()
    ]
  },
  {
    input: "./src/backend/index.js",
    plugins: [
      // typescript({
      //   sourceMap: false
      // }),
      // sourcemaps()
      // babel({
      //   babelHelpers: "bundled",
      //   presets: []
      // })
      // json(),
      // postcss({
      //   plugins: [],
      //   minimize: true
      // }),
      // resolve(),
      // external(),
      // babel({
      //   exclude: "node_modules/**",
      //   presets: ["@babel/preset-react", "@babel/preset-typescript"],
      //   plugins: ["@babel/plugin-proposal-class-properties"]
      // }),
      // commonjs()
      json(),
      resolve(),

      external(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        plugins: ["@babel/plugin-proposal-class-properties"]
      }),
      commonjs()
      // terser()
    ],
    output: [
      {
        file: "dist/backend/index.js",
        format: "cjs"
      },
      {
        file: "dist/backend/index.es.js",
        format: "es"
      }
    ]
  }
];
