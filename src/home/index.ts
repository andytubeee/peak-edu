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
import InfoDisplay, {bindInfoStickEvent} from "./info"


let scrollmagicScene: ScrollMagic.Scene

const infoDisplay = new InfoDisplay(
        document.getElementById("info-display") as HTMLElement,
        {parent: document.getElementById("info-display") as HTMLElement}
    ),

    homeFunc = (): void => {
        if (window.innerWidth > 992) {
            const home = document.getElementById("home")
            
            infoDisplay.unmount()
            infoDisplay.mount()

            if (home) {
                if (
                    home.querySelector(".info #fixed") &&
                    home.getElementsByClassName("info-img") &&
                    !scrollmagicScene
                ) {
                    scrollmagicScene = bindInfoStickEvent(
                        home.querySelector(".info #fixed") as
                            HTMLDivElement,
                        home.getElementsByClassName("info-img") as
                            HTMLCollectionOf<HTMLImageElement>,
                        infoDisplay,
                    )
                }
            }
        } else {
            infoDisplay.unmount()
        }
    },
    onScroll = (): void => {
        const about = document.getElementById("about"),
            h1 = about?.querySelector("h1"),
            span = about?.querySelector("span.sep-line"),
            para = about?.querySelector("p"),
            imgs = about?.getElementsByTagName("img")

        if (about && h1 && span && para && imgs) {
            if (window.scrollY + (window.innerHeight * 0.5) >= about.offsetTop) {
                h1.classList.add("scrolled-at")
                span.classList.add("scrolled-at")
                para.classList.add("scrolled-at")

                for (const img of imgs) {
                    img.classList.add("scrolled-at")
                }
            } else {
                h1.classList.remove("scrolled-at")
                span.classList.remove("scrolled-at")
                para.classList.remove("scrolled-at")

                for (const img of imgs) {
                    img.classList.remove("scrolled-at")
                }
            }
        }
    }

window.onresize = homeFunc
window.onscroll = onScroll

homeFunc()
onScroll()
