
async function saveStringEvent(functionObject, max_characters) {
    if (saverInputEl.value.length < max_characters) {

        const save = await functionObject(saverInputEl.value)
        saverInputEl.style.display = "none"

        if (!save.status) {
            showErrorModal(JSON.stringify(save.comment), JSON.stringify(save.data))
        }

    } else {

        showErrorModal(
            "you exceed the max character limit",
            `use any short string under ${max_characters} characters`
        )


    }

    user = await getUserJSON()
    inst = await getInstructionsJSON()
    memo = await getMemoryJSON()

    await putUserJSONData(user, inst, memo)
    touchBlockerEl.style.opacity = 0
    touchBlockerEl.style.pointerEvents = "none"
    document.body.removeChild(saverEl)

}

async function saveString(
    functionObject,
    element,
    innerTextEl,
    max_characters,
) {
    let user = await getUserJSON()
    let inst = await getInstructionsJSON()
    let memo = await getMemoryJSON()
    await putUserJSONData(user, inst, memo)


    saverCommentEl.textContent = element.innerText
    touchBlockerEl.style.opacity = 1
    touchBlockerEl.style.pointerEvents = "auto"

    touchBlockerEl.style.zIndex = mostTopIndex1
    saverEl.style.zIndex = mostTopIndex2

    saverInputEl.type = "text"

    saverTextareaEl.style.display = "none"
    saverInputEl.style.display = null

    saverInputEl.value = innerTextEl.innerText

    document.body.appendChild(saverEl)

    saverCancelEl.addEventListener("click", () => {
        touchBlockerEl.style.opacity = 0
        touchBlockerEl.style.pointerEvents = "none"
        document.body.removeChild(saverEl)

    })


    saverSaveEl.addEventListener("click", async () => saveStringEvent(functionObject, max_characters), { once: true })

};




async function saveNumberEvent(functionObject, maxN) {
    if (isNaN(saverInputEl.valueAsNumber)) {
        showErrorModal(
            "you can't character that are not numeric",
            `use any number value under ${maxN}`
        )
    }

    if (saverInputEl.valueAsNumber < maxN) {

        const save = await functionObject(saverInputEl.valueAsNumber)
        saverInputEl.style.display = "none"

        if (!save.status) {
            showErrorModal(JSON.stringify(save.comment), JSON.stringify(save.data))
        }

    } else {

        showErrorModal(
            "you exceed the max limit",
            `use any short numeric value under ${maxN}`
        )

    }


    user = await getUserJSON()
    inst = await getInstructionsJSON()
    memo = await getMemoryJSON()

    await putUserJSONData(user, inst, memo)
    touchBlockerEl.style.opacity = 0
    touchBlockerEl.style.pointerEvents = "none"
    document.body.removeChild(saverEl)

}

async function saveNumber(
    functionObject,
    element,
    innerTextEl,
    maxN,
) {
    let user = await getUserJSON()
    let inst = await getInstructionsJSON()
    let memo = await getMemoryJSON()
    await putUserJSONData(user, inst, memo)


    saverCommentEl.textContent = element.innerText
    touchBlockerEl.style.opacity = 1
    touchBlockerEl.style.pointerEvents = "auto"
    saverInputEl.type = "number"

    touchBlockerEl.style.zIndex = mostTopIndex1
    saverEl.style.zIndex = mostTopIndex2

    saverTextareaEl.style.display = "none"
    saverInputEl.style.display = null

    saverInputEl.valueAsNumber = innerTextEl.innerText

    document.body.appendChild(saverEl)

    saverCancelEl.addEventListener("click", () => {
        touchBlockerEl.style.opacity = 0
        touchBlockerEl.style.pointerEvents = "none"
        document.body.removeChild(saverEl)

    })


    saverSaveEl.addEventListener("click", async () => saveNumberEvent(functionObject, maxN), { once: true })

};


async function saveTextareaEvent(functionObject) {

    const save = await functionObject(saverTextareaEl.value)

    if (!save.status) {
        showErrorModal(JSON.stringify(save.comment), JSON.stringify(save.data))
    }


    user = await getUserJSON()
    inst = await getInstructionsJSON()
    memo = await getMemoryJSON()

    await putUserJSONData(user, inst, memo)
    touchBlockerEl.style.opacity = 0
    touchBlockerEl.style.zIndex = 2
    touchBlockerEl.style.pointerEvents = "none"
    document.body.removeChild(saverEl)

}

async function saveTextarea(
    functionObject,
    element,
    innerTextEl,
) {
    let user = await getUserJSON()
    let inst = await getInstructionsJSON()
    let memo = await getMemoryJSON()
    await putUserJSONData(user, inst, memo)


    saverCommentEl.textContent = element.innerText
    touchBlockerEl.style.opacity = 1
    touchBlockerEl.style.pointerEvents = "auto"

    touchBlockerEl.style.zIndex = mostTopIndex1
    saverEl.style.zIndex = mostTopIndex2

    saverInputEl.style.display = "none"
    saverTextareaEl.style.display = null

    saverTextareaEl.value = innerTextEl.innerText

    document.body.appendChild(saverEl)

    saverCancelEl.addEventListener("click", () => {
        touchBlockerEl.style.opacity = 0
        touchBlockerEl.style.zIndex = 2
        touchBlockerEl.style.pointerEvents = "none"
        document.body.removeChild(saverEl)

    })
    saverSaveEl.addEventListener("click", async () => saveTextareaEvent(functionObject), { once: true })
};

// (async function name() {
//     clientBaseUrlMain.addEventListener("click", () => saveString(update_base_url, clientBaseUrl, clientBaseUrlMain, 100))
// })();