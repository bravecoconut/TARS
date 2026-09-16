async function getSessionsJSON() {
    const sessionsJSON = await get_all_sessions(
        sessionStart,
        sessionEnd
    )

    if (!sessionsJSON.status || !sessionsJSON.data.status) {
        console.error(sessionsJSON)
        showErrorModal(JSON.stringify(sessionsJSON.comment), JSON.stringify(sessionsJSON.data))
    }

    sessionStart += sessionsBatch
    sessionEnd += sessionsBatch

    return sessionsJSON.data.data
}

async function populateSessionsPanel() {

    const sessionsJSON = await getSessionsJSON()

    sessionsJSON.forEach(session => {
        const sessionSec = sessionsSessionSec.cloneNode(false)

        const sessionStream = sessionsSessionStreaming.cloneNode(true)

        const sessionName = sessionsSessionName.cloneNode(true)
        const sessionInput = sessionSaverInputEl.cloneNode(true)
        const sessionCancel = sessionCancelEl.cloneNode(true)
        const sessionSave = sessionSaveEl.cloneNode(true)

        const sessionEdit = sessionsSessionEdit.cloneNode(true)
        const sessionEditSVG = sessionsSessionEditSVG.cloneNode(true)

        const sessionPin = sessionsSessionPin.cloneNode(true)
        const sessionPinSVG = sessionsSessionPinSVG.cloneNode(true)

        const sessionDelete = sessionsSessionDelete.cloneNode(true)
        const sessionSure = sessionsSessionSure.cloneNode(true)


        sessionName.innerText = session.name
        sessionStream.title = "Zzz... agent is asleep 💤"
        sessionCancel.title = "Cancel"
        sessionSave.title = "Save"
        sessionEdit.title = "edit"
        sessionPin.title = "Pin"
        sessionDelete.title = "Delete"
        sessionSure.title = "Delete (confirm)"


        addOpacityHover(sessionCancel)
        addOpacityHover(sessionSave)
        addOpacityHover(sessionEdit)
        addOpacityHover(sessionPin)
        addOpacityHover(sessionDelete)
        addOpacityHover(sessionSure)



        if (session.pin) {
            sessionPinSVG.src = "scripts/UI/svgs/pinTrue.svg"
            sessionPin.style.backgroundColor = "#000"
            sessionPin.style.width = deviceIs ? "7vw" : "2.3vw"
            sessionPin.style.minWidth = deviceIs ? "7vw" : "2.3vw"
            sessionPin.style.opacity = 1
            sessionPin.title = "Pined"

        }

        const hoverAfter = () => {
            sessionPin.style.width = deviceIs ? "9vw" : "2.5vw"
            sessionPin.style.minWidth = deviceIs ? "9vw" : "2.5vw"
            sessionPin.style.opacity = 1

            sessionDelete.style.width = deviceIs ? "9vw" : "2.5vw"
            sessionDelete.style.minWidth = deviceIs ? "9vw" : "2.5vw"

            sessionEdit.style.width = deviceIs ? "9vw" : "2.5vw"
            sessionEdit.style.minWidth = deviceIs ? "9vw" : "2.5vw"
        }

        const hoverBefore = () => {
            if (session.pin) {
                sessionPin.style.width = deviceIs ? "7vw" : "2.3vw"
                sessionPin.style.minWidth = deviceIs ? "7vw" : "2.3vw"
                sessionPin.style.opacity = 1

                sessionDelete.style.width = "0vw"
                sessionDelete.style.minWidth = "0vw"

                sessionEdit.style.width = "0vw"
                sessionEdit.style.minWidth = "0vw"
            } else {
                sessionPin.style.width = "0vw"
                sessionPin.style.minWidth = "0vw"
                sessionPin.style.opacity = 0

                sessionDelete.style.width = "0vw"
                sessionDelete.style.minWidth = "0vw"

                sessionEdit.style.width = "0vw"
                sessionEdit.style.minWidth = "0vw"
            }

        }

        if (!deviceIs) {
            addHover(
                sessionSec,
                hoverAfter,
                hoverBefore
            )
        } else {
            sessionPin.style.width = deviceIs ? "7vw" : "2.3vw"
            sessionPin.style.minWidth = deviceIs ? "7vw" : "2.3vw"
            sessionPin.style.opacity = 1

            sessionDelete.style.width = deviceIs ? "7vw" : "2.3vw"
            sessionDelete.style.minWidth = deviceIs ? "7vw" : "2.3vw"

            sessionEdit.style.width = deviceIs ? "7vw" : "2.3vw"
            sessionEdit.style.minWidth = deviceIs ? "7vw" : "2.3vw"
        }

        sessionSec.addEventListener("click", async (e) => {
            if (currentSession === session.id) {
                console.warn("suck")
                return
            }

            e.stopPropagation()
            messagesConMessagesCon.innerHTML = ""
            rightSRCon.innerHTML = ""
            messagesConMessagesConHero.style.display = "none"
            await openSession(session.id)
        })



        sessionPin.addEventListener("click", async (e) => {
            e.stopPropagation()
            const result = await toggle_session_pin(session.id)

            if (!result.status) {
                showErrorModal(JSON.stringify(result.comment), JSON.stringify(result.data))
                return // don't update the UI if the server call failed
            }

            session.pin = !session.pin // flip the local state now that the toggle succeeded

            if (session.pin) {
                sessionPinSVG.src = "scripts/UI/svgs/pinTrue.svg"
                sessionPin.style.backgroundColor = "#000"
                sessionPin.style.width = deviceIs ? "7vw" : "2.3vw"
                sessionPin.style.minWidth = deviceIs ? "7vw" : "2.3vw"

            } else {
                sessionPinSVG.src = "scripts/UI/svgs/pin.svg"
                sessionPin.style.backgroundColor = ""
                // sessionPin.style.minWidth = "0vw"

            }
        })

        sessionEdit.addEventListener("click", (e) => {
            e.stopPropagation()

            // leftContainerEl.style.width = "25vw"
            // sessionsCon.style.width = "20vw"
            // sessionsSessionSec.style.width =

            sessionName.style.flex = 0
            sessionInput.style.display = null

            sessionInput.focus()
            sessionInput.select()

            sessionCancel.style.width = deviceIs ? "9vw" : "2.5vw"
            sessionCancel.style.minWidth = deviceIs ? "9vw" : "2.5vw"

            sessionSave.style.width = deviceIs ? "9vw" : "2.5vw"
            sessionSave.style.minWidth = deviceIs ? "9vw" : "2.5vw"



            try {



                sessionInput.type = "text"
                sessionInput.value = sessionName.innerText

                document.addEventListener("click", (e) => {
                    if (!leftContainerEl.contains(e.target)) {

                        // leftContainerEl.style.width = deviceIs ? mobileLeftConWidth : desktopLeftConWidth

                        sessionName.style.flex = 1
                        sessionInput.style.display = "none"

                        sessionName.innerText = session.name

                        sessionCancel.style.width = "0vw"
                        sessionCancel.style.minWidth = "0vw"

                        sessionSave.style.width = "0vw"
                        sessionSave.style.minWidth = "0vw"

                    }
                })

                sessionCancel.addEventListener("click", (e) => {
                    e.stopPropagation()

                    sessionName.style.flex = 1
                    sessionInput.style.display = "none"

                    sessionName.innerText = session.name

                    sessionCancel.style.width = "0vw"
                    sessionCancel.style.minWidth = "0vw"

                    sessionSave.style.width = "0vw"
                    sessionSave.style.minWidth = "0vw"

                })


                sessionSave.addEventListener("click", async (e) => {
                    e.stopPropagation()

                    if (!sessionInput.value) {
                        showErrorModal("name must not empty", "write something first")
                        sessionName.style.flex = 1
                        sessionInput.style.display = "none"

                        sessionName.innerText = session.name

                        sessionCancel.style.width = "0vw"
                        sessionCancel.style.minWidth = "0vw"

                        sessionSave.style.width = "0vw"
                        sessionSave.style.minWidth = "0vw"

                    } else {


                        const save = await change_session_name(session.id, sessionInput.value)

                        if (!save.status) {
                            showErrorModal(JSON.stringify(save.comment), JSON.stringify(save.data))
                            return
                        } else {



                            sessionName.style.flex = 1
                            sessionInput.style.display = "none"

                            sessionName.innerText = sessionInput.value

                            sessionCancel.style.width = "0vw"
                            sessionCancel.style.minWidth = "0vw"

                            sessionSave.style.width = "0vw"
                            sessionSave.style.minWidth = "0vw"
                        }

                    }


                }, { once: true })


            } catch (e) {
                RH(false, "something went wrong while cahngeing name", e)
            }


        })

        sessionDelete.addEventListener("click", (e) => {
            e.stopPropagation()

            hoverBefore()
            sessionSure.style.width = deviceIs ? "7vw" : "2.3vw"
            sessionSure.style.minWidth = deviceIs ? "7vw" : "2.3vw"

            document.addEventListener("click", (e) => {
                if (!leftContainerEl.contains(e.target)) {
                    sessionSure.style.width = "0vw"
                    sessionSure.style.minWidth = "0vw"
                }
            })
        })

        sessionSure.addEventListener("click", async (e) => {
            e.stopPropagation()

            hoverAfter()
            const del = await delete_session(session.id)
            if (!del.status) {
                showErrorModal("Can't delete session", JSON.stringify(del))
                return
            }
            sessionsCon.removeChild(sessionSec)
        })


        sessionSec.appendChild(sessionStream)
        sessionSec.appendChild(sessionInput)
        sessionSec.appendChild(sessionName)
        sessionSec.appendChild(sessionCancel)
        sessionSec.appendChild(sessionSave)
        sessionSec.appendChild(sessionEdit)
        sessionSec.appendChild(sessionPin)
        sessionPin.replaceChildren(sessionPinSVG)
        sessionSec.appendChild(sessionDelete)
        sessionSec.appendChild(sessionSure)
        sessionsCon.appendChild(sessionSec)

        allSessions[session.id] = sessionSec
    });

};

(async function populateSessionsPanelOL() {
    sessionsCon.innerHTML = ""
    await populateSessionsPanel()
})();   