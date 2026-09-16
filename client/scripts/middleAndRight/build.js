
(function addmessagesConMessagesCon() {
    messagesConEl.appendChild(messagesConMessagesCon)
    messagesConEl.classList.add("messagesConMessagesCon")
    messagesConMessagesCon.style.backgroundColor = "#fff"
    messagesConMessagesCon.style.width = "100%"
    messagesConMessagesCon.style.maxWidth = deviceIs ? "93vw" : "50vw"
    messagesConMessagesCon.style.transition = "350ms"
    // messagesConMessagesCon.style.border = "1px solid #000"
    messagesConMessagesCon.style.padding = deviceIs ? "5vw 2vw" : ".6vw .6vw"
    messagesConMessagesCon.style.display = "flex"
    messagesConMessagesCon.style.flexDirection = "column"
    // messagesConMessagesCon.style.alignItems = "end"

})();

(function addmessagesConIndicator() {
    // messagesConMessagesCon.appendChild(messagesConIndicator)
    messagesConIndicator.textContent = "Working"
    messagesConIndicator.style.backgroundColor = "#e8e8e8"
    messagesConIndicator.style.padding = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    messagesConIndicator.style.transition = "350ms"
    messagesConIndicator.style.display = "flex"
    messagesConIndicator.style.justifyContent = "space-between"
    messagesConIndicator.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConIndicator.style.margin = deviceIs ? "1vw 0" : ".5vw 0"
    messagesConIndicator.style.fontFamily = "sans-serif"
    messagesConIndicator.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messagesConIndicator.style.whiteSpace = "pre-wrap"
    messagesConIndicator.style.cursor = "default"
    messagesConIndicator.style.fontWeight = "bold"

    addShimmer(messagesConIndicator)
})();



(function addmessagesConThinkingEl() {
    // messagesConMessagesCon.appendChild(messagesConThinkingEl)
    messagesConThinkingEl.style.margin = deviceIs ? "1vw 0" : ".6vw 0"
    messagesConThinkingEl.style.transition = "350ms"
    messagesConThinkingEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messagesConThinkingEl.style.fontSize = deviceIs ? "13vw" : "1vw"
    messagesConThinkingEl.style.overflow = "hidden"
    messagesConThinkingEl.style.backgroundColor = "#f3f0f0"
    messagesConThinkingEl.style.cursor = "pointer"

})();

(function addmessagesConThinkingSummary() {
    // messagesConThinkingEl.appendChild(messagesConThinkingSummary)
    messagesConThinkingSummary.textContent = "Reasoning process"
    messagesConThinkingSummary.style.color = "#080808c2"
    messagesConThinkingSummary.style.padding = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    messagesConThinkingSummary.style.transition = "350ms"
    messagesConThinkingSummary.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConThinkingSummary.style.whiteSpace = "nowrap"
    messagesConThinkingSummary.style.overflow = "hidden"
    messagesConThinkingSummary.style.textOverflow = "ellipsis"
    messagesConThinkingSummary.style.fontFamily = "sans-serif"

})();

(function addmessagesConThinking() {
    // messagesConThinkingEl.appendChild(messagesConThinking)
    messagesConThinking.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo error rem enim nemo quas, corrupti fuga at minus. Reiciendis enim itaque dolorem explicabo dolor sunt commodi laborum dicta. Commodi, ea quibusdam. Odio quam totam consectetur, iste minima, qui commodi numquam fuga nisi sunt velit alias! Nemo quia sit corporis nobis ut rem eligendi fugit impedit explicabo a, aut, modi earum.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Illo error rem enim nemo quas, corrupti fuga at minus. Reiciendis enim itaque dolorem explicabo dolor sunt commodi laborum dicta. Commodi, ea quibusdam. Odio quam totam consectetur, iste minima, qui commodi numquam fuga nisi sunt velit alias! Nemo quia sit corporis nobis ut rem eligendi fugit impedit explicabo a, aut, modi earum."
    messagesConThinking.style.height = 0
    messagesConThinking.style.maxHeight = deviceIs ? "40vw" : "7vw"
    messagesConThinking.style.margin = 0
    messagesConThinking.style.fontFamily = "sans-serif"
    messagesConThinking.style.whiteSpace = "pre-wrap"
    messagesConThinking.style.overflowY = "auto"
    messagesConThinking.style.overflowX = "hidden"
    messagesConThinking.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConThinking.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    messagesConThinking.style.backgroundColor = "#e8e8e8"

    messagesConThinkingEl.addEventListener(
        "click",
        () => {
            if (messagesConThinking.style.height) {
                messagesConThinking.style.height = null
                messagesConThinking.style.padding = deviceIs ? "2vw 4.5vw" : "1vw 1vw"
                messagesConThinking.style.margin = deviceIs ? "3vw 0 0 4vw" : "0.5vw 0 0 1.5vw"

            } else {
                messagesConThinking.style.height = 0
                messagesConThinking.style.padding = 0
                messagesConThinking.style.margin = 0


            }
        }
    )
    messagesConThinking.style.transition = "350ms"
})();



(function addmessagesConToolEl() {
    // messagesConMessagesCon.appendChild(messagesConToolEl)
    // messagesConToolEl.style.backgroundColor = "#f3f0f0"
    // messagesConToolEl.style.margin = deviceIs ? "3.6vw 0" : ".6vw 0"
    messagesConToolEl.style.transition = "350ms"
    messagesConToolEl.style.fontSize = "1vw"
    messagesConToolEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"
})();

(function addmessagesConToolToolComment() {
    // messagesConToolEl.appendChild(messagesConToolToolComment)
    messagesConToolToolComment.textContent = "Tool comment from agent for describing what is he doing here"
    messagesConToolToolComment.style.padding = deviceIs ? "2.5vw 0" : ".8vw 0"
    messagesConToolToolComment.style.transition = "350ms"
    // messagesConToolToolComment.style.borderBottom = "1px solid #000"
    messagesConToolToolComment.style.display = "flex"
    messagesConToolToolComment.style.justifyContent = "space-between"
    messagesConToolToolComment.style.alignItems = "center"
    messagesConToolToolComment.style.margin = 0
    messagesConToolToolComment.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolToolComment.style.fontFamily = "sans-serif"
    messagesConToolToolComment.style.whiteSpace = "pre-wrap"
})();





(function addmessagesConToolName() {
    // messagesConToolEl.appendChild(messagesConToolName)
    messagesConToolName.textContent = "Tool name Here or definition here"
    messagesConToolName.style.backgroundColor = "#e8e8e8"
    messagesConToolName.style.padding = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    messagesConToolName.style.transition = "350ms"
    messagesConToolName.style.display = "flex"
    messagesConToolName.style.justifyContent = "space-between"
    // messagesConToolName.style.alignItems = "center"
    messagesConToolName.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolName.style.margin = deviceIs ? "1vw 0" : ".5vw 0"
    messagesConToolName.style.fontFamily = "sans-serif"
    messagesConToolName.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messagesConToolName.style.whiteSpace = "pre-wrap"
    messagesConToolName.style.cursor = "pointer"

})();


(function addmessagesConToolTimeout() {
    // messagesConToolName.appendChild(messagesConToolTimeout)
    messagesConToolTimeout.textContent = "49s"
    messagesConToolTimeout.style.transition = "350ms"
    messagesConToolTimeout.style.margin = deviceIs ? "0 4vw" : "0 .6vw "
    messagesConToolTimeout.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolTimeout.style.fontFamily = "sans-serif"

})();

