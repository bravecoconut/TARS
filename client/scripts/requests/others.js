async function get_instructions() {
    const route = get_instructions_route
    const params = null
    const response = await getRequest(
        route,
        params
    )
    return response
}


async function get_memory() {
    const route = get_memory_route
    const params = null
    const response = await getRequest(
        route,
        params
    )
    return response
}


async function get_tones() {
    const route = get_tones_route
    const params = null
    const response = await getRequest(
        route,
        params
    )
    return response
}


async function get_user() {
    const route = get_user_route
    const params = null
    const response = await getRequest(
        route,
        params
    )
    return response
}


async function set_user_name(new_name) {
    const route = set_name_route
    const body = { name: new_name }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_instructions(new_instructions) {
    const route = update_instructions_route
    const body = { instructions: new_instructions }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_memory(new_memories) {
    const route = update_memory_route
    const body = { memory: new_memories }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function set_tone(new_tone) {
    const route = set_curr_tone_route
    const body = { curr_tone: new_tone }
    const response = await postRequest(
        route,
        body
    )
    return response
}