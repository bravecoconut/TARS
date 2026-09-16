async function sendMessage() {
    const currentUserInput = messageConMainTextarea.value
    const pickedFileHere = pickedFIles

    if (!currentSession) {
        const createSession = await create_session(currentUserInput)

        if (!createSession.status) {
            showErrorModal(
                "can't create session, something went wrong!",
                createSession.data
            )
        }


        currentSession = createSession.data.data.id

        sessionStart = 1
        sessionEnd = -1
        sessionsCon.innerHTML = ""
        await populateSessionsPanel()
        sessionsCon.scrollTo({
            top: 0,
            behavior: "smooth"
        })

    }

    const getSession = await get_an_agent(currentSession)
    const added = getSession?.data?.data?.running
    const message = {}
    message["role"] = "user"
    message["added"] = added

    if (pickedFileHere.length === 0) {
        message["content"] = currentUserInput
    } else {
        const content = []

        if (currentUserInput) {
            content.push({ type: "text", text: currentUserInput, tars: false })
        }


        pickedFileHere.forEach(file => {

            content.push({ type: "text", text: `Filename: ${file.fileName}`, tars: true })
            content.push({
                type: "image_url",
                image_url: { url: file.file64 }
            })

        });

        message["content"] = content
    }

    const uploadMessage = await create_message(currentSession, message)

    if (!uploadMessage.status) {
        showErrorModal("can't save message", uploadMessage.data)
        return
    }

    if (!getSession?.data?.data?.running) {
        await createAndFireAgent(currentSession)
    } else {
        await addMessageIntoRunningAgent(
            currentSession,
            message
        )
    }

}