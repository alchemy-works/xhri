define(['immer'], ({ produce }) => {

    function open(state, action) {
        return produce(state, (draft) => {
            draft.modalVisible = true
        })
    }

    function close(state, action) {
        return produce(state, (draft) => {
            draft.modalVisible = false
        })
    }

    //

    const reducers = {
        open,
        close,
    }

    return {
        initialState: {
            modalVisible: false,
        },
        reducer(state, action) {
            const handle = reducers[action.type]
            return typeof handle === 'function' ? handle(state, action) : state
        },
    }
})