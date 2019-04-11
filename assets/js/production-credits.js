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
function production_credits() {
    // Get base vars
    var table = document.getElementById("production-credits");
    var tbody = table.getElementsByTagName("tbody")[0];

    // Check if already done
    if (!table.hasAttribute("data-unloaded")) return;

    // Indicate to user loading
    tbody.firstElementChild.firstElementChild.onclick = null;
    tbody.firstElementChild.firstElementChild.removeAttribute("onclick");
    tbody.firstElementChild.firstElementChild.textContent = "Loading credits...";

    // Fetch
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Clear table
            tbody.removeChild(tbody.firstElementChild);

            // Generate rows
            var credits = JSON.parse(this.responseText);
            var row, n, c, l, d;
            for (var i = 0; i < credits.length; ++i) {
                row = document.createElement("tr");
                tbody.appendChild(row);

                n = document.createElement("td");
                n.textContent = credits[i].n;
                row.appendChild(n);

                c = document.createElement("td");
                c.textContent = credits[i].c;
                row.appendChild(c);

                l = document.createElement("td");
                l.textContent = credits[i].l;
                row.appendChild(l);

                d = document.createElement("td");
                d.textContent = credits[i].d;
                row.appendChild(d);
            }

            // Update attrs
            table.removeAttribute("data-unloaded");
        }
    };
    xmlhttp.open("GET", "production-credits.json", true);
    xmlhttp.send();
}

document.addEventListener("DOMContentLoaded", function () {
    production_credits();
});
