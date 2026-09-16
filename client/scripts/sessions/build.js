(function addSessionSec() {
    // sessionsCon.appendChild(sessionsSessionSec)
    sessionsSessionSec.title = "session"
    sessionsSessionSec.style.minHeight = deviceIs ? "11vw" : "2vw"
    sessionsSessionSec.style.width = "90%"
    sessionsSessionSec.style.fontSize = deviceIs ? "3.8vw" : "1.3vw"
    sessionsSessionSec.style.overflow = "hidden"
    sessionsSessionSec.style.display = "flex"
    sessionsSessionSec.style.alignItems = "center"
    // sessionsSessionSec.style.borderBottom = "1px solid #000"
    // sessionsSessionSec.style.border = "1px solid #000"
    sessionsSessionSec.style.margin = deviceIs?"1.3vw 0":".3vw 0"
    sessionsSessionSec.style.padding = ".7vw 0"
    sessionsSessionSec.style.backgroundColor = "rgb(210, 208, 208)"
    sessionsSessionSec.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    sessionsSessionSec.style.cursor = "pointer"


})();


(function addSessionStreaming() {
    sessionsSessionSec.appendChild(sessionsSessionStreaming)
    sessionsSessionStreaming.title = "session"
    sessionsSessionStreaming.style.height = deviceIs ? "1.5vw" : "0.5vw"
    sessionsSessionStreaming.style.width = deviceIs ? "1.5vw" : "0.5vw"
    // sessionsSessionStreaming.style.minWidth = deviceIs ? "7vw" : "2.3vw"
    sessionsSessionStreaming.style.fontSize = deviceIs ? "3.8vw" : "1.3vw"
    sessionsSessionStreaming.style.overflow = "scroll"
    sessionsSessionStreaming.style.display = "flex"
    sessionsSessionStreaming.style.alignItems = "center"
    sessionsSessionStreaming.style.justifyContent = "center"
    sessionsSessionStreaming.style.margin = deviceIs ? "0px 1vw 0px 3.8vw" : "0 .2vw 0 0.8vw"
    sessionsSessionStreaming.style.backgroundColor = "#000"
    sessionsSessionStreaming.style.color = "#fff"
    // sessionsSessionStreaming.style.border = "1px solid #000"

})();


(function addSessionName() {
    sessionsSessionSec.appendChild(sessionsSessionName)
    sessionsSessionName.title = "session"
    sessionsSessionName.innerText = "session center center center"
    sessionsSessionName.style.height = deviceIs ? "7vw" : "2.3vw"
    sessionsSessionName.style.flex = 1
    sessionsSessionName.style.fontSize = deviceIs ? "3.8vw" : "1.3vw"
    sessionsSessionName.style.display = "flex"
    sessionsSessionName.style.alignItems = "center"
    sessionsSessionName.style.margin = "0 .2vw 0 0.2vw"
    sessionsSessionName.style.margin = "0 .2vw 0 0.2vw"
    // sessionsSessionName.style.backgroundColor = "#fff"
    sessionsSessionName.style.whiteSpace = "nowrap"
    sessionsSessionName.style.overflow = "scroll"
    sessionsSessionName.style.scrollbarWidth = "thin"
    sessionsSessionName.style.transition = "350ms"
    sessionsSessionName.style.maskImage = "linear-gradient(to right, black 85%, transparent 100%)"
    sessionsSessionName.style.webkitMaskImage = "linear-gradient(to right, black 85%, transparent 100%)"
    // sessionsSessionName.style.border = "1px solid #000"
    sessionsSessionName.style.cursor = "pointer"

})();



(function addSessionInput() {
    sessionsSessionSec.appendChild(sessionSaverInputEl)
    sessionSaverInputEl.style.all = "unset"
    sessionSaverInputEl.title = "session"
    sessionSaverInputEl.innerText = "session center center center"
    sessionSaverInputEl.style.height = deviceIs ? "7vw" : "2.3vw"
    sessionSaverInputEl.style.width = "50%"
    sessionSaverInputEl.style.maxWidth = "50%"
    sessionSaverInputEl.style.fontSize = deviceIs ? "3.8vw" : "1.3vw"
    sessionSaverInputEl.style.display = "none"
    sessionSaverInputEl.style.alignItems = "center"
    sessionSaverInputEl.style.margin = "0 .2vw 0 0.2vw"
    sessionSaverInputEl.style.margin = "0 .2vw 0 0.2vw"
    // sessionSaverInputEl.style.backgroundColor = "#fff"
    sessionSaverInputEl.style.whiteSpace = "nowrap"
    sessionSaverInputEl.style.overflow = "scroll"
    sessionSaverInputEl.style.scrollbarWidth = "none"
    sessionSaverInputEl.style.transition = "350ms"
    // sessionSaverInputEl.style.border = "1px solid #000"

})();

