async function create_message(session_id, new_message) {
    const route = create_new_message_route
    const body = { session_id: session_id, message: new_message }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function update_last_user_message(session_id, new_message) {
    const route = update_last_user_message_route
    const body = { session_id: session_id, message: new_message }
    const response = await postRequest(
        route,
        body
    )
    return response
}