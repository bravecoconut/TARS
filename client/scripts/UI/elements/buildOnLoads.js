
// *********************************************** //
// *********************************************** //
// structure                                       //
// *********************************************** //
// *********************************************** //

(function setBody() {
    bodyEl.style.all = "unset"
    bodyEl.style.backgroundColor = "#000"
    bodyEl.style.display = "flex"
    bodyEl.style.overflow = "hidden"

})();

(function addTouchBlockerContainer() {
    document.body.appendChild(touchBlockerEl)
    // touchBlockerEl.style.backgroundColor = "#ffffff34"
    touchBlockerEl.style.position = "absolute"
    touchBlockerEl.style.zIndex = mostTopIndex - 1
    touchBlockerEl.style.height = "100vh"
    touchBlockerEl.style.width = "100vw"

    touchBlockerEl.style.opacity = "0"
    touchBlockerEl.style.pointerEvents = "none"

    touchBlockerEl.style.backgroundColor = "rgba(255, 255, 255, 0.12)"
    touchBlockerEl.style.backdropFilter = "blur(10px) saturate(0%)"
    touchBlockerEl.style.webkitBackdropFilter = "blur(10px) saturate(0%)"
    touchBlockerEl.style.border = "1px solid rgba(255, 255, 255, 0.2)"
    touchBlockerEl.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.15)"
    touchBlockerEl.style.transition = "400ms"

})();

(function addErrorModalEl() {
    errorModalEl.style.position = "absolute"
    errorModalEl.style.zIndex = mostTopIndex2
    errorModalEl.style.minWidth = deviceIs ? "60vw" : "20vw"
    errorModalEl.style.maxHeight = "20vh"
    errorModalEl.style.maxWidth = deviceIs ? "100vw" : "30vw"
    errorModalEl.style.padding = deviceIs ? "5vw" : "1vw"
    errorModalEl.style.overflow = "scroll"
    errorModalEl.style.fontSize = deviceIs ? "4vw" : "1.2vw"
    errorModalEl.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    errorModalEl.style.margin = "1vw"
    errorModalEl.style.color = "#fff"
    errorModalEl.style.opacity = "1"
    errorModalEl.style.pointerEvents = "auto"
    errorModalEl.style.backgroundColor = "rgba(51, 0, 0, 0.78)"
    errorModalEl.style.backdropFilter = "blur(10px) saturate(0%)"
    errorModalEl.style.webkitBackdropFilter = "blur(10px) saturate(0%)"
    errorModalEl.style.transition = "400ms"
    errorModalEl.style.cursor = "grab"
    errorModalEl.style.right = 0
    errorModalEl.style.boxShadow = `
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.1)
`
    // errorModalEl.style.border = "1px solid rgba(255, 255, 255, 0.1)"
})();

(function addErrorModalDetails() {
    errorModalEl.appendChild(errorModalSummary)

})();

(function addErrorModalDetails() {
    errorModalEl.appendChild(errorModalDetails)

})();

(function addSaverEl() {
    saverEl.style.position = "absolute"
    saverEl.style.top = "50%"
    saverEl.style.left = "50%"
    saverEl.style.transform = "translate(-50%, -50%)"

    saverEl.style.zIndex = mostTopIndex - 1
    saverEl.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    saverEl.style.fontFamily = "sans-serif"
    saverEl.style.padding = deviceIs ? "6vw 5vw" : "1vw"
    saverEl.style.overflow = "scroll"
    saverEl.style.borderRadius = deviceIs ? "2.5vw" : "0.5vw"
    saverEl.style.color = "#000"
    saverEl.style.opacity = "1"
    saverEl.style.display = "flex"
    saverEl.style.flexDirection = "column"
    saverEl.style.backgroundColor = "#fff"
    saverEl.style.transition = "400ms"
    saverEl.style.boxShadow = `
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.1)
`
    // saverEl.style.border = "1px solid rgba(255, 255, 255, 0.1)"
})();

(function addSaverCommentEl() {
    saverEl.appendChild(saverCommentEl)
    saverCommentEl.textContent = "save something"
    saverCommentEl.style.display = "flex"
    saverCommentEl.style.padding = deviceIs ? "2vw 1vw" : "0.5vw 0vw"
    saverCommentEl.style.minWidth = deviceIs ? "50vw" : "12vw"

})();