(function addmessagesConToolTerminate() {
    // messagesConToolName.appendChild(messagesConToolTerminate)
    messagesConToolTerminate.src = "scripts/UI/svgs/terminateTool.svg"
    messagesConToolTerminate.style.height = deviceIs ? "3.8vw" : "1vw"
    messagesConToolTerminate.style.width = deviceIs ? "3.8vw" : "1vw"
    messagesConToolTerminate.style.transition = "350ms"
    messagesConToolTerminate.style.margin = deviceIs ? "1vw 2.3vw 0 0" : "0 .3vw 0 0"
    messagesConToolTerminate.style.padding = deviceIs ? null : ".2vw 0.7vw"
    // messagesConToolTerminate.style.borderRadius = "1vw"
    // messagesConToolTerminate.style.border = "1px solid #bd0000"
    messagesConToolTerminate.style.cursor = "pointer"
    messagesConToolTerminate.style.borderRadius = deviceIs ? "3vw" : ".5vw"

})();

(function addmessagesConToolMoreDetails() {
    // messagesConToolEl.appendChild(messagesConToolMoreDetails)
    messagesConToolMoreDetails.style.backgroundColor = "#e8e8e8"
    messagesConToolMoreDetails.style.height = "0"
    messagesConToolMoreDetails.style.maxHeight = deviceIs ? "50vw" : "17vw"
    messagesConToolMoreDetails.style.margin = deviceIs ? "1vw 1vw" : ".5vw .5vw"
    messagesConToolMoreDetails.style.fontFamily = "inherit"
    messagesConToolMoreDetails.style.whiteSpace = "pre-wrap"
    messagesConToolMoreDetails.style.overflowY = "auto"
    messagesConToolMoreDetails.style.overflowX = "hidden"
    messagesConToolMoreDetails.style.display = "flex"
    messagesConToolMoreDetails.style.flexDirection = "column"
    // messagesConToolMoreDetails.style.justifyContent = "s"
    // messagesConToolMoreDetails.style.alignItems = "center"
    messagesConToolMoreDetails.style.borderRadius = deviceIs ? "3vw" : ".5vw"

    messagesConToolName.addEventListener(
        "click",
        () => {
            if (messagesConToolMoreDetails.style.height) {
                messagesConToolMoreDetails.style.height = null
                messagesConToolMoreDetails.style.padding = deviceIs ? "2.5vw 0 0 3.5vw" : ".5vw 0 0 .5vw"

            } else {
                messagesConToolMoreDetails.style.height = 0
                messagesConToolMoreDetails.style.padding = 0

            }
        }
    )

    messagesConToolMoreDetails.style.transition = "350ms"
    // messagesConToolMoreDetails.style.border = "1px solid #000"
})();

(function addmessagesConToolCreated() {
    // messagesConToolMoreDetails.appendChild(messagesConToolCreated)
    messagesConToolCreated.textContent = "created: 12:30"
    messagesConToolCreated.style.transition = "350ms"
    messagesConToolCreated.style.fontFamily = "sans-serif"
    messagesConToolCreated.style.display = "flex"
    messagesConToolCreated.style.justifyContent = "start"
    messagesConToolCreated.style.fontSize = deviceIs ? "3.9vw" : "1vw"
})();

(function addmessagesConToolLastUpdate() {
    // messagesConToolMoreDetails.appendChild(messagesConToolLastUpdate)
    messagesConToolLastUpdate.textContent = "last update: 12:35"
    messagesConToolLastUpdate.style.transition = "350ms"
    messagesConToolLastUpdate.style.display = "flex"
    messagesConToolLastUpdate.style.justifyContent = "start"
    messagesConToolLastUpdate.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolLastUpdate.style.fontFamily = "sans-serif"
})();

(function addmessagesConToolStatus() {
    // messagesConToolMoreDetails.appendChild(messagesConToolStatus)
    messagesConToolStatus.textContent = "Status: running"
    messagesConToolStatus.style.transition = "350ms"
    messagesConToolStatus.style.display = "flex"
    messagesConToolStatus.style.justifyContent = "start"
    messagesConToolStatus.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolStatus.style.fontFamily = "sans-serif"


})();
(function addmessagesConToolProcessId() {
    // messagesConToolMoreDetails.appendChild(messagesConToolProcessId)
    messagesConToolProcessId.textContent = "PID : 12345"
    messagesConToolProcessId.style.transition = "350ms"
    messagesConToolProcessId.style.margin = deviceIs ? "0 0 3vw 0" : "0 0 1vw 0"
    messagesConToolProcessId.style.display = "flex"
    messagesConToolProcessId.style.justifyContent = "start"
    messagesConToolProcessId.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolProcessId.style.fontFamily = "sans-serif"


})();

(function addmessagesConToolArgsText() {
    // messagesConToolMoreDetails.appendChild(messagesConToolArgsText)
    messagesConToolArgsText.textContent = "Given parameters:"
    // messagesConToolArgsText.style.backgroundColor = "#fff"
    messagesConToolArgsText.style.padding = deviceIs ? ".5vw 2.5vw 2.5vw 0" : "0vw .5vw .5vw 0"
    messagesConToolArgsText.style.transition = "350ms"
    messagesConToolArgsText.style.display = "flex"
    messagesConToolArgsText.style.flexDirection = "column"
    messagesConToolArgsText.style.justifyContent = "center"
    // messagesConToolArgsText.style.borderTop = "1px solid #000"
    messagesConToolArgsText.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolArgsText.style.fontFamily = "sans-serif"

    // messagesConToolArgsText.style.alignItems = "center"
})();

(function addmessagesConToolArgsObject() {
    // messagesConToolMoreDetails.appendChild(messagesConToolArgsObject)
    messagesConToolArgsObject.textContent = `{
            "url": "https://archive.org/download/vintage-cocktail-books-euvs/Bariana%20by%20Louis%20Fouquet%20%281896%29.txt",
            "dest": "/home/loki/Documents/bariana.txt",
}
            
`
    messagesConToolArgsObject.style.backgroundColor = "#d2d0d0"
    messagesConToolArgsObject.style.transition = "350ms"
    messagesConToolArgsObject.style.padding = deviceIs ? "4.2vw" : "1.2vw"
    messagesConToolArgsObject.style.margin = deviceIs ? "2vw 0 2vw 5vw" : "1vw 0 1vw 3vw"
    messagesConToolArgsObject.style.minHeight = deviceIs ? "20vw" : "5vw"
    messagesConToolArgsObject.style.maxHeight = deviceIs ? "30vw" : "8.2vw"
    messagesConToolArgsObject.style.overflow = "scroll"
    messagesConToolArgsObject.style.display = "flex"
    messagesConToolArgsObject.style.flexDirection = "column"
    messagesConToolArgsObject.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolArgsObject.style.borderRadius = deviceIs ? "3vw" : ".5vw"

})();



(function addmessagesConToolStdoutText() {
    // messagesConToolMoreDetails.appendChild(messagesConToolStdoutText)
    messagesConToolStdoutText.textContent = "Output:"
    messagesConToolStdoutText.style.padding = deviceIs ? "5.5vw 2.5vw 2.5vw 0" : "1vw .5vw .5vw 0"
    messagesConToolStdoutText.style.transition = "350ms"
    messagesConToolStdoutText.style.display = "flex"
    messagesConToolStdoutText.style.flexDirection = "column"
    messagesConToolStdoutText.style.justifyContent = "center"
    messagesConToolStdoutText.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolStdoutText.style.fontFamily = "sans-serif"

})();