(function addSessionEdit() {
    sessionsSessionSec.appendChild(sessionsSessionEdit)
    sessionsSessionEdit.title = "session"
    sessionsSessionEdit.style.height = deviceIs ? "7vw" : "2.3vw"
    sessionsSessionEdit.style.width = "0vw"
    sessionsSessionEdit.style.minWidth = "0vw"
    sessionsSessionEdit.style.fontSize = deviceIs ? "3vw" : "1.3vw"
    sessionsSessionEdit.style.overflow = "scroll"
    sessionsSessionEdit.style.display = "flex"
    sessionsSessionEdit.style.alignItems = "center"
    sessionsSessionEdit.style.justifyContent = "center"
    sessionsSessionEdit.style.margin = "0 .2vw 0 0.2vw"
    sessionsSessionEdit.style.transition = "350ms"
    sessionsSessionEdit.style.cursor = "pointer"

})();


(function addSessionEditSVG() {
    sessionsSessionEdit.appendChild(sessionsSessionEditSVG)
    sessionsSessionEditSVG.src = "scripts/UI/svgs/edit.svg"
    sessionsSessionEditSVG.style.height = deviceIs ? "80%" : "60%"
    sessionsSessionEditSVG.style.width = deviceIs ? "80%" : "60%"
    sessionsSessionEditSVG.style.pointerEvents = "none"

})();


(function addSessionPin() {
    sessionsSessionSec.appendChild(sessionsSessionPin)
    sessionsSessionPin.title = "session"
    sessionsSessionPin.style.height = deviceIs ? "7vw" : "2.3vw"
    sessionsSessionPin.style.width = "0vw"
    sessionsSessionPin.style.minWidth = "0vw"
    sessionsSessionPin.style.opacity = 0
    sessionsSessionPin.style.fontSize = deviceIs ? "3vw" : "1.3vw"
    sessionsSessionPin.style.overflow = "scroll"
    sessionsSessionPin.style.display = "flex"
    sessionsSessionPin.style.alignItems = "center"
    sessionsSessionPin.style.justifyContent = "center"
    sessionsSessionPin.style.margin =deviceIs?"0 .8vw 0 .8vw": "0 .2vw 0 .2vw"
    // sessionsSessionPin.style.backgroundColor = "#fff"
    sessionsSessionPin.style.transition = "350ms"
    sessionsSessionPin.style.borderRadius = deviceIs ? "1.5vw" : "0.5vw"
    // sessionsSessionPin.style.border = "1px solid #000"
    sessionsSessionPin.style.cursor = "pointer"

})();


(function addSessionPinSVG() {
    sessionsSessionPin.appendChild(sessionsSessionPinSVG)
    sessionsSessionPinSVG.src = "scripts/UI/svgs/pin.svg"
    sessionsSessionPinSVG.style.height = deviceIs ? "80%" : "60%"
    sessionsSessionPinSVG.style.width = deviceIs ? "80%" : "60%"
    sessionsSessionPinSVG.style.pointerEvents = "none"
    // sessionsSessionPinSVG.style.border = "1px solid #000"

})();


(function addSessionDelete() {
    sessionsSessionSec.appendChild(sessionsSessionDelete)
    sessionsSessionDelete.title = "session"
    sessionsSessionDelete.style.height = deviceIs ? "7vw" : "2.3vw"
    sessionsSessionDelete.style.width = "0vw"
    sessionsSessionDelete.style.minWidth = "0vw"
    sessionsSessionDelete.style.fontSize = deviceIs ? "3vw" : "1.3vw"
    sessionsSessionDelete.style.overflow = "scroll"
    sessionsSessionDelete.style.display = "flex"
    sessionsSessionDelete.style.alignItems = "center"
    sessionsSessionDelete.style.justifyContent = "center"
    sessionsSessionDelete.style.margin = "0 .2vw 0 0.2vw"
    // sessionsSessionDelete.style.backgroundColor = "#fff"
    sessionsSessionDelete.style.transition = "350ms"
    // sessionsSessionDelete.style.border = "1px solid #000"
    sessionsSessionDelete.style.cursor = "pointer"

})();

(function addSessionDeleteSVG() {
    sessionsSessionDelete.appendChild(sessionsSessionDeleteSVG)
    sessionsSessionDeleteSVG.src = "scripts/UI/svgs/delete.svg"
    sessionsSessionDeleteSVG.style.height = deviceIs ? "80%" : "60%"
    sessionsSessionDeleteSVG.style.width = deviceIs ? "80%" : "60%"
    sessionsSessionDeleteSVG.style.pointerEvents = "none"
    // sessionsSessionDeleteSVG.style.border = "1px solid #000"

})();

