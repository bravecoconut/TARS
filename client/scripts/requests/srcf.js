async function update_srcf_on_length(new_length) {
    const route = update_srcf_on_length_route
    const body = { srcf_on_length: new_length }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_srcf_percent(new_percent) {
    const route = update_srcf_percent_route
    const body = { srcf_percent: new_percent }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_srcf_last_n(new_n) {
    const route = update_srcf_last_n_route
    const body = { srcf_last_n: new_n }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_srcf_threshold(new_threshold) {
    const route = update_srcf_threshold_route
    const body = { srcf_threshold: new_threshold }
    const response = await postRequest(
        route,
        body
    )
    return response
}