(function addmessagesConToolStdout() {
    // messagesConToolMoreDetails.appendChild(messagesConToolStdout)
    messagesConToolStdout.textContent = `no output yet!`
    messagesConToolStdout.style.backgroundColor = "#d2d0d0"
    messagesConToolStdout.style.transition = "350ms"
    messagesConToolStdout.style.padding = deviceIs ? "4.2vw" : "1.2vw"
    messagesConToolStdout.style.margin = deviceIs ? "2vw 0 2vw 5vw" : "1vw 0 1vw 3vw"
    messagesConToolStdout.style.minHeight = deviceIs ? "20vw" : "5vw"
    messagesConToolStdout.style.maxHeight = deviceIs ? "30vw" : "5vw"
    messagesConToolStdout.style.overflow = "scroll"
    messagesConToolStdout.style.display = "flex"
    messagesConToolStdout.style.flexDirection = "column"
    messagesConToolStdout.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolStdout.style.borderRadius = deviceIs ? "3vw" : ".5vw"

})();



(function addmessagesConToolStderrText() {
    // messagesConToolMoreDetails.appendChild(messagesConToolStderrText)
    messagesConToolStderrText.textContent = "Errors:"
    messagesConToolStderrText.style.padding = deviceIs ? "5.5vw 2.5vw 2.5vw 0" : "1vw .5vw .5vw 0"
    messagesConToolStderrText.style.transition = "350ms"
    messagesConToolStderrText.style.display = "flex"
    messagesConToolStderrText.style.flexDirection = "column"
    messagesConToolStderrText.style.justifyContent = "center"
    messagesConToolStderrText.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolStderrText.style.fontFamily = "sans-serif"

})();

(function addmessagesConToolStderr() {
    // messagesConToolMoreDetails.appendChild(messagesConToolStderr)
    messagesConToolStderr.textContent = `no error yet!`
    messagesConToolStderr.style.backgroundColor = "#d2d0d0"
    messagesConToolStderr.style.transition = "350ms"
    messagesConToolStderr.style.padding = deviceIs ? "4.2vw" : "1.2vw"
    messagesConToolStderr.style.margin = deviceIs ? "2vw 0 2vw 5vw" : "1vw 0 1vw 3vw"
    messagesConToolStderr.style.minHeight = deviceIs ? "20vw" : "5vw"
    messagesConToolStderr.style.maxHeight = deviceIs ? "30vw" : "5vw"
    messagesConToolStderr.style.overflow = "scroll"
    messagesConToolStderr.style.display = "flex"
    messagesConToolStderr.style.flexDirection = "column"
    messagesConToolStderr.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolStderr.style.borderRadius = deviceIs ? "3vw" : ".5vw"

})();




(function addmessagesConToolResultText() {
    // messagesConToolMoreDetails.appendChild(messagesConToolResultText)
    messagesConToolResultText.textContent = "Result:"
    messagesConToolResultText.style.padding = deviceIs ? "5.5vw 2.5vw 2.5vw 0" : "1vw .5vw .5vw 0"
    messagesConToolResultText.style.transition = "350ms"
    messagesConToolResultText.style.display = "flex"
    messagesConToolResultText.style.flexDirection = "column"
    messagesConToolResultText.style.justifyContent = "center"
    messagesConToolResultText.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolResultText.style.fontFamily = "sans-serif"

})();

(function addmessagesConToolResult() {
    // messagesConToolMoreDetails.appendChild(messagesConToolResult)
    messagesConToolResult.textContent = `no result yet!`
    messagesConToolResult.style.backgroundColor = "#d2d0d0"
    messagesConToolResult.style.transition = "350ms"
    messagesConToolResult.style.padding = deviceIs ? "4.2vw" : "1.2vw"
    messagesConToolResult.style.margin = deviceIs ? "2vw 0 0 5vw" : "1vw 0 0 3vw"
    messagesConToolResult.style.minHeight = deviceIs ? "20vw" : "5vw"
    messagesConToolResult.style.maxHeight = deviceIs ? "20vw" : "5vw"
    messagesConToolResult.style.overflow = "scroll"
    messagesConToolResult.style.display = "flex"
    messagesConToolResult.style.flexDirection = "column"
    messagesConToolResult.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolResult.style.borderRadius = deviceIs ? "3vw" : ".5vw"

})();


(function addmessagesConNotificationEl() {
    // messagesConMessagesCon.appendChild(messagesConNotificationEl)
    messagesConNotificationEl.textContent = `no content yet!`
    messagesConNotificationEl.style.color = "#4d4c4c"
    messagesConNotificationEl.style.margin = deviceIs ? "2vw 3vw" : "0.6vw 1vw"
    messagesConNotificationEl.style.transition = "350ms"
    messagesConNotificationEl.style.padding = deviceIs ? "0 3.5vw" : ".5vw .5vw"
    // messagesConNotificationEl.style.border = "1px solid #000"
    messagesConNotificationEl.style.fontSize = deviceIs ? "2.9vw" : "1vw"
    messagesConNotificationEl.style.textAlign = "center"
    messagesConNotificationEl.style.display = "flex"
    messagesConNotificationEl.style.justifyContent = "center"
    messagesConNotificationEl.style.fontFamily = "sans-serif"
    messagesConNotificationEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"

})();


(function addmessagesConContentEl() {
    // messagesConMessagesCon.appendChild(messagesConContentEl)
    messagesConContentEl.textContent = `no content yet!`
    messagesConContentEl.style.margin = deviceIs ? "0vw 0" : ".6vw 0"
    messagesConContentEl.style.transition = "350ms"
    messagesConContentEl.style.padding = deviceIs ? "2.5vw 0" : ".8vw 0"
    // messagesConContentEl.style.border = "1px solid #000"
    messagesConContentEl.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConContentEl.style.fontFamily = "serif"
    messagesConContentEl.style.whiteSpace = "pre-wrap"
    messagesConContentEl.style.overflowY = "auto"
    messagesConContentEl.style.overflowX = "hidden"
    // messagesConContentEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messagesConContentEl.style.overflowWrap = "break-word"
    messagesConContentEl.style.minWidth = deviceIs ? null : "50vw"
})();


(function addconstinueCon() {
    // messagesConMessagesCon.appendChild(constinueCon)
    constinueCon.style.margin = deviceIs ? "0vw 0" : ".6vw 0"
    constinueCon.style.transition = "350ms"
    constinueCon.style.padding = deviceIs ? "2.5vw 0" : ".8vw 0"
    // constinueCon.style.border = "1px solid #000"
    constinueCon.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    constinueCon.style.fontFamily = "serif"
    constinueCon.style.whiteSpace = "pre-wrap"
    constinueCon.style.overflowY = "auto"
    constinueCon.style.overflowX = "hidden"
    // messagesConContentEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    constinueCon.style.overflowWrap = "break-word"
    // constinueCon.style.backgroundColor = "#9b9797"
    constinueCon.style.minWidth = deviceIs ? null : "50vw"
    constinueCon.style.display = "flex"
    constinueCon.style.flexDirection = "column"
    constinueCon.style.justifyContent = "center"
    constinueCon.style.alignItems = "center"
})();

