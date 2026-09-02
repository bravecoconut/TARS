function RH(status, comment, data) {
    if (!status){
        console.log(`${comment}:${data}`)
    }

    return {
        "status": status,
        "comment": comment,
        "data": data,
    }
}