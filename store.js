const SCRIPT_KEY = '_XHRI_SCRIPT'
const PROXY_KEY = '_XHRI_PROXY'

define(['immer'], ({ produce }) => {

    function update(state, action) {
        return produce(state, (draft) => {
            const script = action.payload || ''
            draft.script = script
            window.localStorage.setItem(SCRIPT_KEY, script)
        })
    }

    function start(state) {
        return produce(state, (draft) => {
            draft.proxyEnabled = true
            window.localStorage.setItem(PROXY_KEY, 'true')
        })
    }

    function stop(state) {
        return produce(state, (draft) => {
            draft.proxyEnabled = false
            window.localStorage.setItem(PROXY_KEY, 'false')
        })
    }

    function open(state) {
        return produce(state, (draft) => {
            draft.modalVisible = true
        })
    }

    function close(state) {
        return produce(state, (draft) => {
            draft.modalVisible = false
        })
    }

    //

    const reducers = {
        open,
        close,
        start,
        stop,
        update,
    }

    return {
        initialState: {
            modalVisible: false,
            proxyEnabled: window.localStorage.getItem(PROXY_KEY) === 'true',
            script: window.localStorage.getItem(SCRIPT_KEY),
        },
        reducer(state, action) {
            const handle = reducers[action.type]
            return typeof handle === 'function' ? handle(state, action) : state
        },
    }
})