(function addconstinueEl() {
    // constinueCon.appendChild(constinueEl)
    constinueEl.textContent = `Continue Agent`
    constinueEl.style.margin = deviceIs ? "0vw 0" : ".3vw 0"
    constinueEl.style.transition = "350ms"
    constinueEl.style.padding = deviceIs ? "1vw 0" : ".5vw 0"
    constinueEl.style.border = "1px solid #000"
    constinueEl.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    constinueEl.style.fontFamily = "serif"
    constinueEl.style.whiteSpace = "pre-wrap"
    constinueEl.style.overflowY = "auto"
    constinueEl.style.overflowX = "hidden"
    constinueEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    constinueEl.style.overflowWrap = "break-word"
    // constinueEl.style.backgroundColor = "#9b9797"
    constinueEl.style.minWidth = deviceIs ? null : "10vw"
    constinueEl.style.display = "flex"
    constinueEl.style.flexDirection = "column"
    constinueEl.style.justifyContent = "center"
    constinueEl.style.alignItems = "center"
    constinueEl.style.cursor = "pointer"
})();

(function addmessagesConUserImagesCon() {
    // messagesConMessagesCon.appendChild(messagesConUserImagesCon)
    // messagesConUserImagesCon.textContent = `no user Input yet!`
    // messagesConUserImagesCon.style.backgroundColor = "#a1a1a1"
    messagesConUserImagesCon.style.color = "#fff"
    messagesConUserImagesCon.style.overflow = "hidden"
    messagesConUserImagesCon.style.width = "100%"
    messagesConUserImagesCon.style.maxWidth = deviceIs ? "100%" : "100%"
    messagesConUserImagesCon.style.transition = "350ms"
    // messagesConUserImagesCon.style.padding = deviceIs ? "2vw 2vw" : "1vw 1vw"
    messagesConUserImagesCon.style.margin = deviceIs ? " 0 0 5vw 0" : "0 0 1.5vw 0"
    messagesConUserImagesCon.style.alignSelf = "end"
    messagesConUserImagesCon.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConUserImagesCon.style.borderRadius = deviceIs ? "3vw" : "1vw"
    messagesConUserImagesCon.style.display = "grid"
    messagesConUserImagesCon.style.gridTemplateColumns = deviceIs ? "repeat(4, 0.1fr)" : "repeat(5, 0.1fr)"
    messagesConUserImagesCon.style.direction = "rtl"
})();


(function addmessagesConUserImageEl() {
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl)
    messagesConUserImagesEl.style.backgroundColor = "#808080"
    messagesConUserImagesEl.style.color = "#fff"
    messagesConUserImagesEl.style.width = deviceIs ? "20vw" : "8vw"
    messagesConUserImagesEl.style.height = deviceIs ? "20vw" : "8vw"
    messagesConUserImagesEl.style.transition = "350ms"
    messagesConUserImagesEl.style.margin = deviceIs ? "2vw 1vw" : ".5vw .5vw"
    messagesConUserImagesEl.style.display = "flex"
    messagesConUserImagesEl.style.justifyContent = "center"
    messagesConUserImagesEl.style.alignItems = "center"
    messagesConUserImagesEl.style.border = "1px solid #0000000e"

    messagesConUserImagesEl.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConUserImagesEl.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))
    messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))
    // messagesConUserImagesCon.appendChild(messagesConUserImagesEl.cloneNode(false))

})();


(function addmessagesConUserEl() {
    // messagesConMessagesCon.appendChild(messagesConUserEl)
    messagesConUserEl.textContent = `no user Input yet!`
    messagesConUserEl.style.backgroundColor = "#000000"
    messagesConUserEl.style.color = "#fff"
    messagesConUserEl.style.maxWidth = "70%"
    messagesConUserEl.style.margin = deviceIs ? "4vw 0 0vw 12vw" : "1vw 0 0vw 8vw"
    messagesConUserEl.style.transition = "350ms"
    messagesConUserEl.style.padding = deviceIs ? "4vw 4vw" : "1vw 1vw"
    messagesConUserEl.style.display = "flex"
    messagesConUserEl.style.flexDirection = "column"
    messagesConUserEl.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConUserEl.style.borderRadius = deviceIs ? "3vw" : "1vw"
    messagesConUserEl.style.fontFamily = "sans-serif"
    messagesConUserEl.style.alignSelf = "end"
    messagesConUserEl.style.whiteSpace = "pre-wrap"
    messagesConUserEl.style.overflowWrap = "break-word"
})();




(function addmessagesConUserAddedEl() {
    // messagesConMessagesCon.appendChild(messagesConUserAddedEl)
    messagesConUserAddedEl.textContent = `no user Input yet!`
    messagesConUserAddedEl.style.border = "1px solid #00000048"
    messagesConUserAddedEl.style.color = "#000"
    messagesConUserAddedEl.style.width = "fit-content"
    messagesConUserAddedEl.style.margin = deviceIs ? "9vw 0 9vw 12vw" : "1vw 0 1vw 8vw"
    messagesConUserAddedEl.style.transition = "350ms"
    messagesConUserAddedEl.style.padding = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    messagesConUserAddedEl.style.display = "flex"
    messagesConUserAddedEl.style.flexDirection = "column"
    messagesConUserAddedEl.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConUserAddedEl.style.borderRadius = deviceIs ? "3vw" : ".5vw"
    messagesConUserAddedEl.style.fontFamily = "sans-serif"
    messagesConUserAddedEl.style.alignSelf = "end"
    messagesConUserAddedEl.style.overflowWrap = "break-word"

})();





(function addmessagesConToolTimeoutDecisions() {
    // messagesConToolEl.appendChild(messagesConToolTimeoutDecisions)
    messagesConToolTimeoutDecisions.textContent = "Tool name Here or definition here"
    messagesConToolTimeoutDecisions.style.backgroundColor = "#fff"
    messagesConToolTimeoutDecisions.style.padding = deviceIs ? "1vw 4vw 1vw 8vw" : ".5vw 0 .5vw 1.5vw"
    messagesConToolTimeoutDecisions.style.transition = "350ms"
    messagesConToolTimeoutDecisions.style.border = "1px solid #000"
    messagesConToolTimeoutDecisions.style.display = "none"
    messagesConToolTimeoutDecisions.style.justifyContent = "space-between"
    messagesConToolTimeoutDecisions.style.alignItems = "center"
    messagesConToolTimeoutDecisions.style.fontSize = deviceIs ? "3.9vw" : "1vw"
    messagesConToolTimeoutDecisions.style.margin = deviceIs ? "1vw" : ".5vw"
    messagesConToolTimeoutDecisions.style.fontFamily = "sans-serif"

})();

(function addmessagesConToolTimeoutDecision() {
    // messagesConToolEl.appendChild(messagesConToolTimeoutDecision)
    messagesConToolTimeoutDecision.style.backgroundColor = "#fff"
    messagesConToolTimeoutDecision.style.height = "0"
    messagesConToolTimeoutDecision.style.maxHeight = deviceIs ? "50vw" : "17vw"
    messagesConToolTimeoutDecision.style.margin = deviceIs ? "0 0 0 10.5vw" : "0 0 0 1.5vw"
    messagesConToolTimeoutDecision.style.fontFamily = "inherit"
    messagesConToolTimeoutDecision.style.whiteSpace = "pre-wrap"
    messagesConToolTimeoutDecision.style.overflowY = "auto"
    messagesConToolTimeoutDecision.style.overflowX = "hidden"
    messagesConToolTimeoutDecision.style.display = "flex"
    messagesConToolTimeoutDecision.style.flexDirection = "column"
    // messagesConToolMoreDetails.style.justifyContent = "s"
    // messagesConToolMoreDetails.style.alignItems = "center"

    messagesConToolTimeoutDecisions.addEventListener(
        "click",
        () => {
            if (messagesConToolTimeoutDecision.style.height) {
                messagesConToolTimeoutDecision.style.height = null
                messagesConToolTimeoutDecision.style.padding = deviceIs ? "1.5vw 2vw" : "0.5vw 1vw"

            } else {
                messagesConToolTimeoutDecision.style.height = 0
                messagesConToolTimeoutDecision.style.padding = 0

            }
        }
    )

    messagesConToolTimeoutDecision.style.transition = "350ms"
    // messagesConToolMoreDetails.style.border = "1px solid #000"
})();


