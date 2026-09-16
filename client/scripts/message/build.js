(function addMessageMainCon() {
    messageConEl.appendChild(messageConMainCon)
    messageConMainCon.style.width = deviceIs ? "80%" : "100%"
    messageConMainCon.style.height = deviceIs ? "12vw" : "2vw"
    messageConMainCon.style.margin = deviceIs ? "0 3.5vw" : ".5vw 0vw"
    messageConMainCon.style.padding = deviceIs ? "2.5vw" : "1vw .6vw 1vw 1vw"
    messageConMainCon.style.maxWidth = deviceIs ? null : "48vw"
    messageConMainCon.style.transition = "300ms"
    messageConMainCon.style.backgroundColor = "#f3f0f0"
    messageConMainCon.style.display = "flex"
    messageConMainCon.style.justifyContent = "center"
    messageConMainCon.style.alignItems = "center"
    messageConMainCon.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messageConMainCon.style.overflow = "hidden"
    // messageConMainCon.style.border = "1px solid #000"

})();

(function addMessageConMainImagesCon() {
    messageConEl.appendChild(messageConMainImagesCon)
    messageConMainImagesCon.style.width = deviceIs ? "80%" : "100%"
    messageConMainImagesCon.style.height = 0
    messageConMainImagesCon.style.padding = 0
    messageConMainImagesCon.style.margin = deviceIs ? "1vw 3.5vw 6vw 3.5vw" : ".5vw 1vw 3vw 1vw"
    messageConMainImagesCon.style.maxWidth = deviceIs ? "80vw" : "48vw"
    messageConMainImagesCon.style.transition = "300ms"
    messageConMainImagesCon.style.backgroundColor = "#f3f0f0"
    messageConMainImagesCon.style.display = "flex"
    messageConMainImagesCon.style.flexDirection = "row"
    // messageConMainImagesCon.style.justifyContent = "center"
    messageConMainImagesCon.style.alignItems = "center"
    messageConMainImagesCon.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messageConMainImagesCon.style.overflow = "hidden"
    messageConMainImagesCon.style.overflowX = "scroll"
    // messageConMainImagesCon.style.border = "1px solid #000"

})();

(function addMessageConMainImagesEL() {
    // messageConMainImagesCon.appendChild(messageConMainImagesEl)
    messageConMainImagesEl.style.width = deviceIs ? "24vw" : "4vw"
    messageConMainImagesEl.style.height = "100%"
    messageConMainImagesEl.style.margin = deviceIs ? "0vw .5vw" : "0vw .3vw"
    // messageConMainImagesEl.style.padding = deviceIs ? "2.5vw" : "1vw .1vw 1vw 1vw"
    messageConMainImagesEl.style.minWidth = deviceIs ? "24vw" : "4vw"
    messageConMainImagesEl.style.transition = "300ms"
    messageConMainImagesEl.style.backgroundColor = "#e8e8e8"
    messageConMainImagesEl.style.display = "flex"
    messageConMainImagesEl.style.justifyContent = "center"
    messageConMainImagesEl.style.alignItems = "center"
    messageConMainImagesEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messageConMainImagesEl.style.overflow = "hidden"
    // messageConMainImagesEl.style.border = "1px solid #000"
    messageConMainImagesEl.style.position = "relative"
})();

(function addMessageConMainImagesImg() {
    // messageConMainImagesEl.appendChild(messageConMainImagesImg)
    messageConMainImagesImg.style.width = deviceIs ? "24vw" : "4vw"
    messageConMainImagesImg.style.height = deviceIs ? "24vw" : "4vw"
    // messageConMainImagesImg.style.margin = deviceIs ? "1vw 3.5vw 6vw 3.5vw" : "0vw .3vw"
    messageConMainImagesImg.style.minWidth = deviceIs ? "10vw" : "4vw"
    messageConMainImagesImg.style.transition = "300ms"
    // messageConMainImagesImg.style.backgroundColor = "#523f3f"
    messageConMainImagesImg.style.display = "flex"
    messageConMainImagesImg.style.justifyContent = "end"
    messageConMainImagesImg.style.alignItems = "center"
    messageConMainImagesImg.style.borderRadius = deviceIs ? "3vw" : ".3vw"
    messageConMainImagesImg.style.overflow = "hidden"
    // messageConMainImagesImg.style.border = "1px solid #000"

})();

