import {html, TemplateResult} from "lit-html";

export function render(): TemplateResult {
    return html`
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
            
            .left {
                grid-area: left-column;
                background-color: green;
            }
    
            .right {
                grid-area: right-main;
                background-color: yellow;
            }
        </style>
        
        <div class="main">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    `
}
