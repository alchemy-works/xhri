const SCRIPT_KEY = '_XHRI_SCRIPT'
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
        })
    }

    function stop(state) {
        return produce(state, (draft) => {
            draft.proxyEnabled = false
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
            proxyEnabled: false,
            script: window.localStorage.getItem(SCRIPT_KEY),
        },
        reducer(state, action) {
            const handle = reducers[action.type]
            return typeof handle === 'function' ? handle(state, action) : state
        },
    }
})