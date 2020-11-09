module.exports = {
    presets: ["@babel/preset-env", "minify"],
    ignore: ["./tests/test.js"],
    shouldPrintComment: (val) => /@license|license|@preserve|@copyright/.test(val)
}
