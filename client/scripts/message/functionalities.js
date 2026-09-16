const pickedFIles = [];

function updateImagesConVisibility() {
    if (pickedFIles.length > 0) {
        messageConMainImagesCon.style.height = deviceIs ? "24vw" : "4vw"
        messageConMainImagesCon.style.padding = deviceIs ? "2.5vw" : ".6vw .6vw .6vw 0.6vw"
    } else {
        messageConMainImagesCon.style.height = "0"
        messageConMainImagesCon.style.padding = "0"
    }
}

(function addMessageConMainImageInput() {
    // this stays invisible — it's just the mechanism, never shown to the user
    messageConMainOption.appendChild(messageConMainImageInput)

    messageConMainImageInput.type = "file"
    messageConMainImageInput.accept = "image/*"        // restricts picker to image files
    messageConMainImageInput.style.display = "none"     // hide the ugly native input
    messageConMainImageInput.accept = "image/png, image/jpeg, image/webp, image/gif"
    messageConMainImageInput.multiple = true

    // clicking your styled SVG button triggers the real file input
    messageConMainAddImage.addEventListener("click", () => {
        messageConMainImageInput.click()
    })

    // fires once the user actually picks a file
    messageConMainImageInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return // user cancelled the dialog

        files.forEach(file => {
            console.log("picked file:", file.name, file.type, file.size)

            // convert to a data URL so you can preview it / send it
            const reader = new FileReader()


            reader.onload = () => {
                const dataUrl = reader.result // "data:image/png;base64,...."
                console.log(dataUrl)

                const newImageMetaForAgent = {
                    "fileName": file.name,
                    "fileType": file.type,
                    "file64": dataUrl,
                }

                pickedFIles.push(newImageMetaForAgent)

                const newImageEl = messageConMainImagesEl.cloneNode(false)
                const newImage = messageConMainImagesImg.cloneNode(false)
                const newImageRemove = messageConMainImagesRemoveEl.cloneNode(true)

                newImage.src = dataUrl
                newImageRemove.addEventListener(
                    "click",
                    () => {
                        messageConMainImagesCon.removeChild(newImageEl)
                        const index = pickedFIles.indexOf(newImageMetaForAgent);
                        if (index !== -1) {
                            pickedFIles.splice(index, 1);
                        }
                        updateImagesConVisibility()
                    }
                )

                // messageConMainImagesCon.style.height = deviceIs ? "12vw" : "4vw"
                // messageConMainImagesCon.style.padding = deviceIs ? "2.5vw" : ".6vw .6vw .6vw 0.6vw"

                messageConMainImagesCon.appendChild(newImageEl)
                newImageEl.appendChild(newImage)
                newImageEl.appendChild(newImageRemove)

                if (newImage.height >= newImage.width) {
                    newImage.style.height = ""
                } else {
                    newImage.style.width = ""
                }

                updateImagesConVisibility()

            }

            reader.readAsDataURL(file)

            if (pickedFIles.length > 0) {
                messageConMainImagesCon.style.height = deviceIs ? "12vw" : "4vw"
                messageConMainImagesCon.style.padding = deviceIs ? "2.5vw" : ".6vw .6vw .6vw 0.6vw"
            } else {
                messageConMainImagesCon.style.height = 0
                messageConMainImagesCon.style.padding = 0
            }
        });
        // IMPORTANT: reset so picking the SAME file again still fires "change"
        messageConMainImageInput.value = ""

    })
})();



