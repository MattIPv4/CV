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
window.doXHR = function (url, callback, parseJSON) {
    // Fetch
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        // Done
        if (this.readyState === 4 && this.status === 200) {
            var data = this.responseText;

            // Attempt to convert to JSON if required
            if (typeof parseJSON === "boolean" && parseJSON) {
                try {
                    data = JSON.parse(data)
                } catch (e) {
                    data = this.responseText;
                }
            }

            // Callback
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};
