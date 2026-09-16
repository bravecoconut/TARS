rightConToggCon.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleRightConToggle()
})

settingsConToggCon.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleSettingsConToggle()
})

rightConToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleRightConToggle()
})

settingsConToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleSettingsConToggle()
})

leftConToggle.addEventListener("click", toggleLeftConToggle)


rightConNavDividerOne.addEventListener("click", openSessionRecap)
rightConNavDividerTwo.addEventListener("click", openDumpedDocuments)

rightConNavDividerTwo.addEventListener("click", openDumpedDocuments)

newTaskBtn.addEventListener("click", () => {
    currentSession = null
    messagesConMessagesCon.innerHTML = ""
    rightSRCon.innerHTML = ""
    rightDDConUploadedConEl.innerHTML = ""

    messagesConMessagesConHero.style.display = "flex"
})





messageConMainTextarea.addEventListener(
    "input",
    () => messageTextareaSize()
)

rightDDUploadConUploadNewEl.addEventListener(
    "click",
    () => {
        uploadDocumentForDumping()
    }

)



rightDDUploadConClearAll.addEventListener(
    "click",
    () => {
        toggleSure()
    }

)

rightDDUploadConClearAllSure.addEventListener(
    "click",
    async () => {
        if (!currentSession) {
            console.error("system need something to dumb file in.")
            showErrorModal(
                "open a session first",
                "system need something to dumb file in."
            )
            return
        }

        const clear = await clear_session_vectors(currentSession)
        if (!clear.status) {
            showErrorModal(
                "can't clear, something went wrong",
                JSON.stringify(clear.data),
            )
        }

        const object = await get_one_session(currentSession, 1, -1)
        if (!object.status) {
            showErrorModal(
                "can't get this session while reloading panel",
                JSON.stringify(object.data)
            )
        }

        populateDD(object.data.data.dumped_paths)

    }

)

messageConMainSendMessage.addEventListener(
    "click",
    async () => {
        await sendMessage()
    })

// Track whether user is scrolled to the bottom
messagesConEl.addEventListener("scroll", () => {
    userIsAtBottom = isUserAtBottom()
})
