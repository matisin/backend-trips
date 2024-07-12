#!/bin/sh

if [[ ${BUILD} = "dev" ]]; then
    pnpm start:dev
else
    pnpm start:prod  
fi

