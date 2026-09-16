async function dump_new_ascii_file(
    session_id,
    file_name,
    file_size,
    file_text,
    cha_per_chunk,
    overlap
) {
    const route = dump_new_route
    const body = {
        session_id: session_id,
        file_name: file_name,
        file_size: file_size,
        file_text: file_text,
        cha_per_chunk: cha_per_chunk,
        overlap: overlap
    }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function clear_session_vectors(session_id) {
    const route = clear_session_vectors_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}


async function get_session_vector_counts(session_id) {
    const route = get_session_vector_counts_route
    const body = { session_id: session_id }
    const response = await postRequest(
        route,
        body
    )
    return response
}
