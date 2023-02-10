import React, { useState, useEffect } from 'react'

function useToolsModule() {
    const [tools, setTools] = useState()
    useEffect(() => {
        System.import('@mic-demo/tools').then(setTools)
    }, [])
    return tools
}

const Home = () => {
    const tools = useToolsModule();
    useEffect(() => {
        let subjection = null
        if (tools) {
            tools.consoleFunc('react yyds')
            subjection = tools.sharedSubject.subscribe(console.log)
        }
        return () => {
            subjection && subjection.unsubscribe()
        }
    }, [tools])

    const handleClick = () => {
        tools.sharedSubject.next('this is state')
    }

    return (
        <div>
            Home
            <div>
                <button onClick={handleClick}>click me</button>
            </div>
        </div>
    )
}

export default Home
