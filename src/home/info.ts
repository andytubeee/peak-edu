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
import DeStagnate, {createElement} from "destagnate"
import {default as infoData} from "./infoData.json"

interface InfoData {
    [index: string]: InfoDisplayState,
    modern: InfoDisplayState,
    future: InfoDisplayState,
    oneOnOne: InfoDisplayState,
    motivate: InfoDisplayState,
}

interface InfoDisplayState {
    [index: string]: string | number,
    key: string,
    title: string,
    text: string,
    index: number,
}

interface InfoDisplayProps {
    [index: string]: HTMLElement,
    parent: HTMLElement,
}

type InfoKeys = ("modern" | "future" | "oneOnOne" | "motivate")[]

export default class InfoDisplay extends DeStagnate
    <InfoDisplayProps, InfoDisplayState> {

    public constructor (parent: HTMLElement, props: InfoDisplayProps) {
        super(parent, props)

        this.state = {
            ...(infoData as InfoData).modern,
            key: "modern",
            index: 0,
        }
    }

    /**
     * Sets state with slight delay (to fade out)
     * @param {Object.<string, string>} obj - object of new state
     * @returns {void} void
     */
    public changeComponent = (obj: InfoDisplayState): void => {
        (this.props as InfoDisplayProps).parent.classList.add("fade-out")

        setTimeout(() => {
            this.setState(obj);
            (this.props as InfoDisplayProps).parent.classList.remove("fade-out")
        }, 250)
    }

    public render = (): HTMLElement[] => [
        createElement("h2", {class: "my-3"}, this.state.title),
        createElement("span", {class: "line d-block"}),
        createElement("p", {class: "mb-4"}, this.state.text),
    ]

}

export const bindInfoStickEvent = (
    container: HTMLDivElement,
    images: HTMLCollectionOf<HTMLImageElement>,
    infoDisplay: InfoDisplay,
): ScrollMagic.Scene => {
    const scene = new ScrollMagic.Scene({
            triggerElement: images[0],
            triggerHook: 0.5,
            duration: images[images.length - 1].offsetTop +
                window.innerHeight * 0.5,
        }),
        increment = 1 / images.length,
        infoKeys: InfoKeys = ["modern", "future", "oneOnOne", "motivate"]
    
    if (scene) {
        scene.setPin(container)
            .addTo(utils.default)
    }

    let currentKey = "modern"

    scene.on("progress", (event) => {
        for (const [index, info] of infoKeys.entries()) {
            if (event.target.progress() <= increment * (index + 1)) {
                if (currentKey !== info) {
                    currentKey = info
                    infoDisplay.changeComponent({
                        ...(infoData as InfoData)[info],
                        key: info,
                        index,
                    })
                }
                break
            }
        }
    })

    return scene
}