(function addrightSRConUserCon() {
    // rightSRCon.appendChild(rightSRConUserCon)
    rightSRConUserCon.innerText = "DssssssssssssssssssssssssssssssssssssssssssssdddddddddddddddD"
    rightSRConUserCon.style.left = deviceIs ? 0 : null
    rightSRConUserCon.style.minHeight = deviceIs ? "5vw" : "2vw"
    rightSRConUserCon.style.overflow = "hidden"
    rightSRConUserCon.style.display = "flex"
    rightSRConUserCon.style.alignItems = "center"
    rightSRConUserCon.style.transition = "350ms"
    rightSRConUserCon.style.margin = "0 0 1vw 0"
    rightSRConUserCon.style.color = "#000"
    rightSRConUserCon.style.padding = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    rightSRConUserCon.style.margin = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    rightSRConUserCon.style.fontSize = deviceIs ? "3.9vw" : "1.2vw"
    rightSRConUserCon.style.whiteSpace = "nowrap"
    rightSRConUserCon.style.textOverflow = "ellipsis"
    rightSRConUserCon.style.fontFamily = "sans-serif"
    rightSRConUserCon.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightSRConUserCon.style.backgroundColor = "#d2d0d0"
    rightSRConUserCon.style.scrollbarWidth = "thin"
    rightSRConUserCon.style.transition = "350ms"
    rightSRConUserCon.style.maskImage = "linear-gradient(to right, black 85%, transparent 100%)"
    rightSRConUserCon.style.webkitMaskImage = "linear-gradient(to right, black 85%, transparent 100%)"
    rightSRConUserCon.style.cursor = "default"

})();


(function addrightDDUplaodCon() {
    rightDDCon.appendChild(rightDDUploadCon)
    rightDDUploadCon.style.left = deviceIs ? 0 : null
    rightDDUploadCon.style.minHeight = deviceIs ? "27vw" : "7.5vw"
    rightDDUploadCon.style.overflow = "hidden"
    rightDDUploadCon.style.display = "flex"
    rightDDUploadCon.style.transition = "350ms"
    rightDDUploadCon.style.margin = "0 0 1vw 0"
    rightDDUploadCon.style.color = "#000"
    rightDDUploadCon.style.padding = deviceIs ? "1.5vw 2vw" : ".3vw .3vw"
    rightDDUploadCon.style.margin = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    rightDDUploadCon.style.fontSize = deviceIs ? "3.9vw" : "1.2vw"
    rightDDUploadCon.style.fontFamily = "sans-serif"
    rightDDUploadCon.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDUploadCon.style.backgroundColor = "#d2d0d0"
    rightDDUploadCon.style.scrollbarWidth = "thin"
    rightDDUploadCon.style.transition = "350ms"
})();

(function addrightDDUploadConUploadEl() {
    rightDDUploadCon.appendChild(rightDDUploadConUploadEl)
    rightDDUploadConUploadEl.style.left = deviceIs ? 0 : null
    rightDDUploadConUploadEl.style.minWidth = deviceIs ? "3vw" : "8.5vw"
    rightDDUploadConUploadEl.style.overflow = "hidden"
    rightDDUploadConUploadEl.style.display = "flex"
    rightDDUploadConUploadEl.style.flexDirection = "column"
    rightDDUploadConUploadEl.style.justifyContent = "center"
    rightDDUploadConUploadEl.style.alignItems = "center"
    rightDDUploadConUploadEl.style.transition = "350ms"
    rightDDUploadConUploadEl.style.color = "#000"
    rightDDUploadConUploadEl.style.padding = deviceIs ? "1vw .5vw" : ".8vw .2vw"
    rightDDUploadConUploadEl.style.fontSize = deviceIs ? "3.9vw" : "1.2vw"
    rightDDUploadConUploadEl.style.fontFamily = "sans-serif"
    rightDDUploadConUploadEl.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDUploadConUploadEl.style.backgroundColor = "#c6c6c6"
    rightDDUploadConUploadEl.style.scrollbarWidth = "thin"
    rightDDUploadConUploadEl.style.transition = "350ms"
})();

(function addrightDDUploadConUploadNewEl() {
    rightDDUploadConUploadEl.appendChild(rightDDUploadConUploadNewEl)
    rightDDUploadConUploadNewEl.textContent = "Upload Papers"
    rightDDUploadConUploadNewEl.style.left = deviceIs ? 0 : null
    rightDDUploadConUploadNewEl.style.maxHeight = deviceIs ? "5vw" : "2vw"
    rightDDUploadConUploadNewEl.style.minWidth = deviceIs ? "70%" : "90%"
    rightDDUploadConUploadNewEl.style.overflow = "hidden"
    rightDDUploadConUploadNewEl.style.display = "flex"
    rightDDUploadConUploadNewEl.style.justifyContent = "center"
    rightDDUploadConUploadNewEl.style.alignItems = "center"
    rightDDUploadConUploadNewEl.style.transition = "350ms"
    rightDDUploadConUploadNewEl.style.color = "#000"
    rightDDUploadConUploadNewEl.style.padding = deviceIs ? "2.5vw 3.5vw" : ".5vw .2vw"
    rightDDUploadConUploadNewEl.style.margin = deviceIs ? "0vw 3.5vw" : "0vw .8vw .4vw .8vw"
    rightDDUploadConUploadNewEl.style.fontSize = deviceIs ? "2.9vw" : "1vw"
    rightDDUploadConUploadNewEl.style.fontFamily = "sans-serif"
    rightDDUploadConUploadNewEl.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDUploadConUploadNewEl.style.backgroundColor = "#f3f1f1"
    rightDDUploadConUploadNewEl.style.scrollbarWidth = "thin"
    rightDDUploadConUploadNewEl.style.transition = "350ms"
    rightDDUploadConUploadNewEl.style.cursor = "pointer"

})();


(function addrightDDUploadConClearAll() {
    rightDDUploadConUploadEl.appendChild(rightDDUploadConClearAll)
    rightDDUploadConClearAll.textContent = "clear all vectors"
    rightDDUploadConClearAll.style.left = deviceIs ? 0 : null
    rightDDUploadConClearAll.style.maxHeight = deviceIs ? "5vw" : "2vw"
    rightDDUploadConClearAll.style.minWidth = deviceIs ? "70%" : "90%"
    rightDDUploadConClearAll.style.overflow = "hidden"
    rightDDUploadConClearAll.style.display = "flex"
    rightDDUploadConClearAll.style.justifyContent = "center"
    rightDDUploadConClearAll.style.alignItems = "center"
    rightDDUploadConClearAll.style.transition = "350ms"
    rightDDUploadConClearAll.style.color = "#000"
    rightDDUploadConClearAll.style.padding = deviceIs ? "2.5vw 3.5vw" : ".5vw .2vw"
    rightDDUploadConClearAll.style.margin = deviceIs ? "1.4vw 0.8vw 0vw" : "0.4vw 0.8vw 0vw"
    rightDDUploadConClearAll.style.fontSize = deviceIs ? "2.9vw" : "1vw"
    rightDDUploadConClearAll.style.fontFamily = "sans-serif"
    rightDDUploadConClearAll.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDUploadConClearAll.style.backgroundColor = "#f3f1f1"
    rightDDUploadConClearAll.style.scrollbarWidth = "thin"
    rightDDUploadConClearAll.style.transition = "350ms"
    rightDDUploadConClearAll.style.cursor = "pointer"

})();

