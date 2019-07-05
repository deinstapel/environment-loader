# environment-loader

This is a loader for webpack to be able to load dynamic configurations. The goal is, that you can replace the "bundled" configuration with your own in your deployment. This allows you to use the same container for different deployments without rebuilding the entire applications with different environment variables.

## Usage

webpack.config.js
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /environment\.(json)$/,
                type: 'javascript/auto',
                use: [
                    '@deinstapel/environment-loader',
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: '/config/',
                            name: '[name].[ext]',
                        }
                    }
                ]
            }
        ]
    }
}
```

```javascript
   
import environment from "../config/environment.json"

environment.then((env) => {
    // Environment can be used  
})
```

## How it works

The `file-loader` places the file in the build directory to /config/environment.json and passes `module.exports = /config/environment.json` to the `@deinstapel/environment-loader`, which parses and loads the url and return a promise, which can be evaluated by the user later on.
