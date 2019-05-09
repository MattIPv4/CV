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
function getTplElm(template, element) {
    return template.querySelector("[data-template=\"" + element + "\"]");
}

function getBaseExperienceTemplate() {
    // Initialize the DOM parser
    var parser = new DOMParser();
    // Parse the text
    return parser.parseFromString(window.baseExperienceTemplate, "text/html");
}

function insertTextWithLineBreaks(text, targetElement) {
    var textWithNormalizedLineBreaks = text.replace('\r\n', '\n');
    var textParts = textWithNormalizedLineBreaks.split('\n');

    for (var i = 0; i < textParts.length; i++) {
        targetElement.appendChild(document.createTextNode(textParts[i]));
        if (i < textParts.length - 1) {
            targetElement.appendChild(document.createElement('br'));
        }
    }
}

function renderBaseExperience(data) {
    var template = getBaseExperienceTemplate(),
        converter = new showdown.Converter({openLinksInNewWindow: true});

    // Set role name
    insertTextWithLineBreaks(data.position.role, getTplElm(template, "position.role"));

    // Set from
    getTplElm(template, "position.from").textContent = data.position.from;

    if (typeof data.position.to === "string") {
        // Set to (in past)
        getTplElm(template, "position.to").textContent = data.position.to;
        getTplElm(template, "section").className = "past";
    } else {
        // Set to (present)
        var elm = getTplElm(template, "position.to");
        elm.className = "present";
        elm.textContent = "Present"
    }

    // Add all points
    for (var i = 0; i < data.points.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = converter.makeHtml(data.points[i]);
        getTplElm(template, "points").appendChild(li);
    }

    // Done
    return template;
}

function renderFullExperience(data) {
    // Get base
    var base = renderBaseExperience(data);

    // Wrap in item
    var item = document.createElement("div");
    item.className = "item";
    item.appendChild(getTplElm(base, "section"));

    // Inject company name
    var companyName = document.createElement("span");
    insertTextWithLineBreaks(data.company.name, companyName);
    companyName.className = "normal highlight";
    var br = document.createElement("br"),
        info = getTplElm(item, "info");
    info.insertBefore(br, info.firstChild);
    info.insertBefore(companyName, info.firstChild);

    // Add company headline + url
    if (data.company.headline !== null || data.company.url !== null) {
        var p = document.createElement("p");

        // Add headline
        if (data.company.headline !== null) {
            p.appendChild(document.createTextNode(data.company.headline));
        }

        // Add break if both
        if (data.company.headline !== null && data.company.url !== null) {
            br = document.createElement("br");
            p.appendChild(br);
        }

        // Add url
        if (data.company.url !== null) {
            var a = document.createElement("a");
            a.target = "_blank";
            a.href = data.company.url;
            a.textContent = data.company.url;
            p.appendChild(a);
        }

        // Inject
        var section = getTplElm(item, "section");
        section.insertBefore(p, section.children[1]);
    }

    // Add additional experiences
    for (var i = 0; i < data.additional.length; i++) {
        item.appendChild(renderBaseExperience(data.additional[i]));
    }

    // Done
    return item;
}

function experiences() {
    // Fetch the template
    window.doXHR("templates/baseExperience.html", function (html) {
        window.baseExperienceTemplate = html;

        // Fetch the data
        window.doXHR("data/experiences.json", function (data) {
            for (var i = 0; i < data.length; i++) {
                var category = data[i];
                for (var j = 0; j < category.experience.length; j++) {
                    var experience = category.experience[j];
                    console.log(renderFullExperience(experience));
                }
            }
        }, true);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    experiences();
});
