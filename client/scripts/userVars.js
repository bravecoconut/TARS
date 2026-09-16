const sessionsBatch = 10

let sessionStart = 1

let sessionEnd = -1

let allSessions = {}

let currentSession = null

const isStreaming = {}

let currentStopHandler = {}

const terminateFlag = { "agentTerminated": true }

let userIsAtBottom = true

const streamingAgent = {}