(function addSaverInputEl() {
    saverEl.appendChild(saverInputEl)
    // saverInputEl.style.border = "1px solid #0000005d"
    saverInputEl.style.borderRadius = deviceIs ? "1.5vw" : "0.5vw"
    // saverInputEl.style.display = "none"
    saverInputEl.style.padding = deviceIs ? "2vw 3vw" : "0.5vw 1vw"
})();

(function addSaverTextareaEl() {
    saverEl.appendChild(saverTextareaEl)
    // saverTextareaEl.style.border = "1px solid #0000005d"
    saverTextareaEl.style.borderRadius = deviceIs ? "1.5vw" : "0.5vw"
    saverTextareaEl.style.display = "none"
    saverTextareaEl.style.padding = "0.5vw 1vw"
    saverTextareaEl.style.minWidth = "20vw"
    saverTextareaEl.style.minHeight = "15vw"
    saverTextareaEl.style.maxWidth = "75vw"
    saverTextareaEl.style.maxHeight = "45vh"
    saverTextareaEl.style.transition = "350ms"

})();

(function addSaverSaveCon() {
    saverEl.appendChild(saverSaveCon)
    // saverSaveCon.style.border = "1px solid #a43333"
    saverSaveCon.style.borderRadius = deviceIs ? "1.5vw" : "0.5vw"
    saverSaveCon.style.display = "flex"
    saverSaveCon.style.justifyContent = "end"
    saverSaveCon.style.margin = deviceIs ? "2.5vw 2vw" : "0.5vw 0vw"
})();

(function addSaverCancelEl() {
    saverSaveCon.appendChild(saverCancelEl)
    saverCancelEl.textContent = "cancel"
    saverCancelEl.style.backgroundColor = "#000"
    saverCancelEl.style.color = "#fff"
    saverCancelEl.style.borderRadius = deviceIs ? "1.5vw" : "0.5vw"
    saverCancelEl.style.display = "flex"
    saverCancelEl.style.justifyContent = "center"
    saverCancelEl.style.alignItems = "center"
    saverCancelEl.style.margin = deviceIs ? "1vw 1.5vw" : "0vw 0.5vw"
    saverCancelEl.style.padding = deviceIs ? "2vw 3.5vw" : "0.3vw 0.8vw"
})();

(function addSaverSaveEl() {
    saverSaveCon.appendChild(saverSaveEl)
    saverSaveEl.textContent = "save"
    saverSaveEl.style.backgroundColor = "#000"
    saverSaveEl.style.color = "#fff"
    saverSaveEl.style.borderRadius = deviceIs ? "1.5vw" : "0.5vw"
    saverSaveEl.style.display = "flex"
    saverSaveEl.style.margin = deviceIs ? "1vw 1.5vw" : "0vw 0.5vw"
    saverSaveEl.style.padding = deviceIs ? "2vw 3.5vw" : "0.3vw 0.8vw"
})();


(function addMainContainer() {
    document.body.appendChild(mainContainerEl)
    mainContainerEl.style.backgroundColor = "#fff"
    mainContainerEl.style.display = "flex"
    mainContainerEl.style.flex = 1
    mainContainerEl.style.height = "100vh"
})();


(function addLeftContainer() {
    mainContainerEl.appendChild(leftContainerEl)
    leftContainerEl.style.backgroundColor = "#f3f0f0"
    leftContainerEl.style.position = deviceIs ? "absolute" : null
    leftContainerEl.style.left = deviceIs ? 0 : null
    leftContainerEl.style.width = "0vh"
    leftContainerEl.style.height = deviceIs ? "100%" : null
    leftContainerEl.style.display = "flex"
    leftContainerEl.style.flexDirection = "column"
    leftContainerEl.style.overflow = "hidden"
    leftContainerEl.style.transition = "350ms"

})();


(function addMiddleContainer() {
    mainContainerEl.appendChild(middleContainerEl)
    // middleContainerEl.style.border = "1px solid #000"
    middleContainerEl.style.flex = 1
    middleContainerEl.style.overflow = "hidden"
    middleContainerEl.style.display = "flex"
    middleContainerEl.style.flexDirection = "column"
    middleContainerEl.style.justifyContent = "space-between"
    // middleContainerEl.style.padding = deviceIs ? null : "0 1vw"

})();