async function createAndFireAgent(sessionId) {
    const object = await get_one_session(sessionId, 1, -1)
    const rawMessages = object.data.data.messages

    console.log("rawMessages")
    console.log(rawMessages)

    const messageTillLastUser = getMessagesUntilLastUserMessage(
        rawMessages,
        true
    )

    messagesConMessagesCon.innerHTML = ""
    rightSRCon.innerHTML = ""
    messagesConMessagesConHero.style.display = "none"

    await populateMessagesCon(messageTillLastUser, sessionId)

    messageConMainTextarea.value = ""
    messageConMainImagesCon.innerHTML = ""

    pickedFIles.length = 0
    messageConMainImagesCon.style.height = 0
    messageConMainImagesCon.style.padding = 0
    messageTextareaSize()
    messageTextareaSize()
    messageTextareaSize()


    const messages = formatMessagesForOpenAI(rawMessages)
    console.log("messages")
    console.log(messages)


    messagesConMessagesCon.appendChild(messagesConIndicator)
    messagesConIndicator.textContent = "Creating new agent instance"
    const clearAgent = await clear_agent(sessionId)
    const createAgent = await create_agent(sessionId, messages)
    if (!createAgent.status) {
        showErrorModal(
            "can't create agent, something wrong",
            JSON.stringify(createAgent.data, null, 2)
        )
        return
    }

    messagesConIndicator.textContent = "Agent is going to be fire"
    const fireAgent = await fire_agent(sessionId)
    if (!fireAgent.status) {
        showErrorModal(
            "can't fire agent, something wrong",
            JSON.stringify(fireAgent.data, null, 2)
        )
        return
    }

    messagesConMessagesCon.removeChild(messagesConIndicator)

}

// (function sendMessage() {
//     messageConMainSendMessage.addEventListener(
//         "click",
//         async () => {
//             const currentUserInput = messageConMainTextarea.value

//             if (!currentSession) {
//                 const createSession = await create_session(currentUserInput)

//                 if (!createSession.status) {
//                     showErrorModal(
//                         "can't create session, something went wrong!",
//                         createSession.data
//                     )
//                 }


//                 currentSession = createSession.data.data.id

//                 sessionsCon.innerHTML = ""
//                 sessionStart = 1
//                 sessionEnd = -1
//                 await populateSessionsPanel()
//                 sessionsCon.scrollTo({
//                     top: 0,
//                     behavior: "smooth"
//                 })

//             }

//             const getSession = await get_an_agent(currentSession)

//             if (getSession?.data?.data?.running) {
//                 console.log("running")
//                 const message = {}
//                 const userBlockConImageCon = messagesConUserImagesCon.cloneNode(false)
//                 let hasImages = false

//                 if (pickedFIles.length > 0) {
//                     const content = []
//                     hasImages = true

//                     if (currentUserInput) {
//                         content.push({ type: "text", text: currentUserInput })
//                     }

//                     pickedFIles.forEach(file => {
//                         content.push({ type: "text", text: `Filename: ${file.fileName}` })
//                         content.push({
//                             type: "image_url",
//                             image_url: { url: file.file64 }
//                         })

//                         const userBlockUserImagesEl = messagesConUserImagesEl.cloneNode(false)
//                         userBlockUserImagesEl.src = file.file64
//                         userBlockConImageCon.appendChild(userBlockUserImagesEl)

//                     });

//                     message["content"] = content

//                 } else {
//                     console.log("running contnet")

//                     message["content"] = messageConMainTextarea.value
//                 }

//                 message["role"] = "user"
//                 message["added"] = true

//                 const addMessageIntoAgentInstance = await add_message_in_agent(currentSession, message)

//                 if (!addMessageIntoAgentInstance.status) {
//                     showErrorModal(
//                         "can't add message into agent's running instance",
//                         addMessageIntoAgentInstance.data
//                     )
//                 }

//                 const saveWithFlag = await create_message(
//                     currentSession,
//                     message
//                 )

//                 const userAddedBlockCon = messagesConUserAddedEl.cloneNode(false)
//                 userAddedBlockCon.innerHTML = marked.parse(messageConMainTextarea.value)
//                 messagesConMessagesCon.appendChild(userAddedBlockCon)
//                 if (hasImages) {
//                     messagesConMessagesCon.appendChild(userBlockConImageCon)
//                 }


//             }

//             messageConMainTextarea.value = ""
//             messageConMainImagesCon.innerHTML = ""
//             pickedFIles.length = 0
//             messageConMainImagesCon.style.height = 0
//             messageConMainImagesCon.style.padding = 0
//             messageTextareaSize()
//         }
//     )
// })();