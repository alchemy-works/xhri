define(['./html', '@emotion/css', './antd'], (html, { css }, { Modal }) => {

    const _ExtensionModal = css`
      img {
        width: 100%;
      }

      .ant-modal-body {
        padding: 0;
      }
    `

    return (props) => {

        const modalProps = {
            title: 'Extension',
            footer: null,
            visible: props.state.modalVisible,
            width: 1000,
            onCancel() {
                props.dispatch({ type: 'close' })
            },
            wrapClassName: _ExtensionModal,
        }

        return html`
            <${Modal} ...${modalProps}>
                <h1>
                    xhri
                </h1>
            </Modal>
        `
    }
})