(function addSettingsContainer() {
    mainContainerEl.appendChild(settingsContainerEl)
    settingsContainerEl.style.backgroundColor = "#f3f0f0"
    settingsContainerEl.style.position = deviceIs ? "absolute" : null
    settingsContainerEl.style.right = deviceIs ? 0 : null
    settingsContainerEl.style.width = "0vw"
    settingsContainerEl.style.height = deviceIs ? "100%" : null
    settingsContainerEl.style.overflow = "hidden"
    settingsContainerEl.style.display = "flex"
    settingsContainerEl.style.flexDirection = "column"
    settingsContainerEl.style.transition = "350ms"

})();

(function addRightContainer() {
    mainContainerEl.appendChild(rightContainerEl)
    rightContainerEl.style.backgroundColor = "#f3f0f0"
    rightContainerEl.style.position = deviceIs ? "absolute" : null
    rightContainerEl.style.right = deviceIs ? 0 : null
    rightContainerEl.style.width = "0vw"
    rightContainerEl.style.height = deviceIs ? "100%" : null
    rightContainerEl.style.overflow = "hidden"
    rightContainerEl.style.display = "flex"
    rightContainerEl.style.flexDirection = "column"
    rightContainerEl.style.transition = "350ms"
    rightContainerEl.style.alignItems = "center"
    // rightContainerEl.style.padding = "1vw"

})();

(function addLeftContainerTop() {
    leftContainerEl.appendChild(leftContainerTop)
    // leftContainerTop.style.left = deviceIs ? 0 : null
    leftContainerTop.style.height = deviceIs ? "11vw" : "3vw"
    leftContainerTop.style.overflow = "hidden"
    leftContainerTop.style.borderBottom = "1px solid #000"
    leftContainerTop.style.display = "flex"
    leftContainerTop.style.width = "100%"
    leftContainerTop.style.alignItems = "center"
    leftContainerTop.style.justifyContent = "space-between"
    leftContainerTop.style.transition = "350ms"
})();

(function addSettingsContainerTop() {
    settingsContainerEl.appendChild(settingsContainerTop)
    // settingsContainerTop.style.backgroundColor = "#0865fb"
    settingsContainerTop.style.borderBottom = "1px solid black"
    settingsContainerTop.style.left = deviceIs ? 0 : null
    settingsContainerTop.style.height = deviceIs ? "11vw" : "3vw"
    settingsContainerTop.style.overflow = "hidden"
    settingsContainerTop.style.display = "flex"
    settingsContainerTop.style.width = deviceIs ? mobileSettingsConWidth : desktopSettingsConWidth
    settingsContainerTop.style.alignItems = "center"
    settingsContainerTop.style.justifyContent = "space-between"
    settingsContainerTop.style.transition = "350ms"
})();

(function addRightContainerTop() {
    rightContainerEl.appendChild(rightContainerTop)
    rightContainerTop.style.left = deviceIs ? 0 : null
    rightContainerTop.style.height = deviceIs ? "11vw" : "3vw"
    rightContainerTop.style.overflow = "hidden"
    rightContainerTop.style.display = "flex"
    rightContainerTop.style.width = deviceIs ? mobileRightConWidth : desktopRightConWidth
    rightContainerTop.style.alignItems = "center"
    rightContainerTop.style.justifyContent = "space-between"
    rightContainerTop.style.transition = "350ms"
    rightContainerTop.style.borderBottom = "1px solid black"

})();

(function addMiddleConNav() {
    middleContainerEl.appendChild(middleConNav)
    // middleConNav.style.backgroundColor = "#fff"
    middleConNav.style.width = "100%"
    middleConNav.style.height = "0vw"
    middleConNav.style.display = "flex"
    middleConNav.style.transition = "350ms"
    middleConNav.style.padding = deviceIs?"2vw 0":".2vw 0"

    // middleConNav.style.borderBottom = "1px solid #000"

})();

