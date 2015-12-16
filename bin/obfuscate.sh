#!/bin/bash
if [ -e handlers/entrypoint.js ]; then
   rm handlers/entrypoint.js;
fi
if [ -e models/entrypoint.js ]; then
   rm models/entrypoint.js;
fi
for h in handlers/*.js; do echo "var $(basename -s .js $h | tr - _) = require(\"./$(basename $h)\");" >> handlers/entrypoint.js;done
for h in models/*.js; do echo "var $(basename -s .js $h | tr - _) = require(\"./$(basename $h)\");" >> models/entrypoint.js;done

$(npm bin)/obfuscator --strings --no-color --out config-service.js --entry index.js *.js && \
$(npm bin)/obfuscator --strings --no-color --out handlers/handlers.js --entry handlers/entrypoint.js handlers/*.js && \
$(npm bin)/obfuscator --strings --no-color --out models/models.js --entry models/entrypoint.js models/*.js
