function toggleLeftConToggle() {
    const isHidden = leftContainerEl.style.width === "0vw"
    leftContainerEl.style.width = isHidden
        ? (deviceIs ? mobileLeftConWidth : desktopLeftConWidth)
        : "0vw"

    if (deviceIs) {
        if (isHidden) {
            leftContainerTop.appendChild(leftConToggle)
            touchBlockerEl.style.opacity = "1"
            touchBlockerEl.style.pointerEvents = "auto"
            leftContainerEl.style.zIndex = mostTopIndex
        } else {
            midConNavLeftDivider.appendChild(leftConToggle)
            touchBlockerEl.style.opacity = "0"
            touchBlockerEl.style.pointerEvents = "none"
            // touchBlockerEl.style.zIndex = 2
            leftContainerEl.style.zIndex = 2
        }
    }
}

function toggleRightConToggle() {
    const isHidden = rightContainerEl.style.width === "0vw"
    rightContainerEl.style.width = isHidden
        ? (deviceIs ? mobileRightConWidth : desktopRightConWidth)
        : "0vw"

    settingsContainerEl.style.width = isHidden
        ? "0vw"
        : "0vw"

    if (deviceIs) {
        if (isHidden) {
            rightContainerTop.appendChild(rightConToggle)
            touchBlockerEl.style.opacity = "1"
            touchBlockerEl.style.pointerEvents = "auto"
            rightContainerEl.style.zIndex = mostTopIndex
            rightConToggle.style.margin = "0 3vw 0 0"

        } else {
            rightConToggCon.appendChild(rightConToggle)
            touchBlockerEl.style.opacity = "0"
            touchBlockerEl.style.pointerEvents = "none"
            rightContainerEl.style.zIndex = 2
            rightConToggle.style.margin = "0 0 0 0"

        }
    }
}

function toggleSettingsConToggle() {
    const isHidden = settingsContainerEl.style.width === "0vw"
    settingsContainerEl.style.width = isHidden
        ? (deviceIs ? mobileSettingsConWidth : desktopSettingsConWidth)
        : "0vw"


    rightContainerEl.style.width = isHidden
        ? "0vw"
        : "0vw"

    if (deviceIs) {
        if (isHidden) {
            settingsContainerTop.appendChild(settingsConToggle)
            touchBlockerEl.style.opacity = "1"
            touchBlockerEl.style.pointerEvents = "auto"
            settingsContainerEl.style.zIndex = mostTopIndex
            settingsConToggle.style.margin = "0 3vw 0 0"
        } else {
            settingsConToggCon.appendChild(settingsConToggle)
            touchBlockerEl.style.opacity = "0"
            touchBlockerEl.style.pointerEvents = "none"
            settingsContainerEl.style.zIndex = 2
            settingsConToggle.style.margin = "0 0vw 0 0"

        }
    }
}

// toggleRightConToggle() // temp
// toggleSettingsConToggle() // temp

function openSessionRecap() {
    rightDDCon.style.display = "none"
    rightSRCon.style.flex = "1"
    rightSRCon.style.display = "flex"

}

function openDumpedDocuments() {
    rightDDCon.style.display = "flex"
    rightDDCon.style.flex = "1"
    rightSRCon.style.display = "none"


}

function showErrorModal(errorComment, errorData) {
    document.body.appendChild(errorModalEl)
    errorModalSummary.textContent = errorComment
    errorModalDetails.textContent = errorData
    errorModalEl.style.pointerEvents = "auto"
    errorModalEl.style.opacity = 1
    setTimeout(() => {
        errorModalEl.style.opacity = 0
        errorModalEl.style.pointerEvents = "None"
    }, 20000)
}



function addHover(
    element, eventObjectBefore, eventObjectAfter
) {
    element.addEventListener("mouseenter", eventObjectBefore)

    element.addEventListener("mouseleave", eventObjectAfter)
}

function addOpacityHover(element) {
    addHover(
        element,
        () => {
            element.style.opacity = 0.7
        },
        () => {
            element.style.opacity = 1
        },

    )
}




// function ensureBlinkKeyframes() {
//     if (document.getElementById("blinkKeyframes")) return // already injected

