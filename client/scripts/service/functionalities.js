async function handleStopClick(sessionId) {
    try {
        const termint = await terminate_agent(sessionId)
        console.log(termint)
        if (!termint.status) {
            showErrorModal("can't stop agent", JSON.stringify(termint.data))
            return
        }

        const uploadTerminateFlag = await create_message(sessionId, terminateFlag)
        if (!uploadTerminateFlag.status) {
            showErrorModal("can't flag, you wouldn't be able to continue", JSON.stringify(uploadTerminateFlag.data))
        }

    } catch (e) {
        showErrorModal("something went wrong while terminating", JSON.stringify(e))
    } finally {
        messageConMainStopAgent.style.display = "none"
    }
}

function stopResponsible(sessionId, isRunning) {
    if (currentStopHandler[sessionId]) {
        messageConMainStopAgent.removeEventListener("click", currentStopHandler[sessionId])
        currentStopHandler[sessionId] = null
    }

    if (
        currentSession === sessionId &&
        isRunning
    ) {
        messageConMainStopAgent.style.display = "flex"

        currentStopHandler[sessionId] = () => handleStopClick(sessionId)
        messageConMainStopAgent.addEventListener("click", currentStopHandler[sessionId])
    } else {
        messageConMainStopAgent.style.display = "none"

    }
}

let resonningElementCon = null
let resonningElementSmry = null
let resonningElementMain = null
let contentElement = null

