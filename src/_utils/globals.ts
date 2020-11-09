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
interface Sizes {
    sm: number,
    md: number,
}

interface Globals {
    sizes: Sizes,
}

export const sizes: Sizes = {
    sm: 767,
    md: 992,
},
    globals: Globals = {
        sizes,
    }

Object.freeze(globals)

export default globals
