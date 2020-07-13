const fs = require("fs")
const assert = require("assert")
const IncomingWebhook = require("@slack/webhook").IncomingWebhook

assert.ok(process.env.SLACK_WEBHOOK_URL != null, process.env)
assert.ok(process.env.GITHUB_ACTION_URL != null, process.env)
assert.ok(process.env.GITHUB_ACTOR != null, process.env)
assert.ok(process.env.GITHUB_REF != null, process.env)
assert.ok(process.env.BUILD_SERIES != null, process.env)

const args = process.argv.slice(2)
assert.equal(args.length, 4)
const slackJsonPath = args[0]
const secondsToExecute = parseInt(args[1])
const buildStatus = args[2]
const deployOk = args[3] === "deployed"
const shortBranchName = process.env.GITHUB_REF.substring(process.env.GITHUB_REF.lastIndexOf("/") + 1)

const githubActorToSlackUserId = JSON.parse(fs.readFileSync(slackJsonPath))

const buildSeriesEmoji = process.env.BUILD_SERIES == "master" ? ":tophat:" : ":rainbow:"

let buildStatusEmoji = null
if (buildStatus === "ok") {
    buildStatusEmoji = ":white_check_mark:"
} else if (buildStatus === "fail") {
    buildStatusEmoji = ":x:"
} else {
    buildStatusEmoji = ":barber:"
}
assert.ok(buildSeriesEmoji != null)

let message = "" + secondsToExecute + "s "
message += buildSeriesEmoji
message += " "
message += buildStatusEmoji

if (deployOk) {
    assert.ok(process.env.DEV_URL != null)
    message += ` <${process.env.DEV_URL}|[devsite]>`
}

message += ` <${process.env.GITHUB_ACTION_URL}|[build]>`
message += ` branch: ${shortBranchName}`
message += ` <@${githubActorToSlackUserId[process.env.GITHUB_ACTOR]}> `

new IncomingWebhook(process.env.SLACK_WEBHOOK_URL).send(message)
