(function ($) {
    "use strict";

    $(document).ready(function () {
        let { build } = data;
        if ( ! isJsonString( build ) ) {
            return;
        }
        build = JSON.parse(build);
        let html = '<body><div class="wpsf-survey">';

        let {
            CONTENT_ELEMENTS: content,
            START_ELEMENTS: start,
            RESULT_ELEMENTS: end,
        } = build.List;
        let innerhtml = "";
        let count = 0;
        for (let i = 0; i < start.length; i++) {
            switch (start[i].componentName) {
                case "CoverPage":
                    innerhtml +=
                        '<div class="tab" tab-name="coverpage" tab-count="'+count+'"><h4>' +
                        start[i].title +
                        "</h4><p>" +
                        start[i].description +
                        "</p><button onclick='nextPrev(1)'>" +
                        start[i].button +
                        "</button></div>";
                        count++;
                    break;

                default:
                    innerhtml += "";
                    break;
            }
        }
        for (let i = 0; i < content.length; i++) {
            switch (content[i].componentName) {
                case "SingleChoice":
                    innerhtml += '<div class="tab" tab-name="singlechoice" tab-count="'+count+'">';
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
                    count++;
                    innerhtml += '</div>'
                    break;
                case "MultiChoice":
                    innerhtml += '<div class="tab" tab-name="multichoice" tab-count="'+count+'">';
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
                    innerhtml += '</div>';
                    count++;
                    break;
                case 'FormElements':
                    const { List } = content[i];
                    innerhtml += '<div class="tab" tab-name="formelements" tab-count="'+count+'">';
                    for( let j = 0; j < List.length ; j++ ) {
                        let required = List[j].required ? 'required' : '';
                        switch( List[j].componentName ) {
                            case 'FirstName':
                            case 'LastName':
                                innerhtml += '<label>'+List[j].name+'</label>';
                                innerhtml += '<input type="text" placeholder="'+List[j].placeholder+'" name="" id="" '+required+' />';
                                break;

                            case 'Email':
                                innerhtml += '<label>'+List[j].name+'</label>';
                                innerhtml += '<input type="email" placeholder="'+List[j].placeholder+'" name="" id="" '+required+' />';
                                break;
                        }
                    }
                    count++;
                    innerhtml += '</div>';
                    break;
                default:
                    innerhtml += "";
                    break;
            }
        }

        for (let i = 0; i < end.length; i++) {
            switch (end[i].componentName) {
                case "ResultScreen":
                    innerhtml += '<div class="tab" tab-name="resultscreen" tab-count="'+count+'">';
                    innerhtml +=
                        '<div class="result-page"><h4>' +
                        end[i].title +
                        "</h4><p>" +
                        end[i].description +
                        "</p></div></div>";
                        count++;
                    break;

                default:
                    innerhtml += "";
                    break;
            }
        }
        innerhtml += '<div style="overflow:auto;"><div style="float:right;"><button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button><button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button></div></div>';
        html += innerhtml;
        html += "</div>";
        html += `<style>
            .tab {
                display: none;
            }
        </style>`;
        html += `<script>var currentTab = 0;
        var totalTab = ${count};
        showTab(currentTab); // Display the current tab
        function showTab(n) {
          var x = document.getElementsByClassName("tab");
          x[n].style.display = "block";
          if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
            document.getElementById("nextBtn").style.display = "none";
          } else {
            document.getElementById("prevBtn").style.display = "inline";
          }
          if ( n > 0) {
            document.getElementById("nextBtn").style.display = "inline";
          }
          if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
          } else {
            document.getElementById("nextBtn").innerHTML = "Next";
          }
          //... and run a function that will display the correct step indicator:
        }
        
        function nextPrev(n) {
          // This function will figure out which tab to display
          var x = document.getElementsByClassName("tab");
          // Exit the function if any field in the current tab is invalid:
          // Hide the current tab:
          x[currentTab].style.display = "none";
          // Increase or decrease the current tab by 1:
          currentTab = currentTab + n;
          // if you have reached the end of the form...
          if (currentTab >= x.length) {
            // ... the form gets submitted:
            document.getElementById("regForm").submit();
            return false;
          }
          // Otherwise, display the correct tab:
          showTab(currentTab);
        }</script>`;
        html += '</body>';
        let iframe = document.createElement("iframe");
        iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
        iframe.id = "wpsf-survey-iframe";
        iframe.width = "100%";
        document.getElementById("wpsf-survey-frontend").appendChild(iframe);
        iframe.height = iframe.offsetWidth;
    });

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
})(jQuery);
