// *********************************************** //
// *********************************************** //
// settings panel                                  //
// *********************************************** //
// *********************************************** //


(function addGeneralSection() {
    settingsChildCon.appendChild(generalSection)
    // generalSection.style.border = "1px solid #000"
    generalSection.style.padding = deviceIs ? "2vw 1vw" : ".5vw .5vw"
    generalSection.style.fontFamily = "sans-serif"

})();

(function addGenSecHero() {
    generalSection.appendChild(generalHero)
    generalHero.innerText = "General"
    generalHero.style.borderBottom = "1px solid #00000084"
    generalHero.style.fontSize = deviceIs ? "6vw" : "1.5vw"
    generalHero.style.padding = deviceIs ? "2vw 1vw" : ".5vw .5vw"

})();

(function addGenSecNameSec() {
    generalSection.appendChild(generalNameSec)
    generalNameSec.style.borderBottom = "1px solid #00000084"
    generalNameSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    generalNameSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    generalNameSec.style.display = "flex"
    generalNameSec.style.justifyContent = "space-between"
    generalNameSec.style.alignItems = "center"


})();

(function addGenSecName() {
    generalNameSec.appendChild(generalName)
    generalName.innerText = "What should TARS call you?"
    generalName.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addGenSecNameMain() {
    generalNameSec.appendChild(generalNameMain)
    generalNameMain.innerText = "loading..."
    generalNameMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // generalNameMain.style.border = "1px solid #000"
    generalNameMain.style.maxWidth = deviceIs ? "30vw" : "8vw"
    generalNameMain.style.overflow = "scroll"
    generalNameMain.style.padding = deviceIs ? "0.6vw 3vw" : "0.2vw 1vw"
    generalNameMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"

    generalNameMain.addEventListener("click", () => saveString(set_user_name, generalName, generalNameMain, 15))
    generalNameMain.style.backgroundColor = "#d2d0d0"
    generalNameMain.style.cursor = "pointer"

})();

(function addGenSecInstructionsSec() {
    generalSection.appendChild(generalInstructionsSec)
    generalInstructionsSec.style.borderBottom = "1px solid #00000084"
    generalInstructionsSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    generalInstructionsSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    generalInstructionsSec.style.display = "flex"
    generalInstructionsSec.style.flexDirection = "column"

})();

(function addGenSecInstructions() {
    generalInstructionsSec.appendChild(generalInstructions)
    generalInstructions.innerText = "Instructions for TARS"
    generalInstructions.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addGenSecInstructionsMain() {
    generalInstructionsSec.appendChild(generalInstructionsMain)
    generalInstructionsMain.innerText = "loading..."
    generalInstructionsMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // generalInstructionsMain.style.border = "1px solid #000"
    generalInstructionsMain.style.minHeight = deviceIs ? "35vw" : "4vw"
    generalInstructionsMain.style.maxHeight = deviceIs ? "45vw" : "12vw"
    generalInstructionsMain.style.overflow = "scroll"
    generalInstructionsMain.style.padding = "0.5vw 0.7vw"
    generalInstructionsMain.style.margin = deviceIs ? "2vw 0" : "1vw 0"
    generalInstructionsMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"

    generalInstructionsMain.addEventListener("click", () => saveTextarea(update_instructions, generalInstructions, generalInstructionsMain))

    generalInstructionsMain.style.backgroundColor = "#d2d0d0"
    generalInstructionsMain.style.cursor = "pointer"

})();


(function addGenSecMemorySec() {
    generalSection.appendChild(generalMemorySec)
    generalMemorySec.style.borderBottom = "1px solid #00000084"
    generalMemorySec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    generalMemorySec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    generalMemorySec.style.display = "flex"
    generalMemorySec.style.flexDirection = "column"


})();

(function addGenSecMemory() {
    generalMemorySec.appendChild(generalMemory)
    generalMemory.innerText = "Memory"
    generalMemory.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addGenSecMemoryMain() {
    generalMemorySec.appendChild(generalMemoryMain)
    generalMemoryMain.innerText = "loading..."
    generalMemoryMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // generalMemoryMain.style.border = "1px solid #000"
    generalMemoryMain.style.minHeight = deviceIs ? "15vw" : "4vw"
    generalMemoryMain.style.maxHeight = deviceIs ? "45vw" : "12vw"
    generalMemoryMain.style.overflow = "scroll"
    generalMemoryMain.style.padding = "0.5vw 0.7vw"
    generalMemoryMain.style.margin = deviceIs ? "2vw 0" : "1vw 0"
    generalMemoryMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"

    generalMemoryMain.addEventListener("click", () => saveTextarea(update_memory, generalMemorySec, generalMemoryMain))

    generalMemoryMain.style.backgroundColor = "#d2d0d0"
    generalMemoryMain.style.cursor = "pointer"

})();

(function addGenSecToneSec() {
    generalSection.appendChild(generalToneSec)
    generalToneSec.style.borderBottom = "1px solid #00000084"
    generalToneSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    generalToneSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    generalToneSec.style.display = "flex"
    generalToneSec.style.justifyContent = "space-between"
    generalToneSec.style.alignItems = "center"

})();

(function addGenSecTone() {
    generalToneSec.appendChild(generalTone)
    generalTone.innerText = "Base style and tone"
    generalTone.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(async function addToneMain() {
    generalToneSec.appendChild(generalToneMain)
    generalToneMain.style.all = "unset"
    generalToneMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    generalToneMain.style.padding = deviceIs ? "1vw 3vw" : "0.5vw 0.7vw"
    // generalToneMain.style.border = "1px solid #000"
    generalToneMain.style.backgroundColor = "#fff"
    generalToneMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    generalToneMain.style.margin = "1vw 0"
    generalToneMain.style.cursor = "pointer"

    const generalTones = await getUserJSON()
    Object.keys(generalTones.avail_tones).forEach(tone => {
        const option = document.createElement("option")
        option.value = tone.toLowerCase()
        option.textContent = tone
        generalToneMain.appendChild(option)
        option.addEventListener("click", () => set_tone(tone.toLowerCase()))
    })

    generalToneMain.style.backgroundColor = "#d2d0d0"
    generalToneMain.style.cursor = "pointer"

})();

(function addSRCFSection() {
    settingsChildCon.appendChild(srcfSection)
    // srcfSection.style.border = "1px solid #000"
    srcfSection.style.padding = deviceIs ? "2vw 1vw" : ".5vw .5vw"
    srcfSection.style.fontFamily = "sans-serif"

})();

(function addSRCFSecHero() {
    srcfSection.appendChild(srcfHero)
    srcfHero.innerText = "SRCF"
    srcfHero.style.fontSize = deviceIs ? "6vw" : "1.5vw"
    srcfHero.style.padding = deviceIs ? "2vw 1vw" : "1vw .5vw"
    srcfHero.style.borderBottom = "1px solid #00000084"

})();

(function addSRCFSecDes() {
    srcfHero.appendChild(srcfDes)
    srcfDes.innerText = "SRCF — Self-Referential Context Filtering, removes irrelevant older messages using embedding similarity. Keeps conversations from hitting context limits and reduces token costs (no LLM call)."
    srcfDes.style.color = "#000000c7"
    // srcfDes.style.padding = deviceIs ? "0vw 1vw" : "0vw 0vw 1vw 0vw"
    srcfDes.style.fontSize = deviceIs ? "3.2vw" : ".9vw"
    srcfDes.style.fontStyle = "italic"
})();

(function addSRCFOnLengthSec() {
    srcfSection.appendChild(srcfOnLengthSec)
    srcfOnLengthSec.style.borderBottom = "1px solid #00000084"
    srcfOnLengthSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    srcfOnLengthSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    srcfOnLengthSec.style.display = "flex"
    srcfOnLengthSec.style.justifyContent = "space-between"
    srcfOnLengthSec.style.alignItems = "center"

})();

(function addGenSecSRCFOnLength() {
    srcfOnLengthSec.appendChild(srcfOnLength)
    srcfOnLength.innerText = "On SRCF when messages count exceeds"
    srcfOnLength.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSRCFOnLengthMain() {
    srcfOnLengthSec.appendChild(srcfOnLengthMain)
    srcfOnLengthMain.style.all = "unset"
    srcfOnLengthMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    srcfOnLengthMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    // srcfOnLengthMain.style.border = "1px solid #000"
    srcfOnLengthMain.style.backgroundColor = "#fff"
    srcfOnLengthMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    srcfOnLengthMain.style.margin = "1vw 0"
    srcfOnLengthMain.style.cursor = "pointer"
    const onLengths = ["100", "200", "400", "800", "1600", "3200"]
    onLengths.forEach(length => {
        const option = document.createElement("option")
        option.value = length.toLowerCase()
        option.textContent = length
        srcfOnLengthMain.appendChild(option)
        option.addEventListener("click", () => update_srcf_on_length(Number(length)))
    })
    srcfOnLengthMain.style.backgroundColor = "#d2d0d0"
    srcfOnLengthMain.style.cursor = "pointer"

})();


(function addSRCFPercentSec() {
    srcfSection.appendChild(srcfPercentSec)
    srcfPercentSec.style.borderBottom = "1px solid #00000084"
    srcfPercentSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    srcfPercentSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    srcfPercentSec.style.display = "flex"
    srcfPercentSec.style.justifyContent = "space-between"
    srcfPercentSec.style.alignItems = "center"

})();

(function addGenSecSRCFPercent() {
    srcfPercentSec.appendChild(srcfPercent)
    srcfPercent.innerText = "Older messages considered for filtering"
    srcfPercent.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSRCFpPercentMain() {
    srcfPercentSec.appendChild(srcfPercentMain)
    srcfPercentMain.style.all = "unset"
    srcfPercentMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    srcfPercentMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    // srcfPercentMain.style.border = "1px solid #000"
    srcfPercentMain.style.backgroundColor = "#d2d0d0"
    srcfPercentMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    srcfPercentMain.style.margin = "1vw 0"
    srcfPercentMain.style.cursor = "pointer"
    const percentages = ["10", "20", "30", "40", "50", "60", "70", "80", "90"]
    percentages.forEach(percent => {
        const option = document.createElement("option")
        option.value = Number(percent)
        option.textContent = `${percent}%`
        srcfPercentMain.appendChild(option)
        option.addEventListener("click", () => update_srcf_percent(Number(percent)))
    })
    srcfPercentMain.style.cursor = "pointer"

})();



(function addSRCFLastNSec() {
    srcfSection.appendChild(srcfLastNSec)
    srcfLastNSec.style.borderBottom = "1px solid #00000084"
    srcfLastNSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    srcfLastNSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    srcfLastNSec.style.display = "flex"
    srcfLastNSec.style.justifyContent = "space-between"
    srcfLastNSec.style.alignItems = "center"

})();

(function addGenSecSRCFLastN() {
    srcfLastNSec.appendChild(srcfLastN)
    srcfLastN.innerText = "Recent messages used for relevance match"
    srcfLastN.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSRCFLastNMain() {
    srcfLastNSec.appendChild(srcfLastNMain)
    srcfLastNMain.style.all = "unset"
    srcfLastNMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    srcfLastNMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    // srcfLastNMain.style.border = "1px solid #000"
    srcfLastNMain.style.backgroundColor = "#d2d0d0"
    srcfLastNMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    srcfLastNMain.style.margin = "1vw 0"
    srcfLastNMain.style.cursor = "pointer"
    const Ns = ["1", "2", "3", "4", "5", "6", "7", "8"]
    Ns.forEach(n => {
        const option = document.createElement("option")
        option.value = n
        option.textContent = n
        srcfLastNMain.appendChild(option)
        option.addEventListener("click", () => update_srcf_last_n(Number(n)))

    })
    srcfLastNMain.style.cursor = "pointer"

})();


(function addSRCFThresholdSec() {
    srcfSection.appendChild(srcfThresholdSec)
    srcfThresholdSec.style.borderBottom = "1px solid #00000084"
    srcfThresholdSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    srcfThresholdSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    srcfThresholdSec.style.display = "flex"
    srcfThresholdSec.style.justifyContent = "space-between"
    srcfThresholdSec.style.alignItems = "center"

})();

(function addGenSecSRCFThreshold() {
    srcfThresholdSec.appendChild(srcfThreshold)
    srcfThreshold.innerText = "Relevance strictness"
    srcfThreshold.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSRCFThresholdMain() {
    srcfThresholdSec.appendChild(srcfThresholdMain)
    srcfThresholdMain.style.all = "unset"
    srcfThresholdMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    srcfThresholdMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    // srcfThresholdMain.style.border = "1px solid #000"
    srcfThresholdMain.style.backgroundColor = "#d2d0d0"
    srcfThresholdMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    srcfThresholdMain.style.margin = "1vw 0"
    srcfThresholdMain.style.cursor = "pointer"
    const thresholds = ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"]
    thresholds.forEach(thresholds => {
        const option = document.createElement("option")
        option.value = thresholds.toLowerCase()
        option.textContent = thresholds
        srcfThresholdMain.appendChild(option)
        option.addEventListener("click", () => update_srcf_threshold(parseFloat(thresholds)))

    })
    srcfThresholdMain.style.cursor = "pointer"

})();

(function addSRCFThresholdDesMain() {
    srcfThreshold.appendChild(srcfThresholdDes)
    srcfThresholdDes.innerText = "lower = stricter match"
    srcfThresholdDes.style.color = "#000000c7"
    srcfThresholdDes.style.fontSize = deviceIs ? "3.2vw" : ".9vw"
    srcfThresholdDes.style.fontStyle = "italic"
})();


(function addClientSection() {
    settingsChildCon.appendChild(clientSection)
    clientSection.style.padding = deviceIs ? "2vw 1vw" : ".5vw .5vw"
    clientSection.style.fontFamily = "sans-serif"

})();

(function addClientSecHero() {
    clientSection.appendChild(clientHero)
    clientHero.innerText = "Client"
    clientHero.style.borderBottom = "1px solid #00000084"
    clientHero.style.fontSize = deviceIs ? "6vw" : "1.5vw"
    clientHero.style.padding = deviceIs ? "2vw 1vw" : ".5vw .5vw"

})();

(function addBaseUrlSec() {
    clientSection.appendChild(clientBaseUrlSec)
    clientBaseUrlSec.style.borderBottom = "1px solid #00000084"
    clientBaseUrlSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    clientBaseUrlSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    clientBaseUrlSec.style.display = "flex"
    clientBaseUrlSec.style.flexDirection = "column"

})();

(function addSecBaseUrl() {
    clientBaseUrlSec.appendChild(clientBaseUrl)
    clientBaseUrl.innerText = "OpenAI compatible endpoint"
    clientBaseUrl.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSecBaseUrlMain() {
    clientBaseUrlSec.appendChild(clientBaseUrlMain)
    clientBaseUrlMain.innerText = "loading..."
    clientBaseUrlMain.style.all = "unset"
    clientBaseUrlMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // clientBaseUrlMain.style.border = "1px solid #000"
    clientBaseUrlMain.style.overflow = "scroll"
    clientBaseUrlMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    clientBaseUrlMain.style.margin = "1vw 0"
    clientBaseUrlMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    clientBaseUrlMain.style.backgroundColor = "#d2d0d0"

    clientBaseUrlMain.addEventListener("click", () => saveString(update_base_url, clientBaseUrl, clientBaseUrlMain, 100))
    clientBaseUrlMain.style.cursor = "pointer"


})();

(function addAPIKeySec() {
    clientSection.appendChild(clientAPIKeySec)
    clientAPIKeySec.style.borderBottom = "1px solid #00000084"
    clientAPIKeySec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    clientAPIKeySec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    clientAPIKeySec.style.display = "flex"
    clientAPIKeySec.style.flexDirection = "column"

})();

(function addSecAPIKey() {
    clientAPIKeySec.appendChild(clientAPIKey)
    clientAPIKey.innerText = "API key"
    clientAPIKey.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSecAPIKeyMain() {
    clientAPIKeySec.appendChild(clientAPIKeyMain)
    clientAPIKeyMain.innerText = "loading..."
    clientAPIKeyMain.style.backgroundColor = "#d2d0d0"
    clientAPIKeyMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // clientAPIKeyMain.style.border = "1px solid #000"
    clientAPIKeyMain.style.maxHeight = "12vw"
    clientAPIKeyMain.style.overflow = "scroll"
    clientAPIKeyMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    clientAPIKeyMain.style.margin = "1vw 0"
    clientAPIKeyMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"

    clientAPIKeyMain.addEventListener("click", () => saveString(update_api_key, clientAPIKey, touchBlockerEl, 10000000))
    clientAPIKeyMain.style.cursor = "pointer"

})();


(function addLLMSec() {
    clientSection.appendChild(clientLLMSec)
    clientLLMSec.style.borderBottom = "1px solid #00000084"
    clientLLMSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    clientLLMSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    clientLLMSec.style.display = "flex"
    clientLLMSec.style.flexDirection = "column"

})();

(function addLLMKey() {
    clientLLMSec.appendChild(clientLLM)
    clientLLM.innerText = "Model ID"
    clientLLM.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSecLLMMain() {
    clientLLMSec.appendChild(clientLLMMain)
    clientLLMMain.innerText = "loading..."
    clientLLMMain.style.all = "unset"
    clientLLMMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    clientLLMMain.style.backgroundColor = "#d2d0d0"
    // clientLLMMain.style.border = "1px solid #000"
    clientLLMMain.style.maxHeight = "12vw"
    clientLLMMain.style.overflow = "scroll"
    clientLLMMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    clientLLMMain.style.margin = "1vw 0"
    clientLLMMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    clientLLMMain.style.fontFamily = "'Courier New', Consolas, Monaco, monospace"

    clientLLMMain.addEventListener("click", () => saveString(update_llm, clientLLM, clientLLMMain, 50))
    clientLLMMain.style.cursor = "pointer"

})();


(function addEmbedModelSec() {
    clientSection.appendChild(clientEmbedModelSec)
    clientEmbedModelSec.style.borderBottom = "1px solid #00000084"
    clientEmbedModelSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    clientEmbedModelSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    clientEmbedModelSec.style.display = "flex"
    clientEmbedModelSec.style.flexDirection = "column"

})();

(function addEmbedModelKey() {
    clientEmbedModelSec.appendChild(clientEmbedModel)
    clientEmbedModel.innerText = "Embeding model ID"
    clientEmbedModel.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSecEmbedModelMain() {
    clientEmbedModelSec.appendChild(clientEmbedModelMain)
    clientEmbedModelMain.innerText = "loading..."
    clientEmbedModelMain.style.all = "unset"
    clientEmbedModelMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // clientEmbedModelMain.style.border = "1px solid #000"
    clientEmbedModelMain.style.maxHeight = "12vw"
    clientEmbedModelMain.style.overflow = "scroll"
    clientEmbedModelMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    clientEmbedModelMain.style.margin = "1vw 0"
    clientEmbedModelMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    clientEmbedModelMain.style.fontFamily = "'Courier New', Consolas, Monaco, monospace"
    clientEmbedModelMain.style.backgroundColor = "#d2d0d0"

    clientEmbedModelMain.addEventListener("click", () => saveString(update_em_model, clientEmbedModel, clientEmbedModelMain, 50))
    clientEmbedModelMain.style.cursor = "pointer"

})();


(function addMCTSec() {
    clientSection.appendChild(clientMCTSec)
    clientMCTSec.style.borderBottom = "1px solid #00000084"
    clientMCTSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    clientMCTSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    clientMCTSec.style.display = "flex"
    clientMCTSec.style.justifyContent = "space-between"
    clientMCTSec.style.alignItems = "center"

})();

(function addMCTKey() {
    clientMCTSec.appendChild(clientMCT)
    clientMCT.innerText = "Max complition tokens"
    clientMCT.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSecMCTMain() {
    clientMCTSec.appendChild(clientMCTMain)
    clientMCTMain.innerText = "loading..."
    clientMCTMain.style.all = "unset"
    clientMCTMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // clientMCTMain.style.border = "1px solid #000"
    clientMCTMain.style.maxWidth = deviceIs ? "50vw" : "10vw"
    clientMCTMain.style.overflow = "scroll"
    clientMCTMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    clientMCTMain.style.margin = "1vw 0"
    clientMCTMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    clientMCTMain.style.backgroundColor = "#d2d0d0"

    clientMCTMain.addEventListener("click", () => saveNumber(update_mct, clientMCT, clientMCTMain, 999999))
    clientMCTMain.style.cursor = "pointer"

})();


(function addMRSec() {
    clientSection.appendChild(clientMRSec)
    clientMRSec.style.borderBottom = "1px solid #00000084"
    clientMRSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    clientMRSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    clientMRSec.style.display = "flex"
    clientMRSec.style.justifyContent = "space-between"
    clientMRSec.style.alignItems = "center"

})();

(function addMRKey() {
    clientMRSec.appendChild(clientMR)
    clientMR.innerText = "Max retries"
    clientMR.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSecMRMain() {
    clientMRSec.appendChild(clientMRMain)
    clientMRMain.innerText = "loading..."
    clientMRMain.style.all = "unset"
    clientMRMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // clientMRMain.style.border = "1px solid #000"
    clientMRMain.style.maxWidth = deviceIs ? "50vw" : "10vw"
    clientMRMain.style.overflow = "scroll"
    clientMRMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    clientMRMain.style.margin = "1vw 0"
    clientMRMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    clientMRMain.style.backgroundColor = "#d2d0d0"

    clientMRMain.addEventListener("click", () => saveNumber(update_max_retries, clientMR, clientMRMain, 50))
    clientMRMain.style.cursor = "pointer"

})();


(function addTimeoutSec() {
    clientSection.appendChild(clientTimeoutSec)
    clientTimeoutSec.style.borderBottom = "1px solid #00000084"
    clientTimeoutSec.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    clientTimeoutSec.style.padding = deviceIs ? "5vw 1vw" : "1.5vw .5vw"
    clientTimeoutSec.style.display = "flex"
    clientTimeoutSec.style.justifyContent = "space-between"
    clientTimeoutSec.style.alignItems = "center"

})();

(function addTimeoutKey() {
    clientTimeoutSec.appendChild(clientTimeout)
    clientTimeout.innerText = "Timeout on which seconds?"
    clientTimeout.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
})();

(function addSecTimeoutMain() {
    clientTimeoutSec.appendChild(clientTimeoutMain)
    clientTimeoutMain.innerText = "loading..."
    clientTimeoutMain.style.all = "unset"
    clientTimeoutMain.style.fontSize = deviceIs ? "4.5vw" : "1.1vw"
    // clientTimeoutMain.style.border = "1px solid #000"
    clientTimeoutMain.style.maxWidth = deviceIs ? "50vw" : "10vw"
    clientTimeoutMain.style.overflow = "scroll"
    clientTimeoutMain.style.padding = deviceIs ? "2vw 2.2vw" : "0.5vw 0.7vw"
    clientTimeoutMain.style.margin = "1vw 0"
    clientTimeoutMain.style.borderRadius = deviceIs ? "1.5vw" : ".5vw"
    clientTimeoutMain.style.backgroundColor = "#d2d0d0"

    clientTimeoutMain.addEventListener("click", () => saveNumber(update_timeout, clientTimeout, clientTimeoutMain, 9999999))
    clientTimeoutMain.style.cursor = "pointer"

})();