(function addMessagesCon() {
    middleContainerEl.appendChild(messagesConEl)
    messagesConEl.style.backgroundColor = "#fff"
    messagesConEl.style.width = "100%"
    messagesConEl.style.minWidth = "50vw"
    messagesConEl.style.height = "100%"
    messagesConEl.style.overflow = "scroll"
    messagesConEl.style.display = "flex"
    messagesConEl.style.flexDirection = "column"
    messagesConEl.style.alignItems = "center"
    messagesConEl.style.transition = "350ms"
    messagesConEl.style.paddingBottom = "4vh"


})();


(function addMessageEl() {
    middleContainerEl.appendChild(messageConEl)
    messageConEl.style.width = "100%"
    // messageConEl.style.height = deviceIs ? "50vw" : "10vw"
    messageConEl.style.transition = "350ms"
    // messageConEl.style.border = "1px solid #000000"
    messageConEl.style.display = "flex"
    messageConEl.style.flexDirection = "column"
    messageConEl.style.justifyContent = "center"
    messageConEl.style.alignItems = "center"
    // messageConEl.style.backgroundColor = "blur(4px"

})();





(function addMidConNavLeftDivider() {
    middleConNav.appendChild(midConNavLeftDivider)
    // midConNavLeftDivider.style.backgroundColor = "#0881fb"
    midConNavLeftDivider.style.flex = 1
    midConNavLeftDivider.style.overflow = "hidden"
    midConNavLeftDivider.style.display = "flex"
    midConNavLeftDivider.style.alignItems = "center"

})();

(function addMidConNavRightDivider() {
    middleConNav.appendChild(midConNavRightDivider)
    // midConNavRightDivider.style.backgroundColor = "#8108fb"
    midConNavRightDivider.style.flex = 1
    midConNavRightDivider.style.overflow = "hidden"
    midConNavRightDivider.style.display = "flex"
    midConNavRightDivider.style.alignItems = "center"
    midConNavRightDivider.style.justifyContent = "flex-end"

})();

(function addLogo() {
    leftContainerTop.appendChild(logo)
    logo.textContent = "TARS"
    logo.style.fontSize = deviceIs ? "8vw" : "2vw"
    logo.style.overflow = "hidden"
    logo.style.margin = deviceIs ? "0 0 0 3vw" : "0 0 0 0.5vw"
})();

(function addSettings() {
    settingsContainerTop.appendChild(settings)
    settings.textContent = "Settings"
    // settings.style.backgroundColor = "#08fbe3"
    settings.style.fontSize = deviceIs ? "8vw" : "2vw"
    settings.style.overflow = "hidden"
    settings.style.margin = "0 1vw"
    settings.style.color = "#000"
})();

(function addOptions() {
    rightContainerTop.appendChild(options)
    options.textContent = "Options"
    options.style.fontSize = deviceIs ? "8vw" : "2vw"
    options.style.overflow = "hidden"
    options.style.margin = deviceIs ? "0 0 0 3vw" : "0 0 0 0.5vw"


})();

(function addSettingsConToggCon() {
    midConNavRightDivider.appendChild(settingsConToggCon)
    settingsConToggCon.style.backgroundColor = "#f3f0f0"
    settingsConToggCon.style.width = deviceIs ? "10vw" : "2.5vw"
    settingsConToggCon.style.height = deviceIs ? "10vw" : "2.5vw"
    settingsConToggCon.style.overflow = "hidden"
    settingsConToggCon.style.display = "flex"
    settingsConToggCon.style.justifyContent = "center"
    settingsConToggCon.style.alignItems = "center"
    settingsConToggCon.style.borderRadius = deviceIs ? "1.8vw" : ".5vw"
    settingsConToggCon.style.margin = deviceIs ? "1.8vw" : ".5vw"
    settingsConToggCon.style.cursor = "pointer"

})();

(function addRightConToggCon() {
    midConNavRightDivider.appendChild(rightConToggCon)
    rightConToggCon.style.backgroundColor = "#f3f0f0"
    rightConToggCon.style.width = deviceIs ? "10vw" : "2.5vw"
    rightConToggCon.style.height = deviceIs ? "10vw" : "2.5vw"
    rightConToggCon.style.overflow = "hidden"
    rightConToggCon.style.display = "flex"
    rightConToggCon.style.justifyContent = "center"
    rightConToggCon.style.alignItems = "center"
    rightConToggCon.style.borderRadius = deviceIs ? "1.8vw" : ".5vw"
    rightConToggCon.style.margin = deviceIs ? "2.8vw" : ".5vw"
    rightConToggCon.style.cursor = "pointer"

})();

