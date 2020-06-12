import {Action, createStore, Store} from "redux"
import {install, StoreCreator} from "redux-loop"
import * as RootModule from "./root"
import {html} from "lit-html"
import * as ConversationSummaryModule from "./conversation-summary"
import * as SelectedConversationModule from "./selected-conversation"
import {selectedConversationAction} from "./selected-conversation"
import * as NewMessageEntryModule from "./new-message-entry"
import {CssScope, makeSubscriptionCreator, ShadowRootContext} from "../framework/subscribe-and-render"
import {loadMetaTagContentAsString} from "../lib/util"
import {pageAction} from "./page"
import {reduxLoopBasedImprovedLoop} from "../framework/redux-loop-improved-loop"
import {AddMessage, ChangeConversationSummary} from "./store/subtree"

// get summaries (just append them) (just need a summaries feed)
// summary for convo w/ id/name = sometext
// get messages for convo, starting at token/index

// in essence these are "feed consumers"


const enhancedCreateStore = createStore as StoreCreator
const loggedInUserName = loadMetaTagContentAsString("logged-in-user-name")

// "back end" start

const nowMs = new Date().getTime()
const messages: AddMessage[] = [
    {
        text: `Are you getting on the call?`,
        epochTimeMs: nowMs - 62000000,
        from: "Wendy",
        conversationToken: "ctoken-666"
    },
    {
        text: `Ok can you hear me now?`,
        epochTimeMs: nowMs - 61000000,
        from: "Xavier",
        conversationToken: "ctoken-666"
    },
    {
        text: `Nope still can't.`,
        epochTimeMs: nowMs - 60000000,
        from: "Yolanda",
        conversationToken: "ctoken-666"
    },
    {
        text: `Hey mom can you do a hangout at 5:30?`,
        epochTimeMs: nowMs - 71000000,
        from: "Alice",
        conversationToken: "ctoken-777"
    },
    {
        text: `I sent you the doc via email`,
        epochTimeMs: nowMs - 70000000,
        from: "Bob",
        conversationToken: "ctoken-777"
    },
    {
        text: `Hey how about that one politician isn't it outrageous?`,
        epochTimeMs: nowMs - 82000000,
        from: "Michael",
        conversationToken: "ctoken-888"
    },
    {
        text: `Yes but let's just go build stuff in Minecraft`,
        epochTimeMs: nowMs - 81000000,
        from: "Nina",
        conversationToken: "ctoken-888"
    },
    {
        text: `Hell yes, let's do it.`,
        epochTimeMs: nowMs - 80000000,
        from: "Michael",
        conversationToken: "ctoken-888"
    },
]

const conversations: ChangeConversationSummary[] = [
    {
        conversationToken: "ctoken-666",
        lastUpdatedMs: nowMs - 60000000,
        name: "Work chat"
    },
    {
        conversationToken: "ctoken-777",
        lastUpdatedMs: nowMs - 70000000,
        name: "Family chat"
    },
    {
        conversationToken: "ctoken-888",
        lastUpdatedMs: nowMs - 80000000,
        name: "Friend chat"
    }
]

function michaelMessage() {
    messages.push({
        from: "Michael",
        epochTimeMs: new Date().getTime(),
        text: "You logged in yet?",
        conversationToken: "ctoken-888"
    })
    setTimeout(michaelMessage, 7000)
}

setTimeout(michaelMessage, 7000)

function ninaMessage() {
    messages.push({
        from: "Nina",
        epochTimeMs: new Date().getTime(),
        text: "Yeah I'm in, where are you?",
        conversationToken: "ctoken-888"
    })
    setTimeout(ninaMessage, 11000)
}

setTimeout(ninaMessage, 11000)


// "back end" end

const store: Store<RootModule.RootState, Action> =
    enhancedCreateStore(
        RootModule.createReducer({
            improvedLoop: reduxLoopBasedImprovedLoop,
            postMessageRpc: (conversationToken, messageText) => {
                console.log("postMessageRpc")
                return new Promise<void>((resolve) => {
                    setTimeout(() => {
                        messages.push({
                            conversationToken: conversationToken,
                            from: loggedInUserName,
                            epochTimeMs: new Date().getTime(),
                            text: messageText
                        })
                        resolve()
                    }, 500)
                })
            },

            fetchNextMessagesRpc: (startIndex: number) => {
                console.log("fetchNextMessagesRpc", startIndex)
                return new Promise<AddMessage[]>((resolve) => {
                    setTimeout(() => {

                        let messagesToSend = messages.slice(startIndex)
                        if (messagesToSend.length > 3) {
                            messagesToSend.slice(0, 3)
                        }


                        resolve(JSON.parse(JSON.stringify(messagesToSend)))
                    }, 1000)
                })
            },

            fetchNextConversationSummariesRpc: (startIndex: number) => {
                console.log("fetchNextConversationSummariesRpc", startIndex)
                return new Promise<ChangeConversationSummary[]>((resolve) => {
                    setTimeout(() => {
                        resolve(conversations.slice(startIndex))
                    }, 2000)
                })
            }

        }),
        RootModule.initState(),
        install())

document.addEventListener("DOMContentLoaded", function () {
    const shadowRootContext = new ShadowRootContext(document.body.attachShadow({mode: "open"}), CssScope.ROOT)

    shadowRootContext.render(
        html`
    <style>
        .main {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            grid-template-rows: 1fr 5em;
            grid-template-areas:
            "left-column right-main"
            "left-column right-smaller";
            
            
            background-color: red;
            height: 100%;
            width: 100%;
            
            color: purple; /* all text should be purple, even in shadow dom's */
        }
        
        .conversation-list {
            grid-area: left-column;
            background-color: green;
        }

        .selected-conversation {
            grid-area: right-main;
            background-color: yellow;
        }

        .new-message-entry {
            grid-area: right-smaller;
            background-color: blue;
        }
    </style>
    
    <div class="main">
        <div class="conversation-list"></div>
        <div class="selected-conversation"></div>
        <div class="new-message-entry"></div>
    </div>`)


    // on any eval, check previous record count vs array length
    // then, take the new records,
    // and run them through a processor function...
    //   store accepts old domain records and applies new ones to make some new domain thing...
    //   ...this is assigned to the subtree, in the root reducer (?)...at the root level at least (in subscribe?)
    //   ... stateTransition.applyNewConversationSummaryRecords(previous, state.store.records.sublist())
    //   ...then hand this down as the subtree...
    //   ...string/opaque cache key...
    //
    // so, store and other modules "know" about the domain, but nothing else.


    // root reducer's final act is state xform...

    ConversationSummaryModule.subscribe(
        makeSubscriptionCreator<RootModule.RootState, ConversationSummaryModule.Subtree>(
            store,
            (state) => state.conversationSummarySubtree),
        shadowRootContext)

    SelectedConversationModule.subscribe(
        makeSubscriptionCreator<RootModule.RootState, SelectedConversationModule.Subtree>(
            store,
            (state) => state.selectedConversationSubtree),
        shadowRootContext)

    NewMessageEntryModule.subscribe(
        makeSubscriptionCreator<RootModule.RootState, NewMessageEntryModule.Subtree>(
            store,
            (state) => state.newMessageEntrySubtree),
        shadowRootContext)

    store.dispatch<pageAction.Init>({
        type: pageAction.Keys.INIT
    })

    store.dispatch<selectedConversationAction.Select>({
        type: selectedConversationAction.Keys.SELECT,
        conversationToken: loadMetaTagContentAsString("starting-conversation-token")
    })
})
