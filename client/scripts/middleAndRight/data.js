const messagesRecords = {}

function populateDD(fileMetas) {
    try {
        rightDDConUploadedConEl.innerHTML = ""

        fileMetas.forEach(fileMeta => {

            if (!fileMeta) {
                return
            }
            const uploadedCon = rightDDConUploadedCon.cloneNode(false)
            const uploadedConName = rightDDConUploadedNameCon.cloneNode(false)
            const uploadedConMetaCon = rightDDConUploadedMetaCon.cloneNode(false)
            const uploadedConMetaSize = rightDDConUploadedMetaConSize.cloneNode(false)
            const uploadedConMetaVectors = rightDDConUploadedMetaConVectors.cloneNode(false)
            const uploadedConMetaUploaded = rightDDConUploadedMetaConUploaded.cloneNode(false)

            uploadedConName.textContent = fileMeta.file_name
            uploadedConMetaSize.textContent = formatBytes(fileMeta.file_size)
            uploadedConMetaVectors.textContent = `${fileMeta.chunks} embeddings`
            uploadedConMetaUploaded.textContent = epochToLocalTime(fileMeta.created)

            rightDDConUploadedConEl.prepend(uploadedCon)
            uploadedCon.appendChild(uploadedConName)
            uploadedCon.appendChild(uploadedConMetaCon)
            uploadedConMetaCon.appendChild(uploadedConMetaSize)
            uploadedConMetaCon.appendChild(uploadedConMetaVectors)
            uploadedConMetaCon.appendChild(uploadedConMetaUploaded)


        });
    } catch (e) {
        showErrorModal(
            "somethin went wrong while pupulating Dump section",
            String(e)
        )
    }
};

async function uploadDocumentForDumping() {
    try {

        if (!currentSession) {
            console.error("system need something to dumb file in.")
            showErrorModal(
                "open a session first",
                "system need something to dumb file in."
            )
            return
        }

        if (
            !selectedFile["fileName"] &&
            !selectedFile["fileSize"] &&
            !selectedFile["fileText"]
        ) {
            console.error("you can't upload a file without even selecting it first.")

            showErrorModal(
                "select a file",
                "you can't upload a file without even selecting it first."
            )
            return

        }

        if (!rightDDUploadConDetailsChaPerChunk.value) {
            console.error("System can't split the document into chunks when chunk size is zero or empty.")

            showErrorModal(
                "CPC must be value greater than 0",
                "System can't split the document into chunks when chunk size is zero or empty."
            )
            return

        }

        if (!rightDDUploadConDetailsOvrlapPerChunk.value) {
            console.error("System can't calculate chunk overlap when overlap size is zero or empty.")

            showErrorModal(
                "OPC must be value greater than 0",
                "System can't calculate chunk overlap when overlap size is zero or empty."
            )
            return

        }


        const uploadedCon = rightDDConUploadedCon.cloneNode(false)
        const uploadedConName = rightDDConUploadedNameCon.cloneNode(false)
        const uploadedConMetaCon = rightDDConUploadedMetaCon.cloneNode(false)
        const uploadedConMetaSize = rightDDConUploadedMetaConSize.cloneNode(false)

        uploadedConName.textContent = selectedFile["fileName"]
        uploadedConMetaSize.textContent = formatBytes(selectedFile["fileSize"])

        rightDDConUploadedConEl.prepend(uploadedCon)
        uploadedCon.appendChild(uploadedConName)
        uploadedCon.appendChild(uploadedConMetaCon)
        uploadedConMetaCon.appendChild(uploadedConMetaSize)

        const fileName = selectedFile["fileName"]
        const fileSize = selectedFile["fileSize"]
        const fileText = selectedFile["fileText"]
        const cpa = rightDDUploadConDetailsChaPerChunk.value
        const opa = rightDDUploadConDetailsOvrlapPerChunk.value

        rightDDUploadConDetailsSelectFile.textContent = "Select File"
        selectedFile["fileName"] = false
        selectedFile["fileSize"] = false
        selectedFile["fileText"] = false
        rightDDUploadConDetailsChaPerChunk.value = ""
        rightDDUploadConDetailsOvrlapPerChunk.value = ""

        addShimmer(uploadedCon)

        const upload = await dump_new_ascii_file(
            currentSession,
            fileName,
            Number(fileSize),
            fileText,
            Number(cpa),
            Number(opa)
        )

        removeShimmer(uploadedCon)
        rightDDConUploadedConEl.removeChild(uploadedCon)

        if (!upload.status) {
            console.error("dump_new_ascii_file failed:", upload.data) // ← see the real shape in devtools now

            const errorMessage = typeof upload.data === "string"
                ? upload.data
                : (upload.data?.message ?? JSON.stringify(upload.data, null, 2))

            showErrorModal(
                "can't dump document, something went wrong!",
                errorMessage
            )
            return // ← also worth adding: stop here instead of falling through to remove/reload logic below
        }


        const object = await get_one_session(currentSession, 1, -1)
        if (!object.status) {
            showErrorModal(
                "can't get this session while reloading panel",
                object.data
            )
        }

        populateDD(object.data.data.dumped_paths)

    } catch (e) {
        console.error(e)
        showErrorModal(
            "something went wrong while dumping",
            e
        )
    }

}

