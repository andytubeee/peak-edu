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
