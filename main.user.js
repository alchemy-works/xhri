// ==UserScript==
// @name                xhri
// @description         xhri
// @version             0.0.1
// @namespace           https://github.com/alchemy-works
// @author              Alchemy Works
// @include             /us=xhri/
// @require             https://unpkg.com/ajax-hook@2.0.3/dist/ajaxhook.min.js
// @require             https://unpkg.com/requirejs@2.3.6/require.js
// @icon                https://alchemy-works.github.io/favicon.ico
// @license             MIT
// @run-at              document-end
// @grant               unsafeWindow
// ==/UserScript==

;(function () {
    'use strict'

    function ss(strings, ...keys) {
        return strings
            .map((s, i) => i < keys.length ? s + keys[i] : s)
            .join('')
            .replace(/\.js$/, '')
            .trim()
    }

    function main() {
        const baseUrl = location.href.includes('localhost') ? '' : 'https://alchemy-works.github.io/xhri/'

        requirejs.config({
            baseUrl,
            waitSeconds: 30,
            urlArgs: 'bust=' + new Date().getTime(),
            enforceDefine: true,
            paths: {
                'immer': ss`https://unpkg.com/immer@9.0.6/dist/immer.umd.production.min.js`,
                '@emotion/css': ss`https://unpkg.com/@emotion/css@11.1.3/dist/emotion-css.umd.min.js`,
                'htm': ss`https://unpkg.com/htm@3.1.0/dist/htm.umd.js`,
                'moment': ss`https://unpkg.com/moment@2.29.1/min/moment.min.js`,
                'react': ss`https://unpkg.com/react@17.0.2/umd/react.production.min.js`,
                'react-dom': ss`https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js`,
            },
        })

        require(['react', 'react-dom', './App'], (
            { createElement },
            { render },
            App,
        ) => {
            const divRef = document.createElement('div')
            document.body.appendChild(divRef)
            render(createElement(App), divRef)
        })
    }

    main()
})();