(function addrightDDUploadConClearAllSure() {
    rightDDUploadConUploadEl.appendChild(rightDDUploadConClearAllSure)
    rightDDUploadConClearAllSure.textContent = "Sure?"
    rightDDUploadConClearAllSure.style.left = deviceIs ? 0 : null
    rightDDUploadConClearAllSure.style.maxHeight = "0"
    rightDDUploadConClearAllSure.style.minWidth = deviceIs ? "70%" : "90%"
    rightDDUploadConClearAllSure.style.overflow = "hidden"
    rightDDUploadConClearAllSure.style.display = "flex"
    rightDDUploadConClearAllSure.style.justifyContent = "center"
    rightDDUploadConClearAllSure.style.alignItems = "center"
    rightDDUploadConClearAllSure.style.transition = "350ms"
    rightDDUploadConClearAllSure.style.color = "#fff"
    rightDDUploadConClearAllSure.style.padding = "0"
    rightDDUploadConClearAllSure.style.margin = "0"
    rightDDUploadConClearAllSure.style.fontSize = deviceIs ? "2.9vw" : "1vw"
    rightDDUploadConClearAllSure.style.fontFamily = "sans-serif"
    rightDDUploadConClearAllSure.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDUploadConClearAllSure.style.backgroundColor = "#a01919"
    rightDDUploadConClearAllSure.style.scrollbarWidth = "thin"
    rightDDUploadConClearAllSure.style.transition = "350ms"
    rightDDUploadConClearAllSure.style.cursor = "pointer"

})();


(function addrightDDUploadConUploadDetailsEl() {
    rightDDUploadCon.appendChild(rightDDUploadConDetails)
    rightDDUploadConDetails.style.left = deviceIs ? 0 : null
    // rightDDUploadConDetails.style.minWidth = deviceIs ? "3vw" : "8.5vw"
    rightDDUploadConDetails.style.overflow = "hidden"
    rightDDUploadConDetails.style.display = "flex"
    rightDDUploadConDetails.style.flex = "1"
    rightDDUploadConDetails.style.flexDirection = "column"
    rightDDUploadConDetails.style.justifyContent = "center"
    rightDDUploadConDetails.style.alignItems = "center"
    rightDDUploadConDetails.style.transition = "350ms"
    rightDDUploadConDetails.style.color = "#000"
    rightDDUploadConDetails.style.padding = deviceIs ? "2.5vw 3.5vw" : ".8vw .2vw"
    rightDDUploadConDetails.style.fontSize = deviceIs ? "3.9vw" : "1.2vw"
    rightDDUploadConDetails.style.fontFamily = "sans-serif"
    rightDDUploadConDetails.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDUploadConDetails.style.backgroundColor = "#c6c6c6"
    rightDDUploadConDetails.style.scrollbarWidth = "thin"
    rightDDUploadConDetails.style.transition = "350ms"
    rightDDUploadConDetails.style.margin = deviceIs ? "0 0 0 1vw" : "0 0 0 .2vw"

})();



(function addrightDDUploadConDetailsSelectFile() {
    rightDDUploadConDetails.appendChild(rightDDUploadConDetailsSelectFile)
    rightDDUploadConDetailsSelectFile.textContent = "Select File"
    rightDDUploadConDetailsSelectFile.style.left = deviceIs ? 0 : null
    rightDDUploadConDetailsSelectFile.style.maxHeight = deviceIs ? "5vw" : "2vw"
    rightDDUploadConDetailsSelectFile.style.minWidth = deviceIs ? "90%" : "90%"
    rightDDUploadConDetailsSelectFile.style.maxWidth = deviceIs ? "90%" : "90%"
    rightDDUploadConDetailsSelectFile.style.overflow = "scroll"
    rightDDUploadConDetailsSelectFile.style.display = "flex"
    // rightDDUploadConDetailsSelectFile.style.justifyContent = "center"
    rightDDUploadConDetailsSelectFile.style.alignItems = "center"
    rightDDUploadConDetailsSelectFile.style.color = "#fff"
    rightDDUploadConDetailsSelectFile.style.padding = deviceIs ? "2.5vw 3.5vw" : ".5vw .2vw"
    rightDDUploadConDetailsSelectFile.style.margin = deviceIs ? "0vw 3.5vw .4vw 3.5vw" : "0vw .8vw .4vw .8vw"
    rightDDUploadConDetailsSelectFile.style.fontSize = deviceIs ? "2.9vw" : "1vw"
    rightDDUploadConDetailsSelectFile.style.fontFamily = "sans-serif"
    rightDDUploadConDetailsSelectFile.style.borderRadius = deviceIs ? "3.8vw" : ".4vw"
    rightDDUploadConDetailsSelectFile.style.backgroundColor = "#000"
    rightDDUploadConDetailsSelectFile.style.scrollbarWidth = "thin"
    rightDDUploadConDetailsSelectFile.style.transition = "350ms"

    rightDDUploadConDetailsSelectFile.style.whiteSpace = "nowrap"
    rightDDUploadConDetailsSelectFile.style.cursor = "pointer"

})();



(function addrightDDUploadConDetailsOp() {
    rightDDUploadConDetails.appendChild(rightDDUploadConDetailsOp)
    // rightDDUploadConDetailsOp.textContent = "Upload Papers"
    rightDDUploadConDetailsOp.style.left = deviceIs ? 0 : null
    // rightDDUploadConDetailsOp.style.maxHeight = deviceIs ? "5vw" : "4vw"
    rightDDUploadConDetailsOp.style.minWidth = deviceIs ? "90%" : "90%"
    rightDDUploadConDetailsOp.style.overflow = "hidden"
    rightDDUploadConDetailsOp.style.display = "flex"
    rightDDUploadConDetailsOp.style.justifyContent = "center"
    rightDDUploadConDetailsOp.style.alignItems = "center"
    // rightDDUploadConDetailsOp.style.color = "#000"
    // rightDDUploadConDetailsOp.style.padding = deviceIs ? "2.5vw 3.5vw" : ".5vw .2vw"
    rightDDUploadConDetailsOp.style.margin = deviceIs ? "1.4vw 0.8vw 0vw" : ".4vw .8vw .4vw .8vw"
    rightDDUploadConDetailsOp.style.fontSize = deviceIs ? "2.9vw" : "1vw"
    rightDDUploadConDetailsOp.style.fontFamily = "sans-serif"
    rightDDUploadConDetailsOp.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    // rightDDUploadConDetailsOp.style.backgroundColor = "#f3f1f1"
    rightDDUploadConDetailsOp.style.scrollbarWidth = "thin"
    rightDDUploadConDetailsOp.style.transition = "350ms"
})();

