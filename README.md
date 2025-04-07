# HTML-Writer
create documents using HTML, CSS and JavaScript

This project uses Ace Editor, which is licensed under the MIT License. 
You can find the source code and license at: https://github.com/ajaxorg/ace

Currently working state can be found [here](index.html)

User guide can be found [here](docs/userguide.md)

Project documentation can be found [here](docs/documentation.md)

## Stuff I want to implement
- code view and preview view using codemirror or similar
  - which code editor to use as a base? do i want a super large document or a structure of multiple code parts?
    - https://github.com/microsoft/monaco-editor
    - https://codemirror.net/try/#example=Minimal%20editor
    - https://kazzkiq.github.io/CodeFlask/
- make sure to keep scrollheight of both sides in sync
- html templates that can be saved, loaded and inserted on either side of the editor
- default styles? or maybe do that via templates
- contenteditable on the preview side (make it deactivatable for the understandable hate on contenteditable)
- sortable.js to rearrange elements (turn off contenteditable and vice versa)
- pasting images: switch to control whether to paste with url or base64 encode (ctrl+shift+v for alternative?)
- header, footer etc
- pagination (automatic? plus manual, which is easy because thats the default)
  - page overflow? maybe have two types of page implementations: automatic (utilizing the print view) and manual (inserting page containers)
- page formats
- perhaps implement other js library for absolute positioning via drag and drop
- make an installable pwa that can work entirely offline. also work by using local html file? would make autosave and load impossible though (only via indexeddb, not via files)
  - use github pages to host webapp?
- extensive, configurable toolbar for managing templates, files etc.
- quick add toolbar for tables etc., perhaps implement table support via tr/tc add buttons? or define a table before inserting it (actually, templates could probably use a "define variables" dialog before insertion)
- https://foolishdeveloper.com/custom-right-click-context-menu-using-javascript/
  - add context menu to both sides to insert blocks from templates etc., also allow typing after customizable trigger key(s) (/, ~, // etc)
- https://davidwalsh.name/html5-context-menu