(function addMessageConMainImagesRemoveEl() {
    // messageConMainImagesEl.appendChild(messageConMainImagesRemoveEl)
    messageConMainImagesRemoveEl.src = "scripts/UI/svgs/cancel.svg"
    messageConMainImagesRemoveEl.style.width = deviceIs ? "6vw" : "1vw"
    messageConMainImagesRemoveEl.style.height = deviceIs ? "6vw" : "1vw"
    messageConMainImagesRemoveEl.style.padding = deviceIs ? "1.5vw 1.5vw 1vw 1.5vw" : ".5vw .5vw .3vw .3vw"
    // messageConMainImagesRemoveEl.style.margin = deviceIs ? "1vw 3.5vw 6vw 3.5vw" : ".3vw .3vw"
    // messageConMainImagesRemoveEl.style.minWidth = deviceIs ? "80%" : "4vw"
    messageConMainImagesRemoveEl.style.transition = "300ms"
    messageConMainImagesRemoveEl.style.backgroundColor = "#cb2727"
    messageConMainImagesRemoveEl.style.display = "flex"
    messageConMainImagesRemoveEl.style.justifyContent = "center"
    messageConMainImagesRemoveEl.style.alignItems = "center"
    messageConMainImagesRemoveEl.style.alignSelf = "start"
    messageConMainImagesRemoveEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messageConMainImagesRemoveEl.style.overflow = "hidden"
    // messageConMainImagesRemoveEl.style.border = "1px solid #000"
    messageConMainImagesRemoveEl.style.position = "absolute"
    messageConMainImagesRemoveEl.style.top = "-.3vw"
    messageConMainImagesRemoveEl.style.right = "-.3vw"
    messageConMainImagesRemoveEl.style.zIndex = "1" // sits above the image
    messageConMainImagesRemoveEl.style.cursor = "pointer" // sits above the image

})();

(function addMessageConMainTextarea() {
    messageConMainCon.appendChild(messageConMainTextarea)
    messageConMainTextarea.placeholder = "Write a message..."
    messageConMainTextarea.style.all = "unset"
    messageConMainTextarea.style.lineHeight = deviceIs ? "6vw" : "1.4vw"
    messageConMainTextarea.style.color = "#000"
    messageConMainTextarea.style.height = "100%"
    messageConMainTextarea.style.transition = "500ms"
    // messageConMainTextarea.style.border = "1px solid #000"
    messageConMainTextarea.style.display = "flex"
    messageConMainTextarea.style.justifyContent = "center"
    messageConMainTextarea.style.alignItems = "center"
    messageConMainTextarea.style.flex = 1
    messageConMainTextarea.style.resize = "none"
    // messageConMainTextarea.style.margin = "1.6vw 0 0 0"
    // messageConMainTextarea.style.padding = "1vw .6vw 1vw .6vw"
    messageConMainTextarea.style.alignSelf = "center"
    messageConMainTextarea.style.whiteSpace = "pre-wrap"
    messageConMainTextarea.style.overflowWrap = "break-word"
    messageConMainTextarea.style.wordBreak = "break-word"
    messageConMainTextarea.style.overflow = "hidden"
    messageConMainTextarea.style.fontFamily = "sans-serif"
    messageConMainTextarea.style.overflowY = ""
    messageConMainTextarea.style.fontSize = deviceIs ? "4.7vw" : "1.2vw"

})();


(function addMessageConMainOption() {
    messageConMainCon.appendChild(messageConMainOption)
    messageConMainOption.style.transition = "500ms"
    // messageConMainOption.style.border = "1px solid #000000"
    messageConMainOption.style.display = "flex"
    // messageConMainOption.style.flexDirection = "column"
    // messageConMainOption.style.margin = deviceIs ? "0 2.3vw" : "0 .3vw"
    messageConMainOption.style.justifyContent = "center"
    // messageConMainOption.style.alignItems = "end"
    // messageConMainOption.style.alignSelf = "end"
})();


