Put your installers in this folder (e.g. SkraperAi-Setup.exe).

Then open src/apps/catalog.ts and set the matching app's downloadUrl:

    downloadUrl: '/downloads/SkraperAi-Setup.exe',

Anything in this folder is served from the site root, so the path is
always '/downloads/<filename>'. Leaving downloadUrl as '' shows a
"Coming soon" badge instead of a download button.
