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
    bindContact = (): void => {
        const contact =
            document.querySelector(
                ".d-lg-block .contact"
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
