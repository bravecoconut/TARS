const bodyEl = document.body

const touchBlockerEl = document.createElement("div")

const errorModalEl = document.createElement("details")
const errorModalSummary = document.createElement("summary")
const errorModalDetails = document.createElement("p")

const saverEl = document.createElement("div")
const saverCommentEl = document.createElement("div")
const saverInputEl = document.createElement("input")
const saverTextareaEl = document.createElement("textarea")
const saverSaveCon = document.createElement("div")
const saverCancelEl = document.createElement("div")
const saverSaveEl = document.createElement("div")

const mainContainerEl = document.createElement("div")
const leftContainerEl = document.createElement("div")
const middleContainerEl = document.createElement("div")
const settingsContainerEl = document.createElement("div")
const rightContainerEl = document.createElement("div")

const middleConNav = document.createElement("div")

const messagesConEl = document.createElement("div")
const messagesConMessagesCon = document.createElement("div")

const messagesConIndicator = document.createElement("div")

const messagesConUserEl = document.createElement("div")
const messagesConUserImagesCon = document.createElement("div")
const messagesConUserImagesEl = document.createElement("img")

const messagesConUserAddedEl = document.createElement("div")

const messagesConThinkingEl = document.createElement("div")
const messagesConThinkingSummary = document.createElement("div")
const messagesConThinking = document.createElement("pre")

const messagesConToolEl = document.createElement("div")
const messagesConToolToolComment = document.createElement("pre")
const messagesConToolProcessId = document.createElement("div")
const messagesConToolName = document.createElement("div")
const messagesConToolTimeout = document.createElement("div")
const messagesConToolTerminate = document.createElement("img")
const messagesConToolMoreDetails = document.createElement("div")
const messagesConToolArgsText = document.createElement("div")
const messagesConToolArgsObject = document.createElement("pre")
const messagesConToolStdoutText = document.createElement("div")
const messagesConToolStdout = document.createElement("pre")
const messagesConToolStderrText = document.createElement("div")
const messagesConToolStderr = document.createElement("pre")
const messagesConToolResultText = document.createElement("div")
const messagesConToolResult = document.createElement("pre")
const messagesConToolStatus = document.createElement("div")
const messagesConToolCreated = document.createElement("div")
const messagesConToolLastUpdate = document.createElement("div")
const messagesConToolTimeoutDecisions = document.createElement("div")
const messagesConToolTimeoutDecision = document.createElement("div")

const messagesConNotificationEl = document.createElement("div")

const messagesConContentEl = document.createElement("div")

const constinueCon = document.createElement("div")
const constinueEl = document.createElement("div")


const messageConEl = document.createElement("div")

const messageConMainCon = document.createElement("div")
const messageConMainOption = document.createElement("div")
const messageConMainAddImage = document.createElement("div")
const messageConMainAddImageSVG = document.createElement("img")
const messageConMainImageInput = document.createElement("input")
const messageConMainImagesCon = document.createElement("div")
const messageConMainImagesEl = document.createElement("div")
const messageConMainImagesImg = document.createElement("img")
const messageConMainImagesRemoveEl = document.createElement("img")
const messageConMainTextarea = document.createElement("textarea")
const messageConMainSendMessage = document.createElement("div")
const messageConMainSendMessageSVG = document.createElement("img")
const messageConMainStopAgent = document.createElement("div")
const messageConMainStopAgentSVG = document.createElement("img")

const midConNavLeftDivider = document.createElement("div")
const midConNavRightDivider = document.createElement("div")

const leftContainerTop = document.createElement("div")
const rightContainerTop = document.createElement("div")
const settingsContainerTop = document.createElement("div")

const logo = document.createElement("div")
const settings = document.createElement("div")
const options = document.createElement("div")

const leftConToggle = document.createElement("div")
const leftConToggleSVG = document.createElement("img")


const rightConToggCon = document.createElement("div")
const settingsConToggCon = document.createElement("div")

const rightConToggle = document.createElement("img")
const settingsConToggle = document.createElement("img")

const newTaskCon = document.createElement("div")
const newTaskBtn = document.createElement("div")

const pinedSessionsCon = document.createElement("details")
const pinedSessionsSummary = document.createElement("summary")
const pinedSessionsDetail = document.createElement("div")

const sessionsCon = document.createElement("div")
const settingsChildCon = document.createElement("div")
const rightChildCon = document.createElement("div")

const rightSRCon = document.createElement("div")
const rightSRConUserCon = document.createElement("div")

