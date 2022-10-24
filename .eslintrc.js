module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/recommended", "plugin:vuetify/base"],
  rules: {
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "never",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vuetify/no-deprecated-classes": "error",
    "vue/multi-word-component-names": 0,
    "vuetify/no-legacy-grid": "error",
    "vue/max-attributes-per-line": [
      0,
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
  },
};
