(function setLeftContainer() {
    leftContainerEl.style.width = deviceIs ? "0vw" : "18vw"

})();

(function setMiddleContainer() {
    middleConNav.style.height = deviceIs ? "11vw" : "3vw"

})();

(function setOpenSessionRecap() {
    openSessionRecap()

})();

(function setLeftContainerHover() {
    if (!deviceIs) {
        addHover(
            sessionsCon,
            () => { leftContainerEl.style.width = deviceIs ? "0vw" : "30vw" },
            () => { leftContainerEl.style.width = deviceIs ? "0vw" : "18vw" }
        )
    }
})();