(function addLeftConToggle() {
    midConNavLeftDivider.appendChild(leftConToggle)
    // leftConToggle.textContent = "5"
    leftConToggle.style.backgroundColor = "#f3f0f0"
    leftConToggle.style.width = deviceIs ? "10vw" : "2.5vw"
    leftConToggle.style.height = deviceIs ? "10vw" : "2.5vw"
    leftConToggle.style.overflow = "hidden"
    leftConToggle.style.display = "flex"
    leftConToggle.style.justifyContent = "center"
    leftConToggle.style.alignItems = "center"
    leftConToggle.style.borderRadius = deviceIs ? "1.8vw" : ".5vw"
    leftConToggle.style.margin = deviceIs ? "2.8vw" : ".5vw"
    leftConToggle.style.cursor = "pointer"

})();

(function addLeftConToggleSVG() {
    leftConToggle.appendChild(leftConToggleSVG)
    leftConToggleSVG.src = "scripts/UI/svgs/sideIsOpen.svg"
    // leftConToggleSVG.style.backgroundColor = "#08befb"
    leftConToggleSVG.style.width = deviceIs ? "6vw" : "1.5vw"
    leftConToggleSVG.style.height = deviceIs ? "6vw" : "1.5vw"
    leftConToggleSVG.style.overflow = "hidden"
    leftConToggleSVG.style.display = "flex"
    leftConToggleSVG.style.justifyContent = "center"
    leftConToggleSVG.style.alignItems = "center"
})();

(function addSettingsConToggle() {
    settingsConToggCon.appendChild(settingsConToggle)
    settingsConToggle.src = "scripts/UI/svgs/settingsIsClosed.svg"
    // settingsConToggle.style.backgroundColor = "#a608fb"
    settingsConToggle.style.width = deviceIs ? "6vw" : "1.5vw"
    settingsConToggle.style.height = deviceIs ? "6vw" : "1.5vw"
    settingsConToggle.style.overflow = "hidden"
    settingsConToggle.style.cursor = "pointer"

})();

(function addRightConToggle() {
    rightConToggCon.appendChild(rightConToggle)
    rightConToggle.src = "scripts/UI/svgs/more.svg"
    // rightConToggle.style.backgroundColor = "#b608fb"
    rightConToggle.style.width = deviceIs ? "8vw" : "1.5vw"
    rightConToggle.style.height = deviceIs ? "8vw" : "1.5vw"
    rightConToggle.style.overflow = "hidden"
    rightConToggle.style.cursor = "pointer"

})();

(function addRightConNav() {
    rightContainerEl.appendChild(rightConNav)
    rightConNav.style.width = deviceIs ? mobileRightConWidth : desktopRightConWidth
    rightConNav.style.height = deviceIs ? "13vw" : "5vw"
    rightConNav.style.display = "flex"
    rightConNav.style.transition = "350ms"

})();

(function addRightConNavDividerOne() {
    rightConNav.appendChild(rightConNavDividerOne)
    // rightConNavDividerOne.style.border = "1px solid #000"
    rightConNavDividerOne.textContent = "session recap"
    rightConNavDividerOne.style.flex = 1
    rightConNavDividerOne.style.overflow = "hidden"
    rightConNavDividerOne.style.display = "flex"
    rightConNavDividerOne.style.alignItems = "center"
    rightConNavDividerOne.style.justifyContent = "center"
    rightConNavDividerOne.style.margin = deviceIs ? "1vw 0.5vw 0 6.5vw" : "1vw 0.5vw 0 1.5vw"
    rightConNavDividerOne.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    rightConNavDividerOne.style.backgroundColor = "#e8e8e8"
    rightConNavDividerOne.style.cursor = "pointer"

})();

