module.exports = {
    presets: ["@babel/preset-env"],
    ignore: ["./tests/test.js"],
    plugins: [
        "minify-constant-folding",
        "minify-dead-code-elimination",
        "transform-merge-sibling-variables",
        "transform-minify-booleans"
    ],
    shouldPrintComment: (val) => /@license|license|@preserve|@copyright/.test(val)
}
