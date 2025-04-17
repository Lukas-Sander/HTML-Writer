# Changelog
Sections: Hotfixes, Bugfixes, Security, Features Added, Features Updated, Features Removed, Code Optimization, UI/UX

## [0.0.3] - 2025-04-17
### Hotfix
- loading from document cache on a nonexisting/empty database caused an error

## [0.0.2] - 2025-04-17
### Features Added
- save-button now uses the filename of the currently cached document as default
- mobile view: button to switch between views

## [0.0.1] - 2025-04-09 - Initial Release
### Features Added
- core functionality
- loading and saving html files
- caching of opened document in indexedDB
    - name and content are saved with timeout and upon visibility change
- printing preview portion functionality