(function addRightConNavDividerTwo() {
    rightConNav.appendChild(rightConNavDividerTwo)
    rightConNavDividerTwo.textContent = "dumped document"
    // rightConNavDividerTwo.style.border = "1px solid #000"
    rightConNavDividerTwo.style.flex = 1
    rightConNavDividerTwo.style.overflow = "hidden"
    rightConNavDividerTwo.style.display = "flex"
    rightConNavDividerTwo.style.alignItems = "center"
    rightConNavDividerTwo.style.justifyContent = "center"
    rightConNavDividerTwo.style.margin = deviceIs ? "1vw 6.5vw 0 1.5vw" : "1vw 1.5vw 0 0"
    rightConNavDividerTwo.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    rightConNavDividerTwo.style.backgroundColor = "#e8e8e8"
    rightConNavDividerTwo.style.cursor = "pointer"

})();

(function addNewTaskCon() {
    leftContainerEl.appendChild(newTaskCon)
    // newTaskCon.textContent = "new Task"
    newTaskCon.style.left = deviceIs ? 0 : null
    newTaskCon.style.height = deviceIs ? "11vw" : "3vw"
    newTaskCon.style.overflow = "hidden"
    // newTaskCon.style.borderBottom = "1px solid #000"
    newTaskCon.style.display = "flex"
    newTaskCon.style.width = "100%"
    newTaskCon.style.alignItems = "center"
    newTaskCon.style.justifyContent = "center"
    newTaskCon.style.transition = "350ms"
    newTaskCon.style.cursor = "pointer"
    
    // addHover(newTaskCon,)
})();

(function addNewTaskBtn() {
    newTaskCon.appendChild(newTaskBtn)
    newTaskBtn.textContent = "new Task"
    newTaskBtn.style.left = deviceIs ? 0 : null
    newTaskBtn.style.height = deviceIs ? "9vw" : "2.5vw"
    newTaskBtn.style.minWidth = deviceIs ? "39vw" : "13vw"
    newTaskBtn.style.overflow = "hidden"
    // newTaskBtn.style.border = "1px solid #000"
    newTaskBtn.style.display = "flex"
    newTaskBtn.style.alignItems = "center"
    newTaskBtn.style.justifyContent = "center"
    newTaskBtn.style.transition = "350ms"
    newTaskBtn.style.backgroundColor = "rgb(232, 232, 232)"
    newTaskBtn.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    newTaskBtn.style.cursor = "pointer"
    newTaskBtn.style.fontSize = deviceIs ? "5vw" : "1.2vw"
})();

(function addSessionsCon() {
    leftContainerEl.appendChild(sessionsCon)
    sessionsCon.style.left = deviceIs ? 0 : null
    sessionsCon.style.flex = 1
    sessionsCon.style.overflow = "scroll"
    sessionsCon.style.display = "flex"
    sessionsCon.style.flexDirection = "column"
    sessionsCon.style.width = "90%"
    sessionsCon.style.alignSelf = "center"
    sessionsCon.style.alignItems = "center"
    // sessionsCon.style.justifyContent = "center"
    sessionsCon.style.transition = "350ms"
    sessionsCon.style.backgroundColor = "#e8e8e8"
    // sessionsSessionSec.style.margin = "0 .3vw"
    sessionsCon.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    // sessionsCon.style.padding = deviceIs ? "3.8vw" : "4vw 0"

})();

(function addSettingsChildCon() {
    settingsContainerEl.appendChild(settingsChildCon)
    // settingsChildCon.textContent = "settings settings settings"
    settingsChildCon.style.left = deviceIs ? 0 : null
    settingsChildCon.style.flex = 1
    settingsChildCon.style.overflowX = "scroll"
    settingsChildCon.style.display = "flex"
    settingsChildCon.style.flexDirection = "column"
    settingsChildCon.style.width = deviceIs ? mobileSettingsConWidth : desktopSettingsConWidth
    settingsChildCon.style.transition = "350ms"
    settingsChildCon.style.padding = deviceIs ? "3vw 0vw" : "1vw 0vw"

})();

