let sureIsOpen = false // module-level state, source of truth

function toggleSure() {
    if (sureIsOpen) {
        // currently open → collapse it
        rightDDUploadConClearAllSure.style.maxHeight = "0"
        rightDDUploadConClearAllSure.style.padding = "0"
        rightDDUploadConClearAllSure.style.margin = "0"
        rightDDConUploadedConEl.style.height = "100%"

    } else {
        // currently closed → expand it
        rightDDUploadConClearAllSure.style.maxHeight = deviceIs ? "5vw" : "2vw"
        rightDDUploadConClearAllSure.style.padding = deviceIs ? "2.5vw 3.5vw" : ".5vw .2vw"
        rightDDUploadConClearAllSure.style.margin = deviceIs ? "1.5vw 3.5vw" : ".4vw .8vw .0vw .8vw"
        rightDDConUploadedConEl.style.height = deviceIs ? "75%" : "60%"
    }

    sureIsOpen = !sureIsOpen // flip state for next call
};

rightDDUploadConDetailsOvrlapPerChunk.addEventListener("input", () => {
    const cleaned = rightDDUploadConDetailsOvrlapPerChunk.value.replace(/[^0-9]/g, "")
    if (cleaned !== rightDDUploadConDetailsOvrlapPerChunk.value) {
        rightDDUploadConDetailsOvrlapPerChunk.value = cleaned
    }
});

rightDDUploadConDetailsChaPerChunk.addEventListener("input", () => {
    const cleaned = rightDDUploadConDetailsChaPerChunk.value.replace(/[^0-9]/g, "")
    if (cleaned !== rightDDUploadConDetailsChaPerChunk.value) {
        rightDDUploadConDetailsChaPerChunk.value = cleaned
    }
});


const selectedFile = {};

(function addRightDDUploadConDetailsFileInput() {
    const fileInput = document.createElement("input")
    rightDDUploadConDetails.appendChild(fileInput)

    fileInput.type = "file"
    fileInput.accept = ".md, .txt, text/plain, text/markdown"
    fileInput.style.display = "none"

    rightDDUploadConDetailsSelectFile.addEventListener("click", () => {
        fileInput.click()
    })

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if (!file) return // user cancelled

        // --- real validation: check the actual filename extension ---
        const allowedExtensions = [".md", ".txt"]
        const fileName = file.name.toLowerCase()
        const isAllowed = allowedExtensions.some(ext => fileName.endsWith(ext))

        if (!isAllowed) {
            showErrorModal(
                "Unsupported file type",
                `"${file.name}" isn't a supported file. Please select a .md or .txt file. or provide ASCII file path to TARS and ask to him analyse.`
            )
            fileInput.value = "" // reset so the same rejected file can be re-picked/retried
            return // stop here — don't process the file any further
        }


        rightDDUploadConDetailsSelectFile.textContent = file.name

        const reader = new FileReader()
        reader.onload = () => {
            const fileText = reader.result

            selectedFile["fileName"] = file.name
            selectedFile["fileSize"] = file.size
            selectedFile["fileText"] = fileText

        }
        fileInput.value = ""
        reader.readAsText(file)
        console.log("file")
        console.log(selectedFile)
    })
})();

function getIndexOfLastUserMessage(messages) {
    let lastIndex = -1

    messages.forEach((message, index) => {
        if (message.role === "user" && !message.added) {
            lastIndex = index
        }
    })

    return lastIndex
}

function getMessagesUntilLastUserMessage(messages, includeLastUserMessage = true) {
    const lastIndex = getIndexOfLastUserMessage(messages)

    if (lastIndex === -1) {
        return []
    }

    return includeLastUserMessage
        ? messages.slice(0, lastIndex + 1)
        : messages.slice(0, lastIndex)
}