//     const styleTag = document.createElement("style")
//     styleTag.id = "blinkKeyframes"
//     styleTag.textContent = `
//         @keyframes blinkColor {
//             0%, 49% { background-color: #000; }
//             50%, 100% { background-color: #fff; }
//         }
//     `
//     document.head.appendChild(styleTag)
// }

// function addShimmerEffect(el) {
//     ensureBlinkKeyframes()

//     // remember original color, so it can be restored later
//     el.dataset.originalColor = el.style.color || ""

//     el.style.animation = "blinkColor 1s steps(1) infinite"
// }

// function removeShimmerEffect(el) {
//     el.style.animation = ""
//     el.style.color = el.dataset.originalColor || ""
//     delete el.dataset.originalColor
// }




function getLineHeightPx() {
    const computed = getComputedStyle(messageConMainTextarea)
    const lineHeight = parseFloat(computed.lineHeight)
    const fontSize = parseFloat(computed.fontSize)
    return lineHeight || fontSize * 1.2 // fallback if computed value is "normal"
}

function getNumberOfLines() {
    const prevHeight = messageConMainTextarea.style.height
    messageConMainTextarea.style.height = "auto" // must reset first — see earlier explanation

    const lineHeightPx = getLineHeightPx()
    const numberOfLines = Math.round(messageConMainTextarea.scrollHeight / lineHeightPx)

    messageConMainTextarea.style.height = prevHeight // restore before autoResize runs its own logic
    return numberOfLines
}


function pxToVw(px) {
    return (px / window.innerWidth) * 100
}

function makeBlink(el, intervalSeconds = 0.8) {
    // inject the keyframes rule once, reuse for every element
    if (!document.getElementById("blink-keyframes")) {
        const style = document.createElement("style")
        style.id = "blink-keyframes"
        style.textContent = `
            @keyframes blinkAnimation {
                0%, 49% { opacity: 1; }
                50%, 100% { opacity: 0; }
            }
        `
        document.head.appendChild(style)
    }

    el.style.animation = `blinkAnimation ${intervalSeconds}s steps(1, end) infinite`
}

function stopBlink(el) {
    el.style.animation = ""
}


function addShimmer(el) {
    if (!el) return

    // inject the shimmer CSS once, reused by every element
    if (!document.getElementById("shimmer-style")) {
        const style = document.createElement("style")
        style.id = "shimmer-style"
        style.textContent = `
            @keyframes shimmerSweep {
                0%   { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }

            .shimmer-active {
                position: relative;
                overflow: hidden;
            }

            .shimmer-active::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.35) 50%,
                    transparent 100%
                );
                animation: shimmerSweep 1.4s ease-in-out infinite;
                pointer-events: none; /* let clicks pass through to the real element */
            }
        `
        document.head.appendChild(style)
    }

    el.classList.add("shimmer-active")
}

function removeShimmer(el) {
    if (!el) return
    el.classList.remove("shimmer-active")
}

function messageTextareaSize() {
    if (messageConMainTextarea.value.length >= 1) {

        messageConMainCon.style.height = deviceIs ? "38vw" : "4vw"
        messageConMainOption.style.flexDirection = deviceIs ? "column" : ""
        messageConMainOption.style.alignSelf = "end"
        messageConMainSendMessage.style.opacity = 1
        messageConMainSendMessage.style.pointerEvents = "auto"


        if (getNumberOfLines() > (deviceIs ? 3 : 2)) {
            messageConMainCon.style.height = deviceIs ? "55vw" : "15vw"
        }

    } else {
        messageConMainOption.style.flexDirection = ""
        messageConMainCon.style.height = deviceIs ? "12vw" : "2vw"
        messageConMainOption.style.alignSelf = "center"
        messageConMainSendMessage.style.opacity = 0.7
        messageConMainSendMessage.style.pointerEvents = "none"


    }


    const computedLineHeightPx = parseFloat(getComputedStyle(messageConMainTextarea).lineHeight)
    console.log("lineheight in vw:", pxToVw(computedLineHeightPx) + "vw")
    console.log("lineheight in N:", computedLineHeightPx / messageConMainTextarea.style.lineHeight)
    console.log("number of lines:", getNumberOfLines())

}

messageTextareaSize()
