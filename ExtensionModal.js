define(['./html', '@emotion/css', './antd', 'react'], (
    html,
    { css },
    { Modal, Button, Input, Space, message },
    { useEffect },
) => {

    const _ExtensionModal = css`
      img {
        width: 100%;
      }

      div.button-line {
        text-align: right;
      }
    `

    const { TextArea } = Input

    return (props) => {

        const modalProps = {
            title: 'XMLHttpRequest Interceptor ',
            footer: null,
            visible: props.state.modalVisible,
            width: 1000,
            onCancel() {
                props.dispatch({ type: 'close' })
            },
            wrapClassName: _ExtensionModal,
        }


        function handleStartProxy() {
            try {
                new Function(props.state.script).call(window)
                message.info('Proxy started')
                props.dispatch({ type: 'start' })
            } catch (err) {
                message.error(err.message)
            }
        }

        useEffect(() => {
            if (props.state.proxyEnabled) {
                handleStartProxy()
            }
        }, [])

        function handleStopProxy() {
            window.ah.unProxy()
            props.dispatch({ type: 'stop' })
        }

        function handleUpdateScript(ev) {
            props.dispatch({
                type: 'update',
                payload: ev.target.value,
            })
        }

        return html`
            <${Modal} ...${modalProps}>
                <${Space} direction="vertical" style=${{ width: '100%' }}>
                    <${TextArea} value=${props.state.script} onChange=${handleUpdateScript}
                                 autoSize=${{ minRows: 12, maxRows: 16 }}/>
                    <div class="button-line">
                        <${Space}>
                            <${Button} disabled=${props.state.proxyEnabled} 
                                       style=${{ height: '40px' }} type="primary" 
                                       onClick=${handleStartProxy}>
                                开始代理
                            </Button>
                            <${Button} disabled=${!props.state.proxyEnabled} 
                                       onClick=${handleStartProxy}
                                       style=${{ height: '40px' }} danger onClick=${handleStopProxy}>
                                停止代理
                            </Button>
                        </Space>
                    </div>
                </Space>
            </Modal>
        `
    }
})