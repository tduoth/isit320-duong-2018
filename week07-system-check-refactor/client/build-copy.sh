#! /usr/bin/env bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

SERVER_DIR="${PWD}/../server/public"

function deleteOld() {
	echo -e "$LIGHT_GREEN \e[4mRemoving old Files & Folders\e[0m"
	# Removing files
	rm -v ${SERVER_DIR}/asset-manifest.json
	rm -v ${SERVER_DIR}/favicon.ico
	rm -v ${SERVER_DIR}/index.html
	rm -v ${SERVER_DIR}/manifest.json
	rm -v ${SERVER_DIR}/precache-manifest*.js
	rm -v ${SERVER_DIR}/service-worker.js
	# Removing folders
	rm -v -r ${SERVER_DIR}/static
}

function copyNew() {
	npm run build
	echo -e "$LIGHT_GREEN \e[4mCopying /build folder\e[0m"
	cp -r build/* ${SERVER_DIR}/.
}

function runAll() {
	echo -e "$LIGHT_GREEN \e[4mRemoving old Files & Folders\e[0m"
	deletetOld
	echo -e "$LIGHT_GREEN \e[4mCopying new Files & Folders\e[0m"
	copyNew
}

function stopService() {
	#echo -e "$LIGHT_GREEN ====================="
	echo -e "$LIGHT_GREEN \e[4mStopping service\e[0m"
	../server/stop-service
}

function startService() { 
	#echo -e "$LIGHT_GREEN ====================="
	echo -e "$LIGHT_GREEN \e[4mStarting service\e[0m"
	../server/start-service
}

function rebuild() {
	stopService
	echo -e "$LIGHT_GREEN \e[4mRemoving old Files & Folders\e[0m"
	deletetOld
	echo -e "$LIGHT_GREEN \e[4mCopying new Files & Folders\e[0m"
	copyNew
	startService
}

while true; do

    echo -e "$LIGHT_GREEN \e[4mMenu\e[0m"
    echo -e "$LIGHT_GREEN  a) Delete Old Files and Run Build (Initial Setup)"
    echo -e "$LIGHT_GREEN  b) Only Build"
    echo -e "$LIGHT_GREEN  c) Only Delete"
    echo -e "$LIGHT_GREEN  k) Stop Service"
    echo -e "$LIGHT_GREEN  l) Start Service"
    echo -e "$LIGHT_GREEN  r) Rebuild"
    echo -e "$LIGHT_RED  x) Exit (You should source .bashrc when done)"
    echo -e "\n$NC"
    read -p "Please make a selection: " eotuyx
    case $eotuyx in
        [Aa]* ) runAll false; continue;;
        [Bb]* ) copyNew; continue;;
        [Cc]* ) deleteOld; continue;;
        [Kk]* ) stopService; continue;;
        [Ll]* ) startService; continue;;
        [Rr]* ) rebuild; continue;;
        [XxQq]* ) break;;
        * )  -e "\n$NC" + "Please answer with a, b, c or x (or q).";;
    esac
done