/**
 * Peak Education Website
 *
 * @copyright (C) 2020 Luke Zhang
 *
 * @author Luke Zhang
 * https://luke-zhang-04.github.io/
 *
 * @license Modified-BSD-3-Clause
 * @see {@link https://github.com/Luke-zhang-04/peak-edu/blob/master/LICENSE}
 */
import * as ScrollMagic from "scrollmagic"
import * as utils from "../_utils"
import InfoDisplay, {bindInfoStickEvent} from "./info"
import {bindAbout, bindContact} from "./scrollStatus"
import MobileInfo from "./mobileInfo"

let scrollmagicScene: ScrollMagic.Scene | void

const infoDisplay = new InfoDisplay(
        document.getElementById("info-display") as HTMLElement,
        {parent: document.getElementById("info-display") as HTMLElement}
    ),
    infoDisplayMd = new InfoDisplay(
        document.getElementById("info-display-md") as HTMLElement,
        {parent: document.getElementById("info-display-md") as HTMLElement}
    ),
    infoDisplaySm = new MobileInfo(
        document.getElementById("info-sm-content") as HTMLElement,
        {parent: document.getElementById("info-sm-content") as HTMLElement},
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
    bindMobileNav = (): void => {
        const navItems = document.querySelector(".navbar-nav.d-sm-block"),
            navToggler = document.querySelector(".navbar-toggler"),
            navCloser = document.getElementById("navbar-close")

        if (navItems && navToggler && navCloser) {
            for (const navUtil of [navToggler, navCloser]) {
                navUtil.addEventListener("click", () => {
                    if (navItems.classList.contains("show")) {
                        navItems.classList.remove("show", "start")
                    } else {
                        navItems.classList.add("show")
                        navItems.classList.remove("start")
                    }
                })
            }

            for (
                const navItem of
                Array.from(navItems.getElementsByClassName("nav-link"))
            ) {
                navItem.addEventListener("click", () => {
                    if (navItems.classList.contains("show")) {
                        navItems.classList.remove("show", "start")
                    } else {
                        navItems.classList.add("show")
                        navItems.classList.remove("start")
                    }
                })
            }
        }
    },
    unMount = (...infoDisplays: (InfoDisplay | MobileInfo)[]): void => {
        for (const _infoDisplay of infoDisplays) {
            _infoDisplay.unmount()
        }
    },
    homeFunc = (): void => {
        if (window.innerWidth > utils.globals.sizes.md) {
            unMount(infoDisplayMd, infoDisplaySm, infoDisplay)
            infoDisplay.mount()

            scrollmagicScene = bindScrollMagic(infoDisplay)
        } else if (window.innerWidth > utils.globals.sizes.sm) {
            unMount(infoDisplayMd, infoDisplaySm, infoDisplay)
            infoDisplayMd.mount()

            scrollmagicScene = bindScrollMagic(infoDisplayMd, "-md")
        } else {
            bindMobileNav()
            unMount(infoDisplayMd, infoDisplaySm, infoDisplay)
            infoDisplaySm.mount()

            const buttons = document
                .querySelectorAll("#info-sm .btn-circle.btn-circle-primary")

            buttons[0].addEventListener("click", () => {
                infoDisplaySm.incrementKey(-1)
            })

            buttons[1].addEventListener("click", () => {
                infoDisplaySm.incrementKey(1)
            })
        }
    },

    onScroll = (): void => {
        if (window.innerWidth > utils.globals.sizes.md) {
            bindAbout()
            bindContact()
        } else if (window.innerWidth > utils.globals.sizes.sm) {
            bindAbout("-md")
            bindContact(".d-md-block")
        } else {
            const aboutSm = document.getElementById("about-sm"),
                windowScroll = window.scrollY + (window.innerHeight * 0.85)

            if (aboutSm) {
                for (const child of Array.from(aboutSm.children)) {
                    if (windowScroll >= (child as HTMLElement).offsetTop) {
                        child.classList.add("scrolled-at")
                    } else {
                        child.classList.remove("scrolled-at")
                    }
                }
            }
        }
    }

window.onresize = homeFunc
window.onscroll = onScroll

homeFunc()
onScroll()