(function addSessionSure() {
    sessionsSessionSec.appendChild(sessionsSessionSure)
    sessionsSessionSure.title = "session"
    sessionsSessionSure.style.height = deviceIs ? "7vw" : "2.3vw"
    sessionsSessionSure.style.width = "0vw"
    sessionsSessionSure.style.minWidth = "0vw"
    sessionsSessionSure.style.fontSize = deviceIs ? "3vw" : "1.3vw"
    sessionsSessionSure.style.overflow = "scroll"
    sessionsSessionSure.style.display = "flex"
    sessionsSessionSure.style.alignItems = "center"
    sessionsSessionSure.style.justifyContent = "center"
    sessionsSessionSure.style.margin = "0 .2vw 0 0.2vw"
    // sessionsSessionSure.style.backgroundColor = "#fff"
    sessionsSessionSure.style.transition = "350ms"
    // sessionsSessionSure.style.border = "1px solid #000"
    sessionsSessionSure.style.cursor = "pointer"

})();


(function addSessionSureSVG() {
    sessionsSessionSure.appendChild(sessionsSessionSureSVG)
    sessionsSessionSureSVG.src = "scripts/UI/svgs/okayDel.svg"
    sessionsSessionSureSVG.style.height = deviceIs ? "80%" : "60%"
    sessionsSessionSureSVG.style.width = deviceIs ? "80%" : "60%"
    sessionsSessionSureSVG.style.pointerEvents = "none"
    // sessionsSessionSureSVG.style.border = "1px solid #000"

})();


(function addSessionCancel() {
    sessionsSessionSec.appendChild(sessionCancelEl)
    sessionCancelEl.title = "session"
    sessionCancelEl.style.height = deviceIs ? "7vw" : "2.3vw"
    sessionCancelEl.style.width = "0vw"
    sessionCancelEl.style.minWidth = "0vw"
    sessionCancelEl.style.fontSize = deviceIs ? "3vw" : "1.3vw"
    sessionCancelEl.style.overflow = "scroll"
    sessionCancelEl.style.display = "flex"
    sessionCancelEl.style.alignItems = "center"
    sessionCancelEl.style.justifyContent = "center"
    sessionCancelEl.style.margin = "0 .2vw 0 0.2vw"
    // sessionCancelEl.style.backgroundColor = "#fff"
    sessionCancelEl.style.transition = "350ms"
    // sessionCancelEl.style.border = "1px solid #000"
    sessionCancelEl.style.cursor = "pointer"

})();


(function addSessionCancelSVG() {
    sessionCancelEl.appendChild(sessionCancelElSVG)
    sessionCancelElSVG.src = "scripts/UI/svgs/cancel.svg"
    sessionCancelElSVG.style.height = deviceIs ? "80%" : "60%"
    sessionCancelElSVG.style.width = deviceIs ? "80%" : "60%"
    sessionCancelElSVG.style.pointerEvents = "none"
    // sessionCancelElSVG.style.border = "1px solid #000"

})();


(function addSessionSave() {
    sessionsSessionSec.appendChild(sessionSaveEl)
    sessionSaveEl.title = "session"
    sessionSaveEl.style.height = deviceIs ? "7vw" : "2.3vw"
    sessionSaveEl.style.width = "0vw"
    sessionSaveEl.style.minWidth = "0vw"
    sessionSaveEl.style.fontSize = deviceIs ? "3vw" : "1.3vw"
    sessionSaveEl.style.overflow = "scroll"
    sessionSaveEl.style.display = "flex"
    sessionSaveEl.style.alignItems = "center"
    sessionSaveEl.style.justifyContent = "center"
    sessionSaveEl.style.margin = "0 .2vw 0 0.2vw"
    // sessionSaveEl.style.backgroundColor = "#fff"
    sessionSaveEl.style.transition = "350ms"
    // sessionSaveEl.style.border = "1px solid #000"
    sessionSaveEl.style.cursor = "pointer"

})();


(function addSessionSaveSVG() {
    sessionSaveEl.appendChild(sessionSaveElSVG)
    sessionSaveElSVG.src = "scripts/UI/svgs/okayName.svg"
    sessionSaveElSVG.style.height = deviceIs ? "80%" : "60%"
    sessionSaveElSVG.style.width = deviceIs ? "80%" : "60%"
    sessionSaveElSVG.style.pointerEvents = "none"
    // sessionSaveElSVG.style.border = "1px solid #000"

})();


