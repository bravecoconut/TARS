async function getUserJSON() {
    const userJSON = await get_user()

    if (!userJSON.status || !userJSON.data.status) {
        console.error(userJSON)
        showErrorModal(JSON.stringify(userJSON.comment), JSON.stringify(userJSON.data))
    }
    return userJSON.data.data
}

async function getInstructionsJSON() {
    const instructionsJSON = await get_instructions()
    console.log(instructionsJSON)

    if (!instructionsJSON.status) {
        console.error(instructionsJSON)
        showErrorModal(JSON.stringify(instructionsJSON.comment), JSON.stringify(instructionsJSON.data))

    }
    return instructionsJSON.data.data
}

async function getMemoryJSON() {
    const memoryJSON = await get_memory()
    console.log(memoryJSON)

    if (!memoryJSON.status) {
        console.error(memoryJSON)
        showErrorModal(JSON.stringify(memoryJSON.comment), JSON.stringify(memoryJSON.data))

    }
    
    return memoryJSON.data.data
}


async function putUserJSONData(userJSON, instructions, memory) {
    console.log(userJSON);

    generalNameMain.innerText = userJSON.name
    generalInstructionsMain.innerText = instructions
    generalMemoryMain.innerText = memory
    generalToneMain.value = userJSON.curr_tone
    srcfOnLengthMain.value = userJSON.srcf_on_length
    srcfPercentMain.value = userJSON.srcf_percent
    srcfLastNMain.value = userJSON.srcf_last_n
    srcfThresholdMain.value = userJSON.srcf_threshold
    clientBaseUrlMain.innerText = userJSON.base_url
    clientAPIKeyMain.innerText = maskApiKey(userJSON.api_key)
    clientLLMMain.innerText = userJSON.model
    clientEmbedModelMain.innerText = userJSON.embedding_model
    clientMCTMain.innerText = userJSON.max_completion_tokens
    clientMRMain.innerText = userJSON.max_retries
    clientTimeoutMain.innerText = userJSON.timeout

}


(async function temp() {
    let user = await getUserJSON()
    let inst = await getInstructionsJSON()
    let memo = await getMemoryJSON()

    await putUserJSONData(user, inst, memo)
})();
