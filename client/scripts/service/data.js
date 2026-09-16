async function streamHandler(sessionId) {
    if (currentSession !== sessionId) return
    if (streamingAgent[sessionId]) return // already streaming this session, don't start another

    const streamOfWhen = Date.now()
    streamingAgent[sessionId] = streamOfWhen

    try {
        await streamSessionAgent(sessionId, streamOfWhen)
    } finally {
        streamingAgent[sessionId] = null
    }
}

(async function mainAgentService() {
    while (true) {
        const allAgentsInBuffer = await get_all_agents()
        if (allAgentsInBuffer.status) {
            console.log(allAgentsInBuffer);

            allAgentsInBuffer["data"]["data"].forEach(async sessionId => {

                const agentInBuffer = await get_an_agent(sessionId)
                const sessionInCon = allSessions[sessionId]
                console.log(allSessions[sessionId])

                if (agentInBuffer.status) {
                    if (agentInBuffer.data.data.running) {
                        sessionInCon.firstElementChild.style.backgroundColor = "#0044ff"
                        sessionInCon.firstElementChild.style.borderRadius = "5vw"
                        makeBlink(sessionInCon.firstElementChild)
                        addShimmer(sessionInCon)

                        // streaming
                        await streamHandler(sessionId)

                    } else {
                        sessionInCon.firstElementChild.style.backgroundColor = "#000000"
                        sessionInCon.firstElementChild.style.borderRadius = ""
                        stopBlink(sessionInCon.firstElementChild)
                        removeShimmer(sessionInCon)

                    }

                }

                if (sessionId === currentSession) {      
                    stopResponsible(sessionId, agentInBuffer?.data?.data?.running)
                }

            });

        }
        await sleep(2000)
    }
})();