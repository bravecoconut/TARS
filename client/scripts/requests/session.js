async function create_session(new_session_name) {
    const route = create_session_route
    const body = { name: new_session_name }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function delete_session(session_id) {
    const route = delete_session_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function change_session_name(session_id, new_name) {
    const route = change_session_name_route
    const body = { session_id: session_id, name: new_name }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function toggle_session_pin(session_id) {
    const route = toggle_session_pin_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function get_one_session(session_id, start_m, end_m) {
    const route = get_session_route
    const body = {
        session_id: session_id, start_m: start_m, end_m: end_m
    }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function get_all_sessions(start, end) {
    const route = get_all_sessions_route
    const body = { start: start, end: end }
    const response = await postRequest(
        route,
        body
    )
    return response
}