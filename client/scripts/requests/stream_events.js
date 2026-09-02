async function* stream_agent_events(session_id) {
    const route = `${stream_agent_events_route}?${new URLSearchParams({ session_id }).toString()}`;

    let response;
    try {
        response = await fetch(route, {
            method: "GET",
            credentials: "include",
        });
    } catch (error) {
        yield RH(false, "can't connect to event stream", String(error));
        return;
    }

    if (!response.ok || !response.body) {
        yield RH(false, "can't connect to event stream, network issue!", null);
        return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const parts = buffer.split("\n\n");
            buffer = parts.pop();

            for (const part of parts) {
                if (!part.startsWith("data: ")) continue;

                const jsonStr = part.slice("data: ".length);
                const payload = JSON.parse(jsonStr);

                yield payload;

                if (payload.data === "//@@done@@//") {
                    return; 
                }
            }
        }
    } catch (error) {
        yield RH(false, "something went wrong while streaming events", String(error));
    } finally {
        reader.releaseLock();
    }
}