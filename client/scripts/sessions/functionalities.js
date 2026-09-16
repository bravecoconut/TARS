async function openSession(session_id) {
    const object = await get_one_session(session_id, 1, -1)

    if (!object.status) {
        showErrorModal(
            "can't open this session",
            JSON.stringify(object.data)
        )
        return
    }



    currentSession = session_id

    const agentInBuffer = await get_an_agent(session_id)

    if (agentInBuffer?.data?.data?.running) {

        const tillLastUserMessage = getMessagesUntilLastUserMessage(object.data.data.messages, true)
        await populateMessagesCon(tillLastUserMessage, session_id)
        console.log(tillLastUserMessage)
    } else {

        await populateMessagesCon(object.data.data.messages, session_id)
        populateDD(object.data.data.dumped_paths)

    }

};

