# HTML-Writer
create documents using HTML, CSS and JavaScript

## Stuff I want to implement
- code view and preview view using codemirror or similar
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
- extensive, configurable toolbar for managing templates, files etc.
- quick add toolbar for tables etc., perhaps implement table support via tr/tc add buttons? or define a table before inserting it (actually, templates could probably use a "define variables" dialog before insertion)