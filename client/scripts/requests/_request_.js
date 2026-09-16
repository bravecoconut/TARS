async function postRequest(route, body) {
    try {

        const response = await fetch(route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });

        const result = await response.json();

        if (!response.ok) {
            return RH(
                false,
                "can't post request, network issue!",
                null)
        }

        if (!result.status) {
            return RH(
                false,
                "something went wrong! look at console errors",
                result)
        }

        return RH(
            true,
            "request processed!",
            result)

    } catch (error) {
        return RH(
            false,
            "something went wrong while processing request",
            JSON.stringify(error));
    }
}


async function getRequest(route, params) {
    try {

        const url = params
            ? `${route}?${new URLSearchParams(params).toString()}`
            : route;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
            return RH(
                false,
                "can't get request, network issue!",
                null)
        }

        if (!result.status) {
            return RH(
                false,
                "something went wrong! look at console errors",
                result)
        }

        return RH(
            true,
            "request processed!",
            result)

    } catch (error) {
        return RH(
            false,
            "something went wrong while processing request",
            JSON.stringify(error));
    }
}