(function ($) {
    "use strict";

    $(document).ready(function () {
        let { build } = data;
        build = JSON.parse(build);
        let html = '<body><div class="wpsf-survey">';

        let {
            CONTENT_ELEMENTS: content,
            START_ELEMENTS: start,
            RESULT_ELEMENTS: end,
        } = build.List;
        let innerhtml = "";
        for (let i = 0; i < start.length; i++) {
            switch (start[i].componentName) {
                case "CoverPage":
                    innerhtml +=
                        '<div class="cover-page"><h4>' +
                        start[i].title +
                        "</h4><p>" +
                        start[i].description +
                        "</p><button>" +
                        start[i].button +
                        "</button></div>";
                    break;

                default:
                    innerhtml += "";
                    break;
            }
        }
        innerhtml += "<hr />";
        innerhtml += '<div class="content-page">';
        for (let i = 0; i < content.length; i++) {
            switch (content[i].componentName) {
                case "SingleChoice":
                    innerhtml +=
                        "<h4>" +
                        content[i].title +
                        "</h4><p>" +
                        content[i].description +
                        "</p>";
                    for (let j = 0; j < content[i].answers.length; j++) {
                        innerhtml +=
                            '<input type="radio" name="radiobutton" value=' +
                            content[i].answers[j].name +
                            " />";
						innerhtml +=
							'<label>'+ content[i].answers[j].name +'</label>'
                    }
                    break;
                case "MultiChoice":
                    innerhtml +=
                        "<h4>" +
                        content[i].title +
                        "</h4><p>" +
                        content[i].description +
                        "</p>";
                    for (let j = 0; j < content[i].answers.length; j++) {
                        innerhtml +=
                            '<input type="checkbox" name="radiobutton" value=' +
                            content[i].answers[j].name +
                            " />";
						innerhtml +=
							'<label>'+ content[i].answers[j].name +'</label>'
                    }
                    break;

                default:
                    innerhtml += "";
                    break;
            }
        }
        innerhtml += "</div><hr />";

        for (let i = 0; i < end.length; i++) {
            switch (end[i].componentName) {
                case "ResultScreen":
                    innerhtml +=
                        '<div class="result-page"><h4>' +
                        end[i].title +
                        "</h4><p>" +
                        end[i].description +
                        "</p></div>";
                    break;

                default:
                    innerhtml += "";
                    break;
            }
        }
        innerhtml += "<hr />";
        html += innerhtml;
        html += "</div></body>";
        let iframe = document.createElement("iframe");
        iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
        iframe.id = "wpsf-survey-iframe";
        iframe.width = "100%";
        document.getElementById("wpsf-survey-frontend").appendChild(iframe);
        iframe.height = iframe.offsetWidth;
    });
})(jQuery);