(function addrightDDUploadConDetailsChaPerChunk() {
    rightDDUploadConDetailsOp.appendChild(rightDDUploadConDetailsChaPerChunk)
    rightDDUploadConDetailsChaPerChunk.style.all = "unset"
    rightDDUploadConDetailsChaPerChunk.placeholder = "CPC"
    rightDDUploadConDetailsChaPerChunk.title = "Characters Per Chunk e.g. 120"
    rightDDUploadConDetailsChaPerChunk.style.left = deviceIs ? 0 : null
    rightDDUploadConDetailsChaPerChunk.style.maxHeight = "100%"
    rightDDUploadConDetailsChaPerChunk.style.width = "50%"
    rightDDUploadConDetailsChaPerChunk.style.overflow = "hidden"
    rightDDUploadConDetailsChaPerChunk.style.display = "flex"
    rightDDUploadConDetailsChaPerChunk.style.justifyContent = "center"
    rightDDUploadConDetailsChaPerChunk.style.alignItems = "center"
    rightDDUploadConDetailsChaPerChunk.style.transition = "350ms"
    rightDDUploadConDetailsChaPerChunk.style.color = "#000"
    rightDDUploadConDetailsChaPerChunk.style.padding = deviceIs ? "2.5vw 3.5vw" : ".5vw 1vw"
    rightDDUploadConDetailsChaPerChunk.style.margin = deviceIs ? "1.4vw 0.8vw 0vw" : "0 .2vw 0 0"
    rightDDUploadConDetailsChaPerChunk.style.fontSize = deviceIs ? "2.9vw" : "1vw"
    rightDDUploadConDetailsChaPerChunk.style.fontFamily = "sans-serif"
    rightDDUploadConDetailsChaPerChunk.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDUploadConDetailsChaPerChunk.style.backgroundColor = "#fff"
    rightDDUploadConDetailsChaPerChunk.style.scrollbarWidth = "thin"
    rightDDUploadConDetailsChaPerChunk.style.transition = "350ms"
})();


(function addrightDDUploadConDetailsOvrlapPerChunk() {
    rightDDUploadConDetailsOp.appendChild(rightDDUploadConDetailsOvrlapPerChunk)
    rightDDUploadConDetailsOvrlapPerChunk.style.all = "unset"
    rightDDUploadConDetailsOvrlapPerChunk.placeholder = "OPC"
    rightDDUploadConDetailsOvrlapPerChunk.title = "Overlap Per Chunk e.g. 20"
    rightDDUploadConDetailsOvrlapPerChunk.style.left = deviceIs ? 0 : null
    rightDDUploadConDetailsOvrlapPerChunk.style.maxHeight = "100%"
    rightDDUploadConDetailsOvrlapPerChunk.style.width = "50%"
    rightDDUploadConDetailsOvrlapPerChunk.style.overflow = "hidden"
    rightDDUploadConDetailsOvrlapPerChunk.style.display = "flex"
    rightDDUploadConDetailsOvrlapPerChunk.style.justifyContent = "center"
    rightDDUploadConDetailsOvrlapPerChunk.style.alignItems = "center"
    rightDDUploadConDetailsOvrlapPerChunk.style.transition = "350ms"
    rightDDUploadConDetailsOvrlapPerChunk.style.color = "#000"
    rightDDUploadConDetailsOvrlapPerChunk.style.padding = deviceIs ? "2.5vw 3.5vw" : ".5vw 1vw"
    rightDDUploadConDetailsOvrlapPerChunk.style.margin = deviceIs ? "1.4vw 0.8vw 0vw" : "0 0 0 .2vw"
    rightDDUploadConDetailsOvrlapPerChunk.style.fontSize = deviceIs ? "2.9vw" : "1vw"
    rightDDUploadConDetailsOvrlapPerChunk.style.fontFamily = "sans-serif"
    rightDDUploadConDetailsOvrlapPerChunk.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDUploadConDetailsOvrlapPerChunk.style.backgroundColor = "#fff"
    rightDDUploadConDetailsOvrlapPerChunk.style.scrollbarWidth = "thin"
    rightDDUploadConDetailsOvrlapPerChunk.style.transition = "350ms"
})();

(function addrightDDConUploadedConEl() {
    rightDDCon.appendChild(rightDDConUploadedConEl)
    rightDDConUploadedConEl.style.left = deviceIs ? 0 : null
    rightDDConUploadedConEl.style.height = "100%"
    rightDDConUploadedConEl.style.overflowX = "hidden"
    rightDDConUploadedConEl.style.overflowY = "scroll"
    rightDDConUploadedConEl.style.display = "flex"
    rightDDConUploadedConEl.style.flexDirection = "column"
    rightDDConUploadedConEl.style.alignItems = "center"
    rightDDConUploadedConEl.style.transition = "350ms"
    rightDDConUploadedConEl.style.margin = "0 0 1vw 0"
    rightDDConUploadedConEl.style.color = "#000"
    rightDDConUploadedConEl.style.padding = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    rightDDConUploadedConEl.style.margin = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    rightDDConUploadedConEl.style.fontSize = deviceIs ? "3.9vw" : "1.2vw"
    rightDDConUploadedConEl.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDConUploadedConEl.style.backgroundColor = "#bababa"
    rightDDConUploadedConEl.style.scrollbarWidth = "thin"
    rightDDConUploadedConEl.style.transition = "350ms"


})();


(function addrightDDConUploadedCon() {
    // rightDDConUploadedConEl.appendChild(rightDDConUploadedCon)
    rightDDConUploadedCon.style.left = deviceIs ? 0 : null
    rightDDConUploadedCon.style.minHeight = deviceIs ? "17vw" : "5vw"
    rightDDConUploadedCon.style.width = "90%"
    rightDDConUploadedCon.style.overflow = "hidden"
    rightDDConUploadedCon.style.display = "flex"
    rightDDConUploadedCon.style.flexDirection = "column"
    // rightDDConUploadedCon.style.alignItems = "center"
    rightDDConUploadedCon.style.transition = "350ms"
    rightDDConUploadedCon.style.margin = "0 0 1vw 0"
    rightDDConUploadedCon.style.color = "#000"
    rightDDConUploadedCon.style.padding = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    rightDDConUploadedCon.style.margin = deviceIs ? "2.5vw 3.5vw" : ".8vw .8vw"
    rightDDConUploadedCon.style.fontSize = deviceIs ? "3.9vw" : "1.2vw"
    rightDDConUploadedCon.style.whiteSpace = "nowrap"
    rightDDConUploadedCon.style.textOverflow = "ellipsis"
    rightDDConUploadedCon.style.fontFamily = "sans-serif"
    rightDDConUploadedCon.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDConUploadedCon.style.backgroundColor = "#d2d0d0"
    rightDDConUploadedCon.style.scrollbarWidth = "thin"
    rightDDConUploadedCon.style.transition = "350ms"


})();


(function addrightDDConUploadedNameCon() {
    rightDDConUploadedCon.appendChild(rightDDConUploadedNameCon)
    rightDDConUploadedNameCon.innerText = "any_name.mdssssssssssssssssssssssssssssssssssssssss"
    rightDDConUploadedNameCon.style.left = deviceIs ? 0 : null
    // rightDDConUploadedNameCon.style.minHeight = deviceIs ? "5vw" : "2vw"
    rightDDConUploadedNameCon.style.overflow = "scroll"
    rightDDConUploadedNameCon.style.display = "flex"
    rightDDConUploadedNameCon.style.alignItems = "center"
    rightDDConUploadedNameCon.style.transition = "350ms"
    rightDDConUploadedNameCon.style.margin = "0 0 1vw 0"
    rightDDConUploadedNameCon.style.color = "#000"
    rightDDConUploadedNameCon.style.padding = deviceIs ? "2vw 3vw" : ".5vw .5vw"
    rightDDConUploadedNameCon.style.fontSize = deviceIs ? "3.9vw" : "1.2vw"
    rightDDConUploadedNameCon.style.whiteSpace = "nowrap"
    rightDDConUploadedNameCon.style.fontFamily = "sans-serif"
    rightDDConUploadedNameCon.style.borderRadius = deviceIs ? "2.5vw" : ".3vw"
    rightDDConUploadedNameCon.style.backgroundColor = "#c6c6c6"
    rightDDConUploadedNameCon.style.scrollbarWidth = "thin"
    rightDDConUploadedNameCon.style.transition = "350ms"

})();

