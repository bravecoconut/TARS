async function update_base_url(new_base_url) {
    const route = update_base_url_route
    const body = { base_url: new_base_url }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_api_key(new_api_key) {
    const route = update_api_key_route
    const body = { api_key: new_api_key }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_llm(new_llm_name) {
    const route = update_model_route
    const body = { model: new_llm_name }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_em_model(new_em_model_name) {
    const route = update_em_model_route
    const body = { em_model: new_em_model_name }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_mct(new_mct) {
    const route = update_mct_route
    const body = { mct: new_mct }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_max_retries(new_retries) {
    const route = update_max_retries_route
    const body = { max_retries: new_retries }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_timeout(new_timeout) {
    const route = update_timeout_route
    const body = { timeout: new_timeout }
    const response = await postRequest(
        route,
        body
    )
    return response
}