const rightDDCon = document.createElement("div")
const rightDDUploadCon = document.createElement("div")
const rightDDUploadConUploadEl = document.createElement("div")
const rightDDUploadConUploadNewEl = document.createElement("div")
const rightDDUploadConClearAll = document.createElement("div")
const rightDDUploadConClearAllSure = document.createElement("div")
const rightDDUploadConDetails = document.createElement("div")
const rightDDUploadConDetailsSelectFile = document.createElement("div")
const rightDDUploadConDetailsOp = document.createElement("div")

const rightDDUploadConDetailsChaPerChunk = document.createElement("input")
const rightDDUploadConDetailsOvrlapPerChunk = document.createElement("input")
const rightDDConUploadedConEl = document.createElement("div")
const rightDDConUploadedCon = document.createElement("div")
const rightDDConUploadedNameCon = document.createElement("div")
const rightDDConUploadedMetaCon = document.createElement("div")
const rightDDConUploadedMetaConSize = document.createElement("div")
const rightDDConUploadedMetaConVectors = document.createElement("div")
const rightDDConUploadedMetaConUploaded = document.createElement("div")


const rightConNav = document.createElement("div")

const rightConNavDividerOne = document.createElement("div")
const rightConNavDividerTwo = document.createElement("div")

const generalSection = document.createElement("div")
const generalHero = document.createElement("div")

const generalNameSec = document.createElement("div")
const generalName = document.createElement("div")
const generalNameMain = document.createElement("div")

const generalInstructionsSec = document.createElement("div")
const generalInstructions = document.createElement("div")
const generalInstructionsMain = document.createElement("div")

const generalMemorySec = document.createElement("div")
const generalMemory = document.createElement("div")
const generalMemoryMain = document.createElement("div")

const generalToneSec = document.createElement("div")
const generalTone = document.createElement("div")
const generalToneMain = document.createElement("select")

const srcfSection = document.createElement("div")
const srcfHero = document.createElement("div")
const srcfDes = document.createElement("div")

const srcfOnLengthSec = document.createElement("div")
const srcfOnLength = document.createElement("div")
const srcfOnLengthMain = document.createElement("select")

const srcfPercentSec = document.createElement("div")
const srcfPercent = document.createElement("div")
const srcfPercentMain = document.createElement("select")

const srcfLastNSec = document.createElement("div")
const srcfLastN = document.createElement("div")
const srcfLastNMain = document.createElement("select")

const srcfThresholdSec = document.createElement("div")
const srcfThreshold = document.createElement("div")
const srcfThresholdDes = document.createElement("div")
const srcfThresholdMain = document.createElement("select")


const clientSection = document.createElement("div")
const clientHero = document.createElement("div")

const clientBaseUrlSec = document.createElement("div")
const clientBaseUrl = document.createElement("div")
const clientBaseUrlMain = document.createElement("div")

const clientAPIKeySec = document.createElement("div")
const clientAPIKey = document.createElement("div")
const clientAPIKeyMain = document.createElement("div")

const clientLLMSec = document.createElement("div")
const clientLLM = document.createElement("div")
const clientLLMMain = document.createElement("div")

const clientEmbedModelSec = document.createElement("div")
const clientEmbedModel = document.createElement("div")
const clientEmbedModelMain = document.createElement("div")

const clientMCTSec = document.createElement("div")
const clientMCT = document.createElement("div")
const clientMCTMain = document.createElement("div")

const clientMRSec = document.createElement("div")
const clientMR = document.createElement("div")
const clientMRMain = document.createElement("div")

const clientTimeoutSec = document.createElement("div")
const clientTimeout = document.createElement("div")
const clientTimeoutMain = document.createElement("div")

const sessionsSessionSec = document.createElement("div")
const sessionsSessionStreaming = document.createElement("div")
const sessionSaverInputElCon = document.createElement("input")
const sessionSaverInputEl = document.createElement("input")
const sessionsSessionName = document.createElement("div")
const sessionsSessionEdit = document.createElement("div")
const sessionsSessionEditSVG = document.createElement("img")
const sessionsSessionPin = document.createElement("div")
const sessionsSessionPinSVG = document.createElement("img")
const sessionsSessionDelete = document.createElement("div")
const sessionsSessionDeleteSVG = document.createElement("img")
const sessionsSessionSure = document.createElement("div")
const sessionsSessionSureSVG = document.createElement("img")
const sessionCancelEl = document.createElement("div")
const sessionCancelElSVG = document.createElement("img")
const sessionSaveEl = document.createElement("div")
const sessionSaveElSVG = document.createElement("img")


const messagesConMessagesConHero = document.createElement("div")
const messagesConMessagesConHeroTARS = document.createElement("div")
const messagesConMessagesConHeroDes = document.createElement("div")



elementsCreated = true