(function addMessageConMainAddImage() {
    messageConMainOption.appendChild(messageConMainAddImage)
    messageConMainAddImage.style.transition = "350ms"
    // messageConMainAddImage.style.border = "1px solid #000000"
    messageConMainAddImage.style.display = "flex"
    messageConMainAddImage.style.margin = deviceIs ? "2vw" : ".3vw"
    messageConMainAddImage.style.justifyContent = "center"
    messageConMainAddImage.style.padding = ".2vw"
    messageConMainAddImage.style.alignItems = "center"
    messageConMainAddImage.style.cursor = "pointer"

})();

(function addMessageConMainAddImageSVG() {
    messageConMainAddImage.appendChild(messageConMainAddImageSVG)
    messageConMainAddImageSVG.src = "scripts/UI/svgs/uploadImage.svg"
    messageConMainAddImageSVG.style.transition = "350ms"
    messageConMainAddImageSVG.style.width = deviceIs ? "8vw" : "2vw"
    messageConMainAddImageSVG.style.height = deviceIs ? "8vw" : "2vw"
    // messageConMainAddImageSVG.style.border = "1px solid #000000"
    messageConMainAddImageSVG.style.display = "flex"
    messageConMainAddImageSVG.style.justifyContent = "center"
    messageConMainAddImageSVG.style.alignItems = "center"

})();

(function addMessageConMainSendMessage() {
    messageConMainOption.appendChild(messageConMainSendMessage)
    messageConMainSendMessage.style.transition = "350ms"
    // messageConMainSendMessage.style.border = "1px solid #000000"
    messageConMainSendMessage.style.display = "flex"
    messageConMainSendMessage.style.margin = deviceIs ? "2vw" : ".3vw"
    messageConMainSendMessage.style.padding = ".2vw"
    messageConMainSendMessage.style.justifyContent = "center"
    messageConMainSendMessage.style.alignItems = "center"
    messageConMainSendMessage.style.cursor = "pointer"
    messageConMainSendMessage.style.opacity = 0.7
    messageConMainSendMessage.style.pointerEvents = "none"

})();


(function addMessageConMainSendMessageSVG() {
    messageConMainSendMessage.appendChild(messageConMainSendMessageSVG)
    messageConMainSendMessageSVG.src = "scripts/UI/svgs/sendMessage.svg"
    messageConMainSendMessageSVG.style.transition = "350ms"
    messageConMainSendMessageSVG.style.width = deviceIs ? "8vw" : "2vw"
    messageConMainSendMessageSVG.style.height = deviceIs ? "8vw" : "2vw"
    // messageConMainSendMessageSVG.style.border = "1px solid #000000"
    messageConMainSendMessageSVG.style.display = "flex"
    messageConMainSendMessageSVG.style.justifyContent = "center"
    messageConMainSendMessageSVG.style.alignItems = "center"
})();

(function addmessageConMainAgent() {
    messageConMainOption.appendChild(messageConMainStopAgent)
    messageConMainStopAgent.style.transition = "350ms"
    // messageConMainStopAgent.style.border = "1px solid #000000"
    messageConMainStopAgent.style.display = "none"
    messageConMainStopAgent.style.margin = deviceIs ? "2vw" : ".3vw"
    messageConMainStopAgent.style.padding = ".2vw"
    messageConMainStopAgent.style.justifyContent = "center"
    messageConMainStopAgent.style.alignItems = "center"
    messageConMainStopAgent.style.cursor = "pointer"

})();


(function addmessageConMainSendMessageSVG() {
    messageConMainStopAgent.appendChild(messageConMainStopAgentSVG)
    messageConMainStopAgentSVG.src = "scripts/UI/svgs/stop.svg"
    messageConMainStopAgentSVG.style.transition = "350ms"
    messageConMainStopAgentSVG.style.width = deviceIs ? "8vw" : "2vw"
    messageConMainStopAgentSVG.style.height = deviceIs ? "8vw" : "2vw"
    // messageConMainSendMessageSVG.style.border = "1px solid #000000"
    messageConMainStopAgentSVG.style.display = "flex"
    messageConMainStopAgentSVG.style.justifyContent = "center"
    messageConMainStopAgentSVG.style.alignItems = "center"
})();

