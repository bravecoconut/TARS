function RH(status, comment, data) {
    if (!status) {
        console.log(`${comment}:${data}`)
    }

    return {
        "status": status,
        "comment": comment,
        "data": data,
    }
}

function maskApiKey(key) {
    if (!key || key.length <= 4) return key // too short to mask meaningfully, show as-is
    const last4 = key.slice(-4)
    const masked = "*".repeat(key.length - 4)
    return masked + last4
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function clearAllListeners(el) {
    const clone = el.cloneNode(true) // copies attributes/children, but NOT event listeners
    el.replaceWith(clone)
    return clone
}


function epochToLocalTime(epochSeconds) {
    const date = new Date(epochSeconds * 1000)
    return date.toLocaleString()
}


function startCountdown(el, timeoutSeconds, startEpochSeconds) {
    if (!timeoutSeconds) {
        el.textContent = ""
        return null // nothing to clean up
    }

    let intervalId

    function update() {
        // stop automatically if the element got removed from the page
        if (!el.isConnected) {
            clearInterval(intervalId)
            return
        }

        const now = Date.now() / 1000 // current time in seconds, matching your epoch format
        const elapsed = now - startEpochSeconds
        const remaining = Math.max(0, Math.ceil(timeoutSeconds - elapsed))

        el.textContent = remaining > 0 ? `${remaining}s` : ""

        if (remaining <= 0) {
            clearInterval(intervalId)
        }
    }

    update() // run immediately, so it doesn't show blank/stale for the first second
    intervalId = setInterval(update, 1000)

    return intervalId // caller can clearInterval(this) manually if needed
}

function removeCountdown(el, intervalId) {
    if (intervalId) {
        clearInterval(intervalId)
    }

    if (el) {
        el.textContent = ""
    }
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    if (!bytes || bytes < 0) return "--" // guard against null/undefined/negative input

    const k = 1024
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB"]

    // figure out which unit bucket this number falls into
    // e.g. 5,000,000 bytes → log(5000000)/log(1024) ≈ 2.15 → floor → index 2 → "MB"
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    const value = bytes / Math.pow(k, i)
    const rounded = parseFloat(value.toFixed(decimals)) // trims trailing zeros, e.g. 2.00 → 2

    return `${rounded}${sizes[i]}`
}

function formatMessagesForOpenAI(rawMessages) {
    const messages = []

    rawMessages.forEach(rawMessage => {
        if (rawMessage.role === "user") {

            if (Array.isArray(rawMessage.content)) {
                const content = []

                rawMessage.content.forEach(mee => {
                    if (mee.type === "text") {
                        content.push({
                            "type": "text",
                            "text": mee.text
                        })
                    }

                    if (mee.type === "image_url") {
                        content.push({
                            "type": "image_url",
                            "image_url": mee.image_url
                        })
                    }
                });

                messages.push({
                    "role": "user",
                    "content": content
                })

            } else {

                messages.push({
                    "role": "user",
                    "content": rawMessage.content
                })

            }
        }

        else if (rawMessage.role === "assistant") {
            messages.push({
                "role": "assistant",
                "content": rawMessage.content
            })
        }

        else if (rawMessage.role === "system") {
            messages.push({
                "role": "system",
                "content": rawMessage.content
            })
        }

        else if (rawMessage?.event) {
            const events = Array.isArray(rawMessage.event) ? rawMessage.event : [rawMessage.event]

            // collapse the start/update/timeout/done stream down to one entry per tool_call_id
            const byCallId = {}

            events.forEach(evt => {
                const tc = evt.tool_call
                if (!tc || !tc.tool_call_id) return // the final "done" (turn-level) event has no tool_call — skip it

                if (!byCallId[tc.tool_call_id]) {
                    byCallId[tc.tool_call_id] = { start: null, done: null }
                }

                if (evt.type === "tool_start") {
                    byCallId[tc.tool_call_id].start = tc
                }

                if (evt.type === "tool_done") {
                    byCallId[tc.tool_call_id].done = tc
                }
            })

            const callIds = Object.keys(byCallId)
            if (callIds.length === 0) return

            // one assistant message listing every call made this turn
            messages.push({
                role: "assistant",
                content: null,
                tool_calls: callIds.filter(id => byCallId[id].start).map(id => {
                    const { start } = byCallId[id]
                    return {
                        id,
                        type: "function",
                        function: {
                            name: start.tool_name,
                            arguments: JSON.stringify(start.tool_args)
                        }
                    }
                })
            })

            // one tool-result message per call, linked back by tool_call_id
            callIds.forEach(id => {
                const { done } = byCallId[id]
                messages.push({
                    role: "tool",
                    tool_call_id: id,
                    content: done ? String(done.result) : "no result recorded"
                })
            })
        }

    });

    return messages
}


function isUserAtBottom() {
    const threshold = 20 * window.innerHeight / 100 // 5vw of tolerance
    return messagesConEl.scrollTop + messagesConEl.clientHeight >= messagesConEl.scrollHeight - threshold
}


function safeRemove(el) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el)
    }
}