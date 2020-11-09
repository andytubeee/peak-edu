#!/usr/bin/env bash
# Peak Education Website
#
# Copyright (C) 2020 Luke Zhang
#
# Author: Luke Zhang
# https://luke-zhang-04.github.io/
#
# License: Modified-BSD-3-Clause
# See https://github.com/Luke-zhang-04/peak-edu/blob/master/LICENSE

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )" # Get location of this script
. "${DIR}/colours.sh"

# Files to browserify
browserify=()
src="\.\/src\/"
index="\/index"
scss="\.\/scss\/"

#######################################
# Formats dir with sed; remove pattern $ts
# Globals:
#   none
# Arguments:
#   dir: string - directory of typescript file in ./ts/ folder
#   suffix: string - suffix of ddir
#   pattern: string - pattern to remove
#######################################
formatDir() {
    echo "$1$2" | sed "s/$3//g"
}

#######################################
# Compile SCSS
# Globals:
#   colours
#   scss: string - scss file extension pattern
#   formatDir: (string, string, stirng) => string - removes pattern from string adn adds suffix
# Arguments:
#   none
#######################################
compileSass() {
    # Compile SASS
    printf "${BIYellow}Compiling ${Red}./scss/ ${Purple}to ${BIBlue}./css/ ${Purple}with ${BIRed}SASS${Purple}\n"
    for file in ./scss/*.scss ; do
        formattedDir=$(formatDir $file "" $scss)

        if [[ ${formattedDir:0:1} != "_" ]]; then
            fileName=$(formatDir $formattedDir "" "\.scss")

            printf "\t${BIYellow}Compiling ${Red}./scss/$fileName.scss ${Purple}to ${BIBlue}./css/$fileName.css ${Purple}with ${BIRed}SASS${Purple}\n"

            sass ./scss/"$fileName".scss ./css/"$fileName".css --style compressed
        fi
    done
}

#######################################
# Main build function for development mode
# Globals:
#   colours
#   formatDir: (string, string, stirng) => string - removes pattern from string adn adds suffix
#   comileSass: () => void - compiles sass
# Arguments:
#   skipSass: boolean - if sass should compile
#######################################
buildDev() {
    # Get all folders in ./ts, add to their index files to browserify list
    for dir in ./src/*/ ; do
        formattedDir=$(formatDir "$dir" "index" "$src")

        if [[ ${formattedDir:0:1} != "_" ]]; then
            browserify+=( "$formattedDir" )
        fi
    done

    # Compile SASS
    if [ "$1" ]; then
        compileSass &
    fi

    # Compile w/ TypeScript
    printf "${BIYellow}Compiling${Purple} with ${BIBlue}./src/${Purple} to ${BIGreen}./lib/${Purple} with ${BIBlue}TypeScript\n"
    npx tsc -p . &

    wait

    # Pack lib files w/ browserify
    printf "${BIBlue}Packing ${BIGreen}./lib/${Purple} files with ${BBlue}browserify${Purple} and sending to ${Yellow}./js/${Purple}\n"
    for script in "${browserify[@]}"; do
        formattedDir=$(formatDir $script "" $index)

        printf "\t${BIBlue}Packing${Purple} script with root ${Cyan}$script${Purple}, to file ${Cyan}$formattedDir.js${Purple}\n"

        npx browserify lib/"${script}".js > ./js/"${formattedDir}."js
    done

    printf "${BGreen}Cleaning up...${Purple}\n"
}

#######################################
# Main build function
# Globals:
#   colours
#   formatDir: (string, string, stirng) => string - removes pattern from string adn adds suffix
#   comileSass: () => void - compiles sass
# Arguments:
#   none
#######################################
build() {
    # Get all folders in ./ts, add to their index files to browserify list
    for dir in ./src/*/ ; do
        formattedDir=$(formatDir "$dir" "index" "$src")

        if [[ ${formattedDir:0:1} != "_" ]]; then
            browserify+=( "$formattedDir" )
        fi
    done

    # Compile SASS
    compileSass &

    # Compile w/ TypeScript
    printf "${BIYellow}Compiling${Purple} with ${BIBlue}./src/${Purple} to ${BIGreen}./lib/${Purple} with ${BIBlue}TypeScript\n"
    npx tsc -p . &

    wait

    # Pack lib files w/ browserify
    printf "${BIBlue}Packing ${BIGreen}./lib/${Purple} files with ${BBlue}browserify${Purple} and sending to ${Yellow}./js/${Purple}\n"
    for script in "${browserify[@]}"; do
        formattedDir=$(formatDir $script "" $index)

        printf "\t${BIBlue}Packing${Purple} script with root ${Cyan}$script${Purple}, to file ${Cyan}$formattedDir.js${Purple}\n"

        npx browserify lib/"${script}".js > ./js/"${formattedDir}."js
    done

    # Compile w/ Babel
    printf "${BICyan}Running ${BIYellow}Babel${Purple} on ${Yellow}./js/${BIGreen}\n\t"
    npx babel js --out-dir js --minified --compact true --no-comments

    printf "${BGreen}Cleaning up...${Purple}\n"
}

#######################################
# Watches for file changes and executes build
# Globals:
#   none
# Arguments:
#   filePattern: string - dir to watch
#######################################
watch() {
    fileChange1=""

    while [[ true ]]; do
        fileChange2=$(find $1/ -type f -exec md5 {} \;)

        if [[ "$fileChange1" != "$fileChange2" ]] ; then
            if [[ "$1" == "scss" ]]; then
                compileSass
            else
                buildDev true
            fi

            clear
            printf "${BIGreen}Compiled successfully!\n\n"

            fileChange1="$fileChange2"
            printf "${BICyan}Waiting...${Purple}\n"
        fi

        sleep 15
    done
}

if [[ $1 == "--only" ]]; then
    if [[ $2 == "sass" ]]; then
        compileSass
    else
        printf "${BIRed}ERROR: ${Purple}Unknown option $2 for $1\n"
    fi
elif [[ $1 == "-w" ]]||[[ $1 == "--watch" ]];then
    watch scss &
    watch src &

    wait
elif [[ $1 == "-d" ]]||[[ $1 == "--dev" ]]; then
    buildDev
else
    build
fi