(function addRightChildCon() {
    rightContainerEl.appendChild(rightChildCon)
    // rightChildCon.textContent = "options"
    rightChildCon.style.left = deviceIs ? 0 : null
    rightChildCon.style.flex = 1
    rightChildCon.style.overflow = "hidden"
    rightChildCon.style.display = "flex"
    rightChildCon.style.flexDirection = "row"
    rightChildCon.style.width = deviceIs ? mobileRightConWidth : desktopRightConWidth
    rightChildCon.style.alignItems = "center"
    // rightChildCon.style.justifyContent = "space-between"
    rightChildCon.style.transition = "350ms"
    // rightChildCon.style.border = "1px solid #000"
    rightChildCon.style.padding = "1vw 0"


})();


(function addRightChildSRCon() {
    rightChildCon.appendChild(rightSRCon)
    rightSRCon.style.left = deviceIs ? 0 : null
    rightSRCon.style.flex = 0
    rightSRCon.style.height = "100%"
    rightSRCon.style.overflow = "scroll"
    rightSRCon.style.display = "flex"
    rightSRCon.style.flexDirection = "column"
    // rightSRCon.style.border = "1px solid #000"
    rightSRCon.style.transition = "350ms"
    rightSRCon.style.backgroundColor = "#e8e8e8"
    rightSRCon.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightSRCon.style.margin = deviceIs ? "3.8vw" : "1vw"
})();

(function addRightChildDDCon() {
    rightChildCon.appendChild(rightDDCon)
    rightDDCon.style.left = deviceIs ? 0 : null
    rightDDCon.style.flex = 0
    rightDDCon.style.height = "100%"
    rightDDCon.style.overflow = "scroll"
    rightDDCon.style.display = "flex"
    rightDDCon.style.flexDirection = "column"
    // rightDDCon.style.border = "1px solid #000"
    rightDDCon.style.transition = "350ms"
    rightDDCon.style.backgroundColor = "#e8e8e8"
    rightDDCon.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDCon.style.margin = deviceIs ? "3.8vw" : "1vw"

})();

(function addmessagesConMessagesConHero() {
    messagesConEl.appendChild(messagesConMessagesConHero)
    messagesConMessagesConHero.style.width = deviceIs?"80vw" :"30vw"
    messagesConMessagesConHero.style.height = deviceIs?"80vw":"30vw"
    // messagesConMessagesConHero.style.backgroundColor = "#dcdbdb"
    messagesConMessagesConHero.style.display = "flex"
    messagesConMessagesConHero.style.flexDirection = "column"
    messagesConMessagesConHero.style.justifyContent = "center"
    messagesConMessagesConHero.style.alignItems = "center"

})();

(function addmessagesConMessagesConTARS() {
    messagesConMessagesConHero.appendChild(messagesConMessagesConHeroTARS)
    messagesConMessagesConHeroTARS.textContent = "TARS"
    messagesConMessagesConHeroTARS.style.color = "#000"
    messagesConMessagesConHeroTARS.style.fontSize = deviceIs? "18vw":"8vw"


})();

(function addmessagesConMessagesConDes() {
    messagesConMessagesConHero.appendChild(messagesConMessagesConHeroDes)
    messagesConMessagesConHeroDes.textContent = "TARS - true personal agent"
    messagesConMessagesConHeroDes.style.color = "#000"
    messagesConMessagesConHeroDes.style.fontSize = deviceIs?"4vw":"0.9vw"
    messagesConMessagesConHeroDes.style.fontFamily = "sans-serif"


})();

(function makeDraggable(el) {
    let isDragging = false
    let offsetX = 0
    let offsetY = 0

    el.addEventListener("mousedown", (e) => {
        isDragging = true
        // el.style.cursor = "grabbing"
        el.style.transition = "none"   // disable transition while dragging, so it moves instantly with the cursor

        // distance from cursor to the element's top-left corner
        const rect = el.getBoundingClientRect()
        offsetX = e.clientX - rect.left
        offsetY = e.clientY - rect.top
    })

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return

        el.style.left = `${e.clientX - offsetX}px`
        el.style.top = `${e.clientY - offsetY}px`
    })

    document.addEventListener("mouseup", () => {
        if (!isDragging) return
        isDragging = false
        el.style.cursor = "grab"
        el.style.transition = "400ms"   // restore transition for other animations (fade, etc.)
    })
})(errorModalEl)