(function addrightDDConUploadedMetaCon() {
    rightDDConUploadedCon.appendChild(rightDDConUploadedMetaCon)
    rightDDConUploadedMetaCon.innerText = ""
    rightDDConUploadedMetaCon.style.left = deviceIs ? 0 : null
    rightDDConUploadedMetaCon.style.minHeight = deviceIs ? "2vw" : "1vw"
    rightDDConUploadedMetaCon.style.maxWidth = "100%"
    // rightDDConUploadedMetaCon.style.width = deviceIs ? "5vw" : "5vw"
    rightDDConUploadedMetaCon.style.overflow = "scroll"
    rightDDConUploadedMetaCon.style.display = "flex"
    rightDDConUploadedMetaCon.style.alignItems = "center"
    rightDDConUploadedMetaCon.style.transition = "350ms"
    // rightDDConUploadedMetaCon.style.margin = "0 0 1vw 0"
    rightDDConUploadedMetaCon.style.color = "#000"
    // rightDDConUploadedMetaCon.style.padding = deviceIs ? "2vw 3vw" : ".5vw .5vw"
    rightDDConUploadedMetaCon.style.fontSize = deviceIs ? "1.9vw" : ".4vw"
    rightDDConUploadedMetaCon.style.whiteSpace = "nowrap"
    rightDDConUploadedMetaCon.style.textOverflow = "ellipsis"
    rightDDConUploadedMetaCon.style.fontFamily = "sans-serif"
    // rightDDConUploadedMetaCon.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    // rightDDConUploadedMetaCon.style.backgroundColor = "#c6c6c6"
    rightDDConUploadedMetaCon.style.scrollbarWidth = "thin"
    rightDDConUploadedMetaCon.style.transition = "350ms"
})();


(function addrightDDConUploadedMetaConSize() {
    rightDDConUploadedMetaCon.appendChild(rightDDConUploadedMetaConSize)
    rightDDConUploadedMetaConSize.innerText = "6MB"
    rightDDConUploadedMetaConSize.style.left = deviceIs ? 0 : null
    rightDDConUploadedMetaConSize.style.minHeight = deviceIs ? "2vw" : "1vw"
    // rightDDConUploadedMetaConSize.style.maxWidth = deviceIs ? "25vw" : "20vw"
    // rightDDConUploadedMetaConSize.style.overflow = "scroll"
    rightDDConUploadedMetaConSize.style.display = "flex"
    rightDDConUploadedMetaConSize.style.alignItems = "center"
    rightDDConUploadedMetaConSize.style.transition = "350ms"
    // rightDDConUploadedMetaConSize.style.margin = "0 0 1vw 0"
    rightDDConUploadedMetaConSize.style.color = "#000"
    rightDDConUploadedMetaConSize.style.padding = deviceIs ? "2vw 3vw" : ".5vw .5vw"
    rightDDConUploadedMetaConSize.style.fontSize = deviceIs ? "3vw" : ".8vw"
    rightDDConUploadedMetaConSize.style.whiteSpace = "nowrap"
    rightDDConUploadedMetaConSize.style.textOverflow = "ellipsis"
    rightDDConUploadedMetaConSize.style.fontFamily = "sans-serif"
    rightDDConUploadedMetaConSize.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDConUploadedMetaConSize.style.backgroundColor = "#c6c6c6"
    rightDDConUploadedMetaConSize.style.scrollbarWidth = "thin"
    rightDDConUploadedMetaConSize.style.transition = "350ms"
})();

(function addrightDDConUploadedMetaConVectors() {
    rightDDConUploadedMetaCon.appendChild(rightDDConUploadedMetaConVectors)
    rightDDConUploadedMetaConVectors.innerText = "45 embeddings"
    rightDDConUploadedMetaConVectors.style.left = deviceIs ? 0 : null
    rightDDConUploadedMetaConVectors.style.minHeight = deviceIs ? "2vw" : "1vw"
    // rightDDConUploadedMetaConVectors.style.maxWidth = deviceIs ? "45vw" : "20vw"
    // rightDDConUploadedMetaConVectors.style.overflow = "scroll"
    rightDDConUploadedMetaConVectors.style.display = "flex"
    rightDDConUploadedMetaConVectors.style.alignItems = "center"
    rightDDConUploadedMetaConVectors.style.transition = "350ms"
    rightDDConUploadedMetaConVectors.style.margin = deviceIs?"0 1vw":"0 0.5vw"
    rightDDConUploadedMetaConVectors.style.color = "#000"
    rightDDConUploadedMetaConVectors.style.padding = deviceIs ? "2vw 3vw" : ".5vw .5vw"
    rightDDConUploadedMetaConVectors.style.fontSize = deviceIs ? "3vw" : ".8vw"
    rightDDConUploadedMetaConVectors.style.whiteSpace = "nowrap"
    rightDDConUploadedMetaConVectors.style.textOverflow = "ellipsis"
    rightDDConUploadedMetaConVectors.style.fontFamily = "sans-serif"
    rightDDConUploadedMetaConVectors.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDConUploadedMetaConVectors.style.backgroundColor = "#c6c6c6"
    rightDDConUploadedMetaConVectors.style.scrollbarWidth = "thin"
    rightDDConUploadedMetaConVectors.style.transition = "350ms"
})();


(function addrightDDConUploadedMetaConUploaded() {
    rightDDConUploadedMetaCon.appendChild(rightDDConUploadedMetaConUploaded)
    rightDDConUploadedMetaConUploaded.innerText = "ds/dasd/sdas"
    rightDDConUploadedMetaConUploaded.style.left = deviceIs ? 0 : null
    rightDDConUploadedMetaConUploaded.style.minHeight = deviceIs ? "2vw" : "1vw"
    // rightDDConUploadedMetaConUploaded.style.maxWidth = deviceIs ? "35vw" : "20vw"
    // rightDDConUploadedMetaConUploaded.style.overflow = "scroll"
    rightDDConUploadedMetaConUploaded.style.display = "flex"
    rightDDConUploadedMetaConUploaded.style.alignItems = "center"
    rightDDConUploadedMetaConUploaded.style.transition = "350ms"
    rightDDConUploadedMetaConUploaded.style.margin = "0 0.5vw"
    rightDDConUploadedMetaConUploaded.style.color = "#000"
    rightDDConUploadedMetaConUploaded.style.padding = deviceIs ? "2vw 3vw" : ".5vw .5vw"
    rightDDConUploadedMetaConUploaded.style.fontSize = deviceIs ? "3vw" : ".8vw"
    rightDDConUploadedMetaConUploaded.style.whiteSpace = "nowrap"
    rightDDConUploadedMetaConUploaded.style.textOverflow = "ellipsis"
    rightDDConUploadedMetaConUploaded.style.fontFamily = "sans-serif"
    rightDDConUploadedMetaConUploaded.style.borderRadius = deviceIs ? "3.8vw" : "1vw"
    rightDDConUploadedMetaConUploaded.style.backgroundColor = "#c6c6c6"
    rightDDConUploadedMetaConUploaded.style.scrollbarWidth = "thin"
    rightDDConUploadedMetaConUploaded.style.transition = "350ms"
})();

// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
// rightDDConUploadedConEl.appendChild(rightDDConUploadedCon.cloneNode(true))
