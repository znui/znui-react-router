# znui-react-router
Router Component.

[![npm](https://img.shields.io/npm/v/znui-react-router.svg)](https://www.npmjs.com/package/znui-react-router)
[![npm](https://img.shields.io/npm/dm/znui-react-router.svg)](https://www.npmjs.com/package/znui-react-router)

## Demo

[Take a look at the demo](https://znui.github.io/znui-react-router/example/www/index.html)

## Installation

```bash
npm install znui-react-router -s
```

## Usage

```javascript

var ReactDOM = require('react-dom');
var router = require('../../src/index');
var _config = {
    main: '/a/a4',
    plugins: ['znui-react'],
    components: [],
    routes: {
        '/': require('./A/A1.js'),
        '/a/a1/:xxx/:bbb': require('./A/A1.js'),
        '/a/a2': {
            component: require('./A/A2.js'),
            routes: {
                '/a2.1': {
                    component: require('./A/a2/A2.1'),
                    routes: {
                        '/a2.1.1': require('./A/a2/a21/A2.1.1'),
                        '/a2.1.2': require('./A/a2/a21/A2.1.2')
                    },
                    exact: false
                },
                '/a2.2': require('./A/a2/A2.2')
            },
            exact: false
        },
        '/a/a3': {
            component: require('./A/A3.js'),
            exact: false
        },
        '/a/a4': require('./A/A4.js'),
        '/b/b1': require('./B/B1.js'),
        '/b/b2': require('./B/B2.js'),
        '/b/b3': require('./B/B3.js'),
        '/b/b4': require('./B/B4.js'),
        '/c/c1': require('./C/C1.js'),
        '/c/c2': require('./C/C2.js'),
        '/c/c3': require('./C/C3.js'),
        '/c/c4': require('./C/C4.js')
    }
};

znui.react.createApplication({
    render: <router.HashRouter {..._config} />
});

```

## License

MIT