This is a really rudimentary simulation of a classic 3-page messaging app,
e.g. iMessage or Whatsapp.

- Emphasis on modularity, that enables "scaling"
  of application code.
  - Use shadow roots for html/css modularity (e.g. no leaky css)
  - Use combineReducers for redux subtree/module
    separation
  - Explicit exports from modules via `index.ts`,
    allows for an approximation of "package scope".
- Lean on the typechecker + non-browser unit testing 
  as much as possible for correctness (so, layer on top of redux-loop
  for better type safety, create easy testing opportunities
  via side-effect-free functions that redux "style" encourages,
  keep the view layer minimal and cleanly decoupled)
- Consistent module directory layout
- Use redux as a pub-sub system to share
  state across modules
- Redux actions are explicitly scoped so it's clear
  what actions may be used across modules
- Centralized/shared domain (state) model
- Contains an example of transforming append-only/normalized
  "back-end" data into view-component-friendly
  domain objects
- Example of dealing with js libs whose methods of interacting
  with the dom are not really what we'd ideally like to see 
  (CodeMirror) - but that we can work just fine with, anyway.

Good Reading
* https://www.oreilly.com/library/view/modern-javascript/9781491971420/ch05.html
* https://developers.google.com/web/fundamentals/web-components/shadowdom 
