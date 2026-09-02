// GET
const get_instructions_route = "/api/user/others/get_instructions" 
const get_memory_route = "/api/user/others/get_memory"
const get_tones_route = "/api/user/others/get_tones"


const get_all_agents_route = "/api/agents/get_all_agents"
const stream_agent_events_route = "/api/agents/stream_agent_events"


// POST
const create_session_route = "/api/sessions/create_new_session"
const delete_session_route = "/api/sessions/delete_session"
const change_session_name_route = "/api/sessions/change_session_name"
const toggle_session_pin_route = "/api/sessions/toggle_session_pin"
const get_all_sessions_route = "/api/sessions/get_all_sessions"
const create_new_message_route = "/api/sessions/create_new_message"
const update_last_user_message_route = "/api/sessions/update_last_user_message"
const get_session_route = "/api/sessions/get_session"


const update_base_url_route = "/api/user/client/update_base_url"
const update_api_key_route = "/api/user/client/update_api_key"
const update_model_route = "/api/user/client/update_model"
const update_em_model_route = "/api/user/client/update_em_model" // not tested yet
const update_mct_route = "/api/user/client/update_mct"
const update_max_retries_route = "/api/user/client/update_max_retries"
const update_timeout_route = "/api/user/client/update_timeout"


const update_srcf_on_length_route = "/api/user/srcf/update_srcf_on_length"
const update_srcf_percent_route = "/api/user/srcf/update_srcf_percent"
const update_srcf_last_n_route = "/api/user/srcf/update_srcf_last_n"
const update_srcf_threshold_route = "/api/user/srcf/update_srcf_threshold"


const set_name_route = "/api/user/others/set_name"
const update_instructions_route = "/api/user/others/update_instructions"
const update_memory_route = "/api/user/others/update_memory"
const set_curr_tone_route = "/api/user/others/set_curr_tone"


const dump_new_route = "/api/agent/ascii/dump_new"
const clear_session_vectors_route = "/api/agent/ascii/clear_session_vectors"
const get_session_vector_counts_route = "/api/agent/ascii/get_session_vector_counts"


const get_an_agent_route = "/api/agents/get_an_agent"
const get_event_history_route = "/api/agents/get_event_history"
const clear_agent_route = "/api/agents/clear_agent"
const add_message_in_agent_route = "/api/agents/add_message_in_agent"
const create_agent_route = "/api/agents/create_agent"
const terminate_agent_route = "/api/agents/terminate_agent"
const terminate_process_route = "/api/agents/terminate_process"
const fire_agent_route = "/api/agents/fire_agent"