function startCountdown(el, timeoutSeconds, startEpochSeconds) {
    if (!timeoutSeconds) {
        el.textContent = ""
        return null // nothing to clean up
    }

    let intervalId

    function update() {
        // stop automatically if the element got removed from the page
        if (!el.isConnected) {
            clearInterval(intervalId)
            return
        }

        const now = Date.now() / 1000 // current time in seconds, matching your epoch format
        const elapsed = now - startEpochSeconds
        const remaining = Math.max(0, Math.ceil(timeoutSeconds - elapsed))

        el.textContent = remaining > 0 ? `${remaining}s` : ""

        if (remaining <= 0) {
            clearInterval(intervalId)
        }
    }

    update() // run immediately, so it doesn't show blank/stale for the first second
    intervalId = setInterval(update, 1000)

    return intervalId // caller can clearInterval(this) manually if needed
}

function removeCountdown(el, intervalId) {
    if (intervalId) {
        clearInterval(intervalId)
    }
    if (el) {
        el.textContent = ""
    }
}


async function populateMessagesCon(messages, session_id) {
    try {
        messages.forEach((message, index) => {
            if (message?._agent_reasoning) {
                const thinkBlockCon = messagesConThinkingEl.cloneNode(false)
                const thinkBlockSmry = messagesConThinkingSummary.cloneNode(false)
                const thinkBlockMain = messagesConThinking.cloneNode(false)

                thinkBlockCon.title = epochToLocalTime(message.created)
                thinkBlockSmry.title = epochToLocalTime(message.created)
                thinkBlockMain.title = epochToLocalTime(message.created)

                thinkBlockSmry.innerHTML = marked.parse(toOneLine(message._agent_reasoning))
                thinkBlockMain.innerHTML = marked.parse(message._agent_reasoning)

                messagesConMessagesCon.appendChild(thinkBlockCon)
                thinkBlockCon.appendChild(thinkBlockSmry)
                thinkBlockCon.appendChild(thinkBlockMain)

                thinkBlockCon.addEventListener(
                    "click",
                    (e) => {
                        e.stopPropagation()
                        if (thinkBlockMain.style.height) {
                            thinkBlockMain.style.height = null
                            thinkBlockMain.style.padding = deviceIs ? "2vw 4.5vw" : "1vw 1vw"
                            thinkBlockMain.style.margin = deviceIs ? "3vw 0 0 4vw" : "0.5vw 0 0 1.5vw"


                        } else {
                            thinkBlockMain.style.height = 0
                            thinkBlockMain.style.padding = 0
                            thinkBlockMain.style.margin = 0

                        }
                    }
                )
            }

            if (message?.event?.type === "tool_start") {

                const toolBlockCon = messagesConToolEl.cloneNode(false)
                const toolBlockComment = messagesConToolToolComment.cloneNode(false)
                const toolBlockName = messagesConToolName.cloneNode(false)
                const toolBlockTimeout = messagesConToolTimeout.cloneNode(false)
                const toolBlockTerminate = messagesConToolTerminate.cloneNode(false)
                const toolBlockDetails = messagesConToolMoreDetails.cloneNode(false)
                const toolBlockCreated = messagesConToolCreated.cloneNode(false)
                const toolBlockLastUpdate = messagesConToolLastUpdate.cloneNode(false)
                const toolBlockStatus = messagesConToolStatus.cloneNode(false)
                const toolBlockProcessId = messagesConToolProcessId.cloneNode(false)
                const toolBlockArgsText = messagesConToolArgsText.cloneNode(false)
                const toolBlockArgsObject = messagesConToolArgsObject.cloneNode(false)
                const toolBlockStdoutText = messagesConToolStdoutText.cloneNode(false)
                const toolBlockStdout = messagesConToolStdout.cloneNode(false)
                const toolBlockStderrText = messagesConToolStderrText.cloneNode(false)
                const toolBlockStderr = messagesConToolStderr.cloneNode(false)
                const toolBlockResultText = messagesConToolResultText.cloneNode(false)
                const toolBlockResult = messagesConToolResult.cloneNode(false)
                const toolBlockTimeoutDecisions = messagesConToolTimeoutDecisions.cloneNode(false)
                const toolBlockTimeoutDecision = messagesConToolTimeoutDecision.cloneNode(false)



                toolBlockName.addEventListener(
                    "click",
                    () => {
                        if (toolBlockDetails.style.height) {
                            toolBlockDetails.style.height = null
                            toolBlockDetails.style.padding = deviceIs ? "1.5vw 2vw" : "0.5vw 1vw"

                        } else {
                            toolBlockDetails.style.height = 0
                            toolBlockDetails.style.padding = 0

                        }
                    }
                )

                toolBlockComment.textContent = message.event.tool_call.tool_comment ?
                    message.event.tool_call.tool_comment :
                    ""

                toolBlockName.textContent = toolsAndRoles[message.event.tool_call.tool_name]

                toolBlockTimeout.textContent = (
                    message.event.tool_call.timeout ?
                        message.event.tool_call.timeout :
                        ""
                )
                toolBlockCreated.textContent = "Created at : " + (
                    message.created ?
                        epochToLocalTime(message.created) :
                        "--"
                )
                toolBlockLastUpdate.textContent = "Updated at : " + (
                    message.created ?
                        epochToLocalTime(message.created) :
                        "--"
                )
                toolBlockStatus.textContent = "Status : " + (
                    message.event.tool_call.status ?
                        message.event.tool_call.status :
                        "--"
                )
                toolBlockProcessId.textContent = "Process ID : " + (
                    message.event.tool_call.process_id ?
                        message.event.tool_call.process_id :
                        "--"
                )
                toolBlockArgsText.textContent = "Arguments passed by TARS : "
                toolBlockArgsObject.textContent = message.event.tool_call.tool_args ?
                    JSON.stringify(message.event.tool_call.tool_args, null, 4) :
                    "--"
                toolBlockStdoutText.textContent = "Outputs of tool : "
                toolBlockStdout.textContent = message.event.tool_call.stdout ?
                    message.event.tool_call.stdout :
                    ""
                toolBlockStderrText.textContent = "Errors from tool : "
                toolBlockStderr.textContent = message.event.tool_call.stderr ?
                    message.event.tool_call.stderr :
                    ""
                toolBlockResultText.textContent = "Results of this tool : "
                toolBlockResult.textContent = message.event.tool_call.result ?
                    message.event.tool_call.result :
                    ""

                messagesConMessagesCon.appendChild(toolBlockCon)


                toolBlockComment.textContent ? toolBlockCon.appendChild(toolBlockComment) : null
                toolBlockCon.appendChild(toolBlockName)
                toolBlockName.appendChild(toolBlockTimeout)
                toolBlockName.appendChild(toolBlockTerminate)
                toolBlockCon.appendChild(toolBlockDetails)
                toolBlockDetails.appendChild(toolBlockCreated)
                toolBlockDetails.appendChild(toolBlockLastUpdate)
                toolBlockDetails.appendChild(toolBlockStatus)
                toolBlockDetails.appendChild(toolBlockProcessId)
                toolBlockDetails.appendChild(toolBlockArgsText)
                toolBlockDetails.appendChild(toolBlockArgsObject)
                toolBlockDetails.appendChild(toolBlockStdoutText)
                toolBlockDetails.appendChild(toolBlockStdout)
                toolBlockDetails.appendChild(toolBlockStderrText)
                toolBlockDetails.appendChild(toolBlockStderr)
                toolBlockDetails.appendChild(toolBlockResultText)
                toolBlockDetails.appendChild(toolBlockResult)
                toolBlockCon.appendChild(toolBlockTimeoutDecisions)
                toolBlockTimeoutDecisions.appendChild(toolBlockTimeoutDecision)

                const intervalId = startCountdown(toolBlockTimeout, message.event.tool_call.timeout, message.created)

                const record = {
                    "intervalId": intervalId,
                    "toolBlockName": toolBlockName,
                    "timeoutEl": toolBlockTimeout,
                    "terminateEl": toolBlockTerminate,
                    "toolBlockArgsObject": toolBlockArgsObject,
                    "toolBlockDetails": toolBlockDetails,
                    "lastUpdateEl": toolBlockLastUpdate,
                    "statusEl": toolBlockStatus,
                    "processEl": toolBlockProcessId,
                    "stdoutEl": toolBlockStdout,
                    "stderrEl": toolBlockStderr,
                    "resultEl": toolBlockResult,
                    "timeoutDecisionsEl": toolBlockTimeoutDecisions,
                    "timeoutDecisionEl": toolBlockTimeoutDecision,
                    "currentStatus": message.event.tool_call.status ?? null,
                }

                messagesRecords[message.event.tool_call.tool_call_id] = record

                record.terminateEl.addEventListener(
                    "click",
                    async () => {
                        if (record.currentStatus !== "running") return

                        const terminate = await terminate_process(
                            session_id,
                            record.currentProcessId,
                            message.event.tool_call.tool_call_id,
                        )

                        if (!terminate["status"]) {
                            showErrorModal("tool can't terminated", `tool with process id \`${message.event.tool_call.process_id}\` can't get terminated, try using your desktop 'Task Manager'`)

                            return
                        }

                        const timeoutNotificationEl = messagesConNotificationEl.cloneNode(false)
                        timeoutNotificationEl.textContent = "user terminate this tool."

                        messagesConMessagesCon.appendChild(timeoutNotificationEl)

                        record.terminateEl.src = "scripts/UI/svgs/terminateToolLater.svg"
                        record.terminateEl.style.opacity = "0.2"
                        record.toolBlockName.style.backgroundColor = "#ff000036"
                        record.statusEl.textContent = "Status : " + "User Terminated"
                        removeCountdown(record.timeoutEl, record.intervalId)

                    }
                )
                addHover(
                    record.terminateEl,
                    () => {
                        record.terminateEl.style.backgroundColor = "#0000008f"
                    },
                    () => {
                        record.terminateEl.style.backgroundColor = "#00000000"
                    },
                )
                addShimmer(record.toolBlockName)
            }

            if (message?.event?.type === "tool_update") {
                const record = messagesRecords[message.event.tool_call.tool_call_id]
                if (record) {
                    record.statusEl.textContent = "Status : " + message.event.tool_call.status
                    record.currentStatus = message.event.tool_call.status
                    record.currentProcessId = message.event.tool_call.process_id

                    record.processEl.textContent = "Process ID : " + (
                        message.event.tool_call.process_id ?
                            message.event.tool_call.process_id :
                            "--"
                    )

                    record.stdoutEl.textContent = message.event.tool_call.stdout ?
                        message.event.tool_call.stdout :
                        ""

                    record.stderrEl.textContent = message.event.tool_call.stderr ?
                        message.event.tool_call.stderr :
                        ""
                    record.resultEl.textContent += message.event.tool_call.result ?
                        `${message.event.tool_call.result}\n\n` :
                        ""

                    //                  if (message.event.tool_call.status === "finished") {}


                }
            }



            if (message?.event?.type === "tool_timeout") {
                const record = messagesRecords[message.event.tool_call.tool_call_id]
                if (record) {

                    const timeoutNotificationEl = messagesConNotificationEl.cloneNode(false)
                    timeoutNotificationEl.textContent = "Execution window expired. TARS is reviewing tool outcomes for next-step calibration."
                    messagesConMessagesCon.appendChild(timeoutNotificationEl)

                    removeCountdown(record.timeoutEl, record.intervalId)
                    record.timeoutEl.textContent = "timeout"
                    record.lastUpdateEl.textContent = `Updated at : ${epochToLocalTime(message.created)}`
                    record.statusEl.textContent = "Status : timed out"

                    record.stdoutEl.textContent = message.event.tool_call.stdout ?
                        message.event.tool_call.stdout :
                        ""

                    record.stderrEl.textContent = message.event.tool_call.stderr ?
                        message.event.tool_call.stderr :
                        ""
                    record.resultEl.textContent += message.event.tool_call.result ?
                        `${message.event.tool_call.result}\n\n` :
                        ""



                }
            }

            if (message?.event?.type === "timeout_decision") {
                const record = messagesRecords[message.event.tool_call.tool_call_id]
                if (record) {
                    const decision = message.event.tool_call

                    if (decision.status === "terminated") {
                        const timeoutNotificationEl = messagesConNotificationEl.cloneNode(false)

                        timeoutNotificationEl.textContent = "TARS terminate this tool."

                        messagesConMessagesCon.appendChild(timeoutNotificationEl)

                        record.terminateEl.style.opacity = "0.2"
                        record.toolBlockName.style.backgroundColor = "#ff000036"
                        record.statusEl.textContent = "Status : " + decision.status
                        removeCountdown(record.timeoutEl, record.intervalId)
                        //                     
                    }

                    if (decision.status === "extended") {
                        const timeoutNotificationEl = messagesConNotificationEl.cloneNode(false)
                        timeoutNotificationEl.textContent = `TARS extend this tool timeout window with ${decision.timeout} seconds.`

                        messagesConMessagesCon.appendChild(timeoutNotificationEl)

                        record.timeoutEl.textContent = decision.timeout ?? "--"

                        removeCountdown(record.timeoutEl, record.intervalId)
                        record.intervalId = startCountdown(record.timeoutEl, decision.timeout, message.created)


                    }
                }

                record.stdoutEl.textContent = message.event.tool_call.stdout ?
                    message.event.tool_call.stdout :
                    ""

                record.stderrEl.textContent = message.event.tool_call.stderr ?
                    message.event.tool_call.stderr :
                    ""
                record.resultEl.textContent += message.event.tool_call.result ?
                    `${message.event.tool_call.result}\n\n` :
                    ""
                record.lastUpdateEl.textContent = `Updated at : ${epochToLocalTime(message.created)}`

            }


            if (message?.event?.type === "tool_done") {
                const record = messagesRecords[message.event.tool_call.tool_call_id]
                if (record) {
                    record.terminateEl.style.opacity = "0.2"
                    record.statusEl.textContent = "Status : " + message.event.tool_call.status

                    console.log(message.event.tool_call.status)
                    removeCountdown(record.timeoutEl, record.intervalId)

                    record.stdoutEl.textContent = message.event.tool_call.stdout ?
                        message.event.tool_call.stdout :
                        ""

                    record.stderrEl.textContent = message.event.tool_call.stderr ?
                        message.event.tool_call.stderr :
                        ""
                    record.resultEl.textContent += message.event.tool_call.result ?
                        `${message.event.tool_call.result}\n\n` :
                        ""
                    record.lastUpdateEl.textContent = `Updated at : ${epochToLocalTime(message.created)}`
                    removeShimmer(record.toolBlockName)
                }




            }

            if (message?.role === "assistant") {
                const contentBlockCon = messagesConContentEl.cloneNode(false)
                contentBlockCon.innerHTML = marked.parse(message.content)
                messagesConMessagesCon.appendChild(contentBlockCon)
            }

            if (message?.role === "tool") {
                const record = messagesRecords[message.tool_call_id]
                if (record) {
                    const timeoutNotificationEl = messagesConNotificationEl.cloneNode(false)
                    timeoutNotificationEl.textContent = "user terminate this tool."

                    messagesConMessagesCon.appendChild(timeoutNotificationEl)

                    record.terminateEl.src = "scripts/UI/svgs/terminateToolLater.svg"
                    record.terminateEl.style.opacity = "0.2"
                    record.toolBlockName.style.backgroundColor = "#ff000036"
                    record.statusEl.textContent = "Status : " + "User Terminated"
                    removeCountdown(record.timeoutEl, record.intervalId)
                }
            }

            if (message?.role === "user") {


                if (Array.isArray(message.content)) {
                    const userBlockConImageCon = messagesConUserImagesCon.cloneNode(false)
                    let hasImages = false

                    message.content.forEach(content => {
                        if (content?.type == "image_url") {
                            hasImages = true

                            const userBlockUserImagesEl = messagesConUserImagesEl.cloneNode(false)
                            userBlockUserImagesEl.src = content.image_url.url
                            if (userBlockUserImagesEl.style.height >= userBlockUserImagesEl.style.width) {
                                userBlockUserImagesEl.style.width = ""
                            } else {
                                userBlockUserImagesEl.style.height = ""

                            }
                            userBlockConImageCon.appendChild(userBlockUserImagesEl)
                            messagesConMessagesCon.appendChild(userBlockConImageCon)

                        }


                        if (content?.type === "text" && content?.tars === false) {


                            if (!message?.added) {
                                const userBlockCon = messagesConUserEl.cloneNode(false)
                                userBlockCon.innerHTML = marked.parse(content.text)
                                messagesConMessagesCon.appendChild(userBlockCon)
                                if (userIsAtBottom) {
                                    userBlockCon.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                        inline: "nearest"
                                    });
                                }
                                if (index === getLastUserMessage(messages)) {
                                    makeLastUserEditable(userBlockCon)
                                }

                                const userRecap = rightSRConUserCon.cloneNode(false)
                                userRecap.innerHTML = marked.parse(toOneLine(content.text))



                                if (!deviceIs) {

                                    userRecap.addEventListener("mouseenter", () => {
                                        userBlockCon.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                            inline: "nearest"
                                        });
                                        userBlockCon.style.transform = deviceIs
                                            ? "translateX(-1vw)"
                                            : "translateX(-4vw)";

                                        userBlockCon.style.boxShadow = `
                                        0 1px 2px rgba(0, 0, 0, 0.06),
                                        0 4px 12px rgba(0, 0, 0, 0.10),
                                        0 12px 28px rgba(0, 0, 0, 0.12)
                                    `
                                    });

                                    userRecap.addEventListener("mouseleave", () => {
                                        userBlockCon.style.transform = "translateX(0)";
                                        userBlockCon.style.boxShadow = ""
                                        userBlockCon.style.boxShadow = ""

                                    });



                                } else {
                                    userRecap.addEventListener("click", () => {
                                        userBlockCon.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                            inline: "nearest"
                                        });

                                        toggleRightConToggle()
                                    });
                                }

                                rightSRCon.appendChild(userRecap)

                            } else {
                                const userAddedBlockCon = messagesConUserAddedEl.cloneNode(false)
                                userAddedBlockCon.innerHTML = marked.parse(content.text)
                                messagesConMessagesCon.appendChild(userAddedBlockCon)
                            }

                        }

                    });
                    if (hasImages) {
                        messagesConMessagesCon.appendChild(userBlockConImageCon)
                    }
                } else {

                    if (!message?.added) {
                        const userBlockCon = messagesConUserEl.cloneNode(false)
                        userBlockCon.innerHTML = marked.parse(message.content)
                        messagesConMessagesCon.appendChild(userBlockCon)
                        if (userIsAtBottom) {
                            userBlockCon.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest"
                            });
                        }

                        if (index === getLastUserMessage(messages)) {
                            makeLastUserEditable(userBlockCon)
                        }

                        const userRecap = rightSRConUserCon.cloneNode(false)
                        userRecap.innerHTML = marked.parse(toOneLine(message.content))

                        if (!deviceIs) {

                            userRecap.addEventListener("mouseenter", () => {
                                userBlockCon.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                    inline: "nearest"
                                });
                                userBlockCon.style.transform = deviceIs
                                    ? "translateX(-1vw)"
                                    : "translateX(-4vw)";

                                userBlockCon.style.boxShadow = `
                                        0 1px 2px rgba(0, 0, 0, 0.06),
                                        0 4px 12px rgba(0, 0, 0, 0.10),
                                        0 12px 28px rgba(0, 0, 0, 0.12)
                                    `

                            });

                            userRecap.addEventListener("mouseleave", () => {
                                userBlockCon.style.transform = "translateX(0)";
                                userBlockCon.style.boxShadow = ""
                                userBlockCon.style.boxShadow = ""

                            });



                        } else {
                            userRecap.addEventListener("click", () => {
                                userBlockCon.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                    inline: "nearest"
                                });
                                toggleRightConToggle()
                            });
                        }

                        rightSRCon.appendChild(userRecap)

                    } else {
                        const userAddedBlockCon = messagesConUserAddedEl.cloneNode(false)
                        userAddedBlockCon.innerHTML = marked.parse(message.content)
                        messagesConMessagesCon.appendChild(userAddedBlockCon)

                    }

                }
            }



        });


        // console.log(messagesRecords);

    } catch (e) {
        console.error("populateMessagesCon failed:", e)
    }
}
