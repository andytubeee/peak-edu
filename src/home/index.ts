/**
 * Peak Education Website
 * 
 * @copyright (C) 2020 Luke Zhang
 * 
 * @author Luke Zhang
 * https://luke-zhang-04.github.io/
 * 
 * @license GPL-3.0
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import * as ScrollMagic from "scrollmagic"
import * as utils from "../_utils"
import InfoDisplay, {bindInfoStickEvent} from "./info"
import {bindAbout, bindContact} from "./scrollStatus"

let scrollmagicScene: ScrollMagic.Scene | void

const infoDisplay = new InfoDisplay(
        document.getElementById("info-display") as HTMLElement,
        {parent: document.getElementById("info-display") as HTMLElement}
    ),
    infoDisplayMd = new InfoDisplay(
        document.getElementById("info-display-md") as HTMLElement,
        {parent: document.getElementById("info-display-md") as HTMLElement}
    ),
    home = document.getElementById("home"),

    bindScrollMagic = (
        selectedInfoDisplay: InfoDisplay,
        suffix = ""
    ): void | ScrollMagic.Scene => {
        const images = document.getElementById(`info${suffix}`)?.getElementsByClassName("info-img")

        if (
            home &&
            home.querySelector(`.info #fixed${suffix}`) &&
            images &&
            !scrollmagicScene
        ) {
            return bindInfoStickEvent(
                home.querySelector(`.info #fixed${suffix}`) as
                    HTMLDivElement,
                images as HTMLCollectionOf<HTMLImageElement>,
                selectedInfoDisplay,
            )
        }

        return undefined
    },

    homeFunc = (): void => {
        if (window.innerWidth > utils.globals.sizes.md) {
            infoDisplayMd.unmount()
            infoDisplay.unmount()
            infoDisplay.mount()

            scrollmagicScene = bindScrollMagic(infoDisplay)
        } else {
            infoDisplay.unmount()
            infoDisplayMd.unmount()
            infoDisplayMd.mount()

            scrollmagicScene = bindScrollMagic(infoDisplayMd, "-md")
        }
    },
    onScroll = (): void => {
        if (window.innerWidth > utils.globals.sizes.md) {
            bindAbout()
            bindContact()
        } else if (window.innerWidth > utils.globals.sizes.sm) {
            bindAbout("-md")
        }
    }

window.onresize = homeFunc
window.onscroll = onScroll

homeFunc()
onScroll()
