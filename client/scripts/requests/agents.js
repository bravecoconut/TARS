async function get_all_agents() {
    const route = get_all_agents_route
    const params = null
    const response = await getRequest(
        route,
        params
    )
    return response
}


async function get_an_agent(session_id) {
    const route = get_an_agent_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function get_event_history(session_id) {
    const route = get_event_history_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function clear_agent(session_id) {
    const route = clear_agent_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function add_message_in_agent(session_id, message) {
    const route = add_message_in_agent_route
    const body = { session_id: session_id, message: message }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function create_agent(session_id, messages) {
    const route = create_agent_route
    const body = { session_id: session_id, messages: messages }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function terminate_agent(session_id) {
    const route = terminate_agent_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function terminate_process(session_id, pid, tool_call_id) {
    const route = terminate_process_route
    const body = {
        session_id: session_id, pid: pid, tool_call_id: tool_call_id
    }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function fire_agent(session_id) {
    const route = fire_agent_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}
