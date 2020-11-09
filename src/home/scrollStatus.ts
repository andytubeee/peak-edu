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

export const bindAbout = (suffix = ""): void => {
        const about = document.getElementById(`about${suffix}`),
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
    },
    bindContact = (container = ".d-lg-block"): void => {
        const contact =
            document.querySelector(
                `${container} .contact`
            ) as HTMLElement | null,
            windowScroll = window.scrollY + (window.innerHeight * 0.5)

        if (contact) {
            /* eslint-disable no-unused-expressions */
            if (windowScroll >= contact.offsetTop) {
                contact.querySelector(".header-container h1")
                    ?.classList.add("scrolled-at")
            } else {
                contact.querySelector(".header-container h1")
                    ?.classList.remove("scrolled-at")
            }
            /* eslint-enable no-unused-expressions */
        }
    }
