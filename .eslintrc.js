module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    // "vue/html-self-closing": [
    //   "error",
    //   {
    //     html: {
    //       void: "never",
    //       normal: "always",
    //       component: "always",
    //     },
    //     svg: "always",
    //     math: "always",
    //   },
    // ],
    "vue/multi-word-component-names": 0,
    "vue/max-attributes-per-line": "off",

    // "vue/max-attributes-per-line": [

    // 0,
    // {
    //   singleline: {
    //     max: 1,
    //   },
    //   multiline: {
    //     max: 2,
    //   },
    // },
    // ],
  },
};