function addEventInDOM(event, session_id) {
    try {

        if (event?.event?.type === "reasoning") {
            messagesConIndicator.textContent = "Reasoning"

            if (!resonningElementSmry && !resonningElementMain) {
                const thinkBlockCon = messagesConThinkingEl.cloneNode(false)
                const thinkBlockSmry = messagesConThinkingSummary.cloneNode(false)
                const thinkBlockMain = messagesConThinking.cloneNode(false)


                thinkBlockCon.title = epochToLocalTime(event.created)
                thinkBlockSmry.title = epochToLocalTime(event.created)
                thinkBlockMain.title = epochToLocalTime(event.created)


                messagesConMessagesCon.appendChild(thinkBlockCon)
                thinkBlockCon.appendChild(thinkBlockSmry)
                thinkBlockCon.appendChild(thinkBlockMain)


                thinkBlockCon.addEventListener(
                    "click",
                    () => {
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

                resonningElementCon = thinkBlockCon
                resonningElementSmry = thinkBlockSmry
                resonningElementMain = thinkBlockMain
                contentElement = null

                addShimmer(resonningElementSmry)

                if (userIsAtBottom) {
                    resonningElementCon.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest"
                    });
                }
            }

            // accumulate raw markdown in a separate buffer, then render from the full buffer each time
            resonningElementSmry.dataset.rawText = (resonningElementSmry.dataset.rawText || "") + event.event.reasoning
            resonningElementMain.dataset.rawText = (resonningElementMain.dataset.rawText || "") + event.event.reasoning

            resonningElementSmry.innerHTML = marked.parse(resonningElementSmry.dataset.rawText)
            resonningElementMain.innerHTML = marked.parse(resonningElementMain.dataset.rawText)

            // console.log("event debug : " + event.event.reasoning + streamOfWhen)
        }


        if (event?.event?.type === "content") {
            messagesConIndicator.textContent = "Finising"

            if (!contentElement) {

                const contentBlockCon = messagesConContentEl.cloneNode(false)
                messagesConMessagesCon.appendChild(contentBlockCon)

                contentElement = contentBlockCon

                removeShimmer(resonningElementSmry)
                resonningElementSmry = null
                resonningElementMain = null

            }

            contentElement.dataset.rawText = (contentElement.dataset.rawText || "") + event.event.content
            contentElement.innerHTML = marked.parse(contentElement.dataset.rawText)

            if (userIsAtBottom) {
                contentElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest"
                });
            }

            // console.log("event debug : " + event.event.content + streamOfWhen)


        }


        if (event?.event?.type === "tool_start") {
            messagesConIndicator.textContent = "Working"

            removeShimmer(resonningElementSmry)
            resonningElementSmry = null
            resonningElementMain = null
            contentElement = null


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

            toolBlockComment.textContent = event.event.tool_call.tool_comment ?
                event.event.tool_call.tool_comment :
                ""

            toolBlockName.textContent = toolsAndRoles[event.event.tool_call.tool_name]

            toolBlockTimeout.textContent = (
                event.event.tool_call.timeout ?
                    event.event.tool_call.timeout :
                    ""
            )
            toolBlockCreated.textContent = "Created at : " + (
                event.created ?
                    epochToLocalTime(event.created) :
                    "--"
            )
            toolBlockLastUpdate.textContent = "Updated at : " + (
                event.created ?
                    epochToLocalTime(event.created) :
                    "--"
            )
            toolBlockStatus.textContent = "Status : " + (
                event.event.tool_call.status ?
                    event.event.tool_call.status :
                    "--"
            )
            toolBlockProcessId.textContent = "Process ID : " + (
                event.event.tool_call.process_id ?
                    event.event.tool_call.process_id :
                    "--"
            )
            toolBlockArgsText.textContent = "Arguments passed by TARS : "
            toolBlockArgsObject.textContent = event.event.tool_call.tool_args ?
                JSON.stringify(event.event.tool_call.tool_args, null, 4) :
                "--"
            toolBlockStdoutText.textContent = "Outputs of tool : "
            toolBlockStdout.textContent = event.event.tool_call.stdout ?
                event.event.tool_call.stdout :
                ""
            toolBlockStderrText.textContent = "Errors from tool : "
            toolBlockStderr.textContent = event.event.tool_call.stderr ?
                event.event.tool_call.stderr :
                ""
            toolBlockResultText.textContent = "Results of this tool : "
            toolBlockResult.textContent = event.event.tool_call.result ?
                event.event.tool_call.result :
                ""

            messagesConMessagesCon.appendChild(toolBlockCon)

            if (userIsAtBottom) {
                toolBlockCon.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest"
                });
            }

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

            const intervalId = startCountdown(toolBlockTimeout, event.event.tool_call.timeout, event.created)

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
                "currentStatus": event.event.tool_call.status ?? null,
            }

            messagesRecords[event.event.tool_call.tool_call_id] = record

            record.terminateEl.addEventListener(
                "click",
                async () => {
                    if (record.currentStatus !== "running") return

                    const terminate = await terminate_process(
                        session_id,
                        record.currentProcessId,
                        event.event.tool_call.tool_call_id,
                    )

                    if (!terminate["status"]) {
                        showErrorModal("tool can't terminated", `tool with process id \`${event.event.tool_call.process_id}\` can't get terminated, try using your desktop 'Task Manager'`)

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

        if (event?.event?.type === "tool_update") {
            messagesConIndicator.textContent = "Working"

            removeShimmer(resonningElementSmry)
            resonningElementSmry = null
            resonningElementMain = null
            contentElement = null

            const record = messagesRecords[event.event.tool_call.tool_call_id]
            if (record) {
                record.statusEl.textContent = "Status : " + event.event.tool_call.status
                record.currentStatus = event.event.tool_call.status
                record.currentProcessId = event.event.tool_call.process_id

                record.processEl.textContent = "Process ID : " + (
                    event.event.tool_call.process_id ?
                        event.event.tool_call.process_id :
                        "--"
                )

                record.stdoutEl.textContent = event.event.tool_call.stdout ?
                    event.event.tool_call.stdout :
                    ""

                record.stderrEl.textContent = event.event.tool_call.stderr ?
                    event.event.tool_call.stderr :
                    ""
                record.resultEl.textContent += event.event.tool_call.result ?
                    `${event.event.tool_call.result}\n\n` :
                    ""

                //                  if (message.event.tool_call.status === "finished") {}


            }
        }



        if (event?.event?.type === "tool_timeout") {
            messagesConIndicator.textContent = "Analysing tool results"

            removeShimmer(resonningElementSmry)
            resonningElementSmry = null
            resonningElementMain = null
            contentElement = null

            const record = messagesRecords[event.event.tool_call.tool_call_id]
            if (record) {

                const timeoutNotificationEl = messagesConNotificationEl.cloneNode(false)
                timeoutNotificationEl.textContent = "Execution window expired. TARS is reviewing tool outcomes for next-step calibration."
                messagesConMessagesCon.appendChild(timeoutNotificationEl)

                removeCountdown(record.timeoutEl, record.intervalId)
                record.timeoutEl.textContent = "timeout"
                record.lastUpdateEl.textContent = `Updated at : ${epochToLocalTime(event.created)}`
                record.statusEl.textContent = "Status : timed out"

                record.stdoutEl.textContent = event.event.tool_call.stdout ?
                    event.event.tool_call.stdout :
                    ""

                record.stderrEl.textContent = event.event.tool_call.stderr ?
                    event.event.tool_call.stderr :
                    ""
                record.resultEl.textContent += event.event.tool_call.result ?
                    `${event.event.tool_call.result}\n\n` :
                    ""

                if (userIsAtBottom) {
                    timeoutNotificationEl.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest"
                    });
                }

            }
        }

        if (event?.event?.type === "timeout_decision") {
            messagesConIndicator.textContent = "Working"

            removeShimmer(resonningElementSmry)
            resonningElementSmry = null
            resonningElementMain = null
            contentElement = null

            const record = messagesRecords[event.event.tool_call.tool_call_id]
            if (record) {
                const decision = event.event.tool_call

                if (decision.status === "terminated") {
                    const timeoutNotificationEl = messagesConNotificationEl.cloneNode(false)

                    timeoutNotificationEl.textContent = "TARS terminate this tool."

                    messagesConMessagesCon.appendChild(timeoutNotificationEl)

                    record.terminateEl.style.opacity = "0.2"
                    record.toolBlockName.style.backgroundColor = "#ff000036"
                    record.statusEl.textContent = "Status : " + decision.status
                    removeCountdown(record.timeoutEl, record.intervalId)

                    if (userIsAtBottom) {
                        timeoutNotificationEl.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "nearest"
                        });
                    }

                }

                if (decision.status === "extended") {
                    const timeoutNotificationEl = messagesConNotificationEl.cloneNode(false)
                    timeoutNotificationEl.textContent = `TARS extend this tool timeout window with ${decision.timeout} seconds.`

                    messagesConMessagesCon.appendChild(timeoutNotificationEl)

                    record.timeoutEl.textContent = decision.timeout ?? "--"

                    removeCountdown(record.timeoutEl, record.intervalId)
                    record.intervalId = startCountdown(record.timeoutEl, decision.timeout, event.created)

                    if (userIsAtBottom) {
                        timeoutNotificationEl.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "nearest"
                        });
                    }

                }


            }

            record.stdoutEl.textContent = event.event.tool_call.stdout ?
                event.event.tool_call.stdout :
                ""

            record.stderrEl.textContent = event.event.tool_call.stderr ?
                event.event.tool_call.stderr :
                ""
            record.resultEl.textContent += event.event.tool_call.result ?
                `${event.event.tool_call.result}\n\n` :
                ""
            record.lastUpdateEl.textContent = `Updated at : ${epochToLocalTime(event.created)}`

        }


        if (event?.event?.type === "tool_done") {
            messagesConIndicator.textContent = "Working"

            removeShimmer(resonningElementSmry)
            resonningElementSmry = null
            resonningElementMain = null
            contentElement = null

            const record = messagesRecords[event.event.tool_call.tool_call_id]
            if (record) {
                record.terminateEl.style.opacity = "0.2"
                record.statusEl.textContent = "Status : " + event.event.tool_call.status

                console.log(event.event.tool_call.status)
                removeCountdown(record.timeoutEl, record.intervalId)

                record.stdoutEl.textContent = event.event.tool_call.stdout ?
                    event.event.tool_call.stdout :
                    ""

                record.stderrEl.textContent = event.event.tool_call.stderr ?
                    event.event.tool_call.stderr :
                    ""
                record.resultEl.textContent += event.event.tool_call.result ?
                    `${event.event.tool_call.result}\n\n` :
                    ""
                record.lastUpdateEl.textContent = `Updated at : ${epochToLocalTime(event.created)}`
                removeShimmer(record.toolBlockName)
            }

        }

        if (event?.message) {

            if (Array.isArray(event.message.content)) {
                const userBlockConImageCon = messagesConUserImagesCon.cloneNode(false)
                let hasImages = false

                event.message.content.forEach(content => {
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

                        const userAddedBlockCon = messagesConUserAddedEl.cloneNode(false)
                        userAddedBlockCon.innerHTML = marked.parse(content.text)
                        messagesConMessagesCon.appendChild(userAddedBlockCon)

                    }

                });

                if (hasImages) {
                    messagesConMessagesCon.appendChild(userBlockConImageCon)
                }

            } else {
                const userAddedBlockCon = messagesConUserAddedEl.cloneNode(false)
                userAddedBlockCon.innerHTML = marked.parse(event.message.content)
                messagesConMessagesCon.appendChild(userAddedBlockCon)
            }
        }


    } catch (e) {
        console.error("populateMessagesCon failed:", e)
    }
}

async function streamSessionAgent(sessionId) {
    resonningElementCon = null
    resonningElementSmry = null
    resonningElementMain = null
    contentElement = null

    try {
        messagesConMessagesCon.appendChild(messagesConIndicator)
        messagesConIndicator.textContent = "Starting"
        messagesConIndicator.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });

        const history = await get_event_history(sessionId)

        for (const event of history.data.data) {
            // if (currentSession !== sessionId) { console.warn("running break"); break}
            // if (streamingAgent[sessionId] !== streamOfWhen) { console.warn("running break 1"); break}
            messagesConIndicator.textContent = "Loading History"
            addEventInDOM(event, sessionId)
        }

        for await (const event of stream_agent_events(sessionId)) {
            if (currentSession !== sessionId) { console.warn("running break"); break }
            // if (streamingAgent[sessionId] !== streamOfWhen) { console.warn("running break 1"); break}

            addEventInDOM(event.data.data, sessionId)
        }

    } catch (e) {
        console.error("streamSessionAgent failed:", e)
    } finally {
        safeRemove(messagesConIndicator)
    }

}