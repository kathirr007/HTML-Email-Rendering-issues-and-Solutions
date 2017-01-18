/*jshint multistr: true */
$(document).ready(function() {
    var xmlhttp = new XMLHttpRequest()
      , url = "assets/json/cart.json"
      , url2 = "assets/json/issues_n_solutions.json"
      , currency = "";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            myFunction(xmlhttp.responseText);
        }
    }
    ;
    // xmlhttp.open("GET", url, true);
    // xmlhttp.send();
    xmlhttp.open("GET", url2, true);
    xmlhttp.send();
    var replaceHtmlEntites = (function() {
        var translate_re = /&(nbsp|amp|quot|lt|gt);/g
          , translate = {
            'nbsp': String.fromCharCode(160),
            'amp': '&',
            'quot': '"',
            'lt': '<',
            'gt': '>'
        }
          , translator = function($0, $1) {
            return translate[$1];
        };
        return function(s) {
            return s.replace(translate_re, translator);
        }
        ;
    })();
    function myFunction(response) {
        var issues_n_solutions = JSON.parse(response), issuesNSolutionsList = issues_n_solutions[0].issuesAndSolutions, //             pfizerSolutions = issuesNSolutionsList[0].pfizer,
        //             paypalSolutions = issuesNSolutionsList[0].paypal,
        //             goaheadSolutions = issuesNSolutionsList[0].go_ahead,
        i, solutionsList = "", pricearray = [], quantityarray = [];
        console.log(issues_n_solutions);
        console.log(issuesNSolutionsList);
        // console.log(pfizerSolutions);
        // console.log(paypalSolutions);
        // console.log(goaheadSolutions);
        $.each(issuesNSolutionsList, function(idx) {
            var issueId = issuesNSolutionsList[idx].issue_id
              , issueName = issuesNSolutionsList[idx].issue_name
              , solutions = issuesNSolutionsList[idx].solutions
              , sanSolutions = replaceHtmlEntites;
            console.log(solutions);
            // console.log(typeof(solutions));
            for(i=0; i<solutions.length; i++){
                var codepenUrl = solutions[i].codepen_url;
                codepenUrl = codepenUrl ? '<a href="' + codepenUrl + '" target="_blank">here</a>' : '<strong>Not Available</strong>';
            }
            console.log(codepenUrl);

            solutionsList += '<div class="panel panel-default">\
                        <a data-toggle="collapse" data-parent="#dynamic_datas" href="#collapse' + issueId + '">\
                            <div class="panel-heading">\
                                <h4 class="panel-title">' + issueName + '</h4>\
                            </div>\
                        </a>\
                        <div id="collapse' + issueId + '" class="panel-collapse collapse">\
                            <div class="panel-body">';
            $.each(solutions, function(item) {
                var codepenUrl = solutions[item].codepen_url;
                    codepenUrl = codepenUrl ? '<a href="' + codepenUrl + '" target="_blank">here</a>' : '<strong>Not Available</strong>';
                solutionsList += '<h3 class="text-center">Solution ' + solutions[item].id + '</h3>\
                <div>' + replaceHtmlEntites(solutions[item].solution) + '</div>\
                <p class="codepen-url">To checkout more in detail please check code in Codepen: ' + codepenUrl + '</p>';
            });
            //             for(i=0; i<solutions.length; i++){
            //                 solutionsList += '<p>'+solutions[i].solution+'</p>';
            //             }
            solutionsList += '</div></div></div>';
        });
        document.getElementById('dynamic_datas').innerHTML = solutionsList;
    }
    // @include ../../template/js/_scrollTop.js
    //  ../../template/js/_scrollmagic.js
    function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

});
