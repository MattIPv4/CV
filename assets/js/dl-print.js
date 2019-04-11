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
function cv_print(elm) {
    if (elm.disabled) return;

    var org = elm.innerText;
    window.onafterprint = function () {
        window.onafterprint = null;
        elm.innerText = org;
        elm.disabled = false;
    };
    elm.innerText = "Printing...";
    elm.disabled = true;

    window.print();
}

function cv_pdf(elm) {
    if (elm.disabled) return;

    var org = elm.innerText;
    elm.innerText = "Downloading...";
    elm.disabled = true;

    var self = this;
    self.req = new XMLHttpRequest();

    var url = "https://api.html2pdfrocket.com/pdf";
    var apiKey = "3eca64fb-b7e8-4cf0-8617-dcc9e94c2a9e";
    var data = "apikey=" + apiKey + "&value=" + encodeURIComponent(window.location.href) + "&FileName=" + encodeURIComponent(document.title.replace(/\s/g, '_')) + "&UsePrintStylesheet=true";

    self.req.onload = function () {
        var link = document.createElement('a');
        var blobUrl = window.URL.createObjectURL(self.req.response);
        link.href = blobUrl;
        link.download = document.title + '.pdf';
        link.dispatchEvent(new MouseEvent('click'));
        window.URL.revokeObjectURL(blobUrl);

        elm.innerText = org;
        elm.disabled = false;
    };

    self.req.open("POST", url, true);
    self.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    self.req.responseType = "blob";

    self.req.send(data);
}
