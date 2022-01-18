# mdx-deck-hobbes-theme

A custom theme for use with [https://github.com/jxnblk/mdx-deck](mdx-deck).

## Usage

If you want to use this theme in your mdx-deck based presentations,
you will need to do the following 2 things:

1. add this dependency to your package.json

```javascript
{
  "dependencies": {
    "mdx-deck-hobbes-theme": "smunix/mdx-deck-hobbes-theme#main",
    // other dependencies...
  },
  "devDependencies": {
    "@babel/core": "^7.3.3",
    "@babel/preset-env": "^7.3.1",
    "@babel/preset-react": "^7.0.0",
    "file-loader": "^3.0.1",
    // other dev dependencies...
  }
  // more config ...
}
```

2. add the following webpack config:

```javascript
module.exports = {
  module: {
    rules: [
      // other rules ...
      {
        test: /\.(svg|png|jpg)$/,
        use: [{ loader: "file-loader" }]
      },
      {
        test: /node_modules\/mdx-deck-hobbes-theme\/*\.js/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/react", "@babel/env"],
          plugins: []
        }
      }
    ]
  }
  // other webpack-related config...
};
```
