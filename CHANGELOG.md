# Changelog
Sections: Hotfixes, Bugfixes, Security, Features Added, Features Updated, Features Removed, Code Optimization, UI/UX

<details>
<summary> Stuff I want to implement </summary>
- https://foolishdeveloper.com/custom-right-click-context-menu-using-javascript/
    - add context menu to both sides to insert blocks from templates etc., also allow typing after customizable trigger key(s) (/, ~, // etc)
- https://davidwalsh.name/html5-context-menu
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
- quick add toolbar for tables etc., perhaps implement table support via tr/tc add buttons? or define a table before inserting it (actually, templates could probably use a "define variables" dialog before insertion)
- create executables for easy use? utilizing neutralino
</details>

## [0.0.1] - 2025-04-09 - Initial Release
### Features Added
- core functionality
-
- loading and saving html files
- caching of opened document in indexedDB
    - name and content are saved with timeout and upon visibility change
- printing preview portion functionality
