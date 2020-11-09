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
