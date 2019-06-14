/**
 *  Matt Cowley - CV: An elegant and expandable CV design made with SASS, HTML and love.
 *  <https://github.com/MattIPv4/CV/>
 *  Copyright (C) 2019 Matt Cowley (MattIPv4) (me@mattcowley.co.uk)
 *
 *  This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published
 *   by the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *  This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License
 *   along with this program. If not, please see
 *   <https://github.com/MattIPv4/CV/blob/master/LICENSE.md> or <http://www.gnu.org/licenses/>.
 */
function toggleCollapse(collapse) {
    var status = parseInt(collapse.getAttribute("data-collapsed"));
    if (status == 1) {
        collapse.innerText = "(Collapse)";
        collapse.parentElement.parentElement.classList.remove("collapsed");
        collapse.setAttribute("data-collapsed", "0");
    } else {
        collapse.innerText = "(Expand)";
        collapse.parentElement.parentElement.classList.add("collapsed");
        collapse.setAttribute("data-collapsed", "1");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var collapses = document.querySelectorAll("a.collapse");
    for (var i = 0; i < collapses.length; ++i) {
        collapses[i].setAttribute("data-collapsed", "0");
        collapses[i].addEventListener("click", toggleCollapse.bind(null, collapses[i]));
    }
});
