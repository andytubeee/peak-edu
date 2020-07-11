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
import DeStagnate, {createElement} from "destagnate"
import {default as infoData} from "./infoData.json"

type InfoKeys = "modern" | "future" | "oneOnOne" | "motivate"

interface MobileInfoState {
    [index: string]: string | number,
    key: InfoKeys,
    index: 0 | 1 | 2 | 3,
}

interface MobileInfoProps {
    parent: HTMLElement,
}

export default class MobileInfo extends DeStagnate
    <MobileInfoProps, MobileInfoState> {

    public constructor (parent: HTMLElement, props: MobileInfoProps) {
        super(parent, props)

        this.state = {
            key: "modern",
            index: 0,
        }
    }

    public incrementKey = (val: number): void => {
        this._incrementIndex(val)
    }

    public render = (): HTMLElement[] => [
        createElement("h2", {}, infoData[this.state.key].title),
        createElement("span", {class: "line d-block"}),
        createElement("p", {}, infoData[this.state.key].text),
    ]

    private _incrementIndex = (val: number): void => {
        // eslint-disable-next-line
        this.props?.parent.classList.add("fade-out")

        setTimeout(() => {
            if (this.state.index + val >= Object.keys(infoData).length) {
                this.setState({
                    index: 0,
                    key: Object.keys(infoData)[0] as InfoKeys
                })
            } else if (this.state.index + val < 0) {
                this.setState({
                    index: 3,
                    key: Object.keys(infoData)[3] as InfoKeys
                })
            } else {
                this.setState({
                    index: this.state.index + val,
                    key: Object.keys(infoData)[this.state.index + val] as
                        InfoKeys
                })
            }
            // eslint-disable-next-line
            this.props?.parent.classList.remove("fade-out")
        }, 250)
    }

}
