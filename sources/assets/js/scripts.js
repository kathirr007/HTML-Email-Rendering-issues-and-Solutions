/*jshint multistr: true */
$(document).ready(function() {
    var xmlhttp = new XMLHttpRequest(),
        url = "assets/json/cart.json",
        url2 = "assets/json/issues_n_solutions.json",
        currency = "";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            myFunction(xmlhttp.responseText);
        }
    };
    // xmlhttp.open("GET", url, true);
    // xmlhttp.send();
    xmlhttp.open("GET", url2, true);
    xmlhttp.send();
    var replaceHtmlEntites = (function() {
        var translate_re = /&(nbsp|amp|quot|lt|gt);/g,
            translate = {
                'nbsp': String.fromCharCode(160),
                'amp': '&',
                'quot': '"',
                'lt': '<',
                'gt': '>'
            },
            translator = function($0, $1) {
                return translate[$1];
            };
        return function(s) {
            return s.replace(translate_re, translator);
        };
    })();

    function myFunction(response) {
        var issues_n_solutions = JSON.parse(response),
            issuesNSolutionsList = issues_n_solutions[0].issuesAndSolutions, //             pfizerSolutions = issuesNSolutionsList[0].pfizer,
            //             paypalSolutions = issuesNSolutionsList[0].paypal,
            //             goaheadSolutions = issuesNSolutionsList[0].go_ahead,
            i, solutionsList = "",
            pricearray = [],
            quantityarray = [];
        console.log(issues_n_solutions);
        console.log(issuesNSolutionsList);
        // console.log(pfizerSolutions);
        // console.log(paypalSolutions);
        // console.log(goaheadSolutions);
        $.each(issuesNSolutionsList, function(idx) {
            var issueId = issuesNSolutionsList[idx].issue_id,
                issueName = issuesNSolutionsList[idx].issue_name,
                solutions = issuesNSolutionsList[idx].solutions,
                sanSolutions = replaceHtmlEntites;
            // console.log(solutions);
            // console.log(typeof(solutions));
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
        $(document).on("keyup", "input[name='q']", function() {
            $('#search_datas').css({ 'display': 'block', 'margin': '15px 0 30px 0' })
            var searchValue = $(this).val(),
                searchQuery = searchValue.toLowerCase();
            // console.log(searchQuery);
            var searchResult = '';
            if (searchQuery == '') {
                $("#search_datas").css({ 'display': 'none' }).empty();
            } else {
                $.each(issuesNSolutionsList, function(i, item) {
                    var searchTitle = issuesNSolutionsList[i].issue_name.toLowerCase(),
                        issueId = issuesNSolutionsList[i].issue_id,
                        issueName = issuesNSolutionsList[i].issue_name,
                        solutions = issuesNSolutionsList[i].solutions,
                        sanSolutions = replaceHtmlEntites;
                    // console.log(searchTitle);
                    if (searchTitle.indexOf(searchQuery) != -1) {
                        $('#search_datas').removeClass('bg-danger').addClass('bg-success');
                        searchResult += '<div class="panel panel-default">\
                        <a data-toggle="collapse" data-parent="#search_datas" href="#collapse' + issueId + '">\
                            <div class="panel-heading">\
                                <h4 class="panel-title">' + issueName + '</h4>\
                            </div>\
                        </a>\
                        <div id="collapse' + issueId + '" class="panel-collapse collapse">\
                            <div class="panel-body">';
                        $.each(solutions, function(item) {
                            var codepenUrl = solutions[item].codepen_url;
                            codepenUrl = codepenUrl ? '<a href="' + codepenUrl + '" target="_blank">here</a>' : '<strong>Not Available</strong>';
                            searchResult += '<h3 class="text-center">Solution ' + solutions[item].id + '</h3>\
                <div>' + replaceHtmlEntites(solutions[item].solution) + '</div>\
                <p class="codepen-url">To checkout more in detail please check code in Codepen: ' + codepenUrl + '</p>';
                        });
                        //             for(i=0; i<solutions.length; i++){
                        //                 searchResult += '<p>'+solutions[i].solution+'</p>';
                        //             }
                        searchResult += '</div></div></div>';
                    }
                });
                if (searchResult == '') {
                    $('#search_datas').removeClass('bg-success').addClass('bg-danger');
                    searchResult += '<p style="" class="text-danger">Sorry, No results found. Try something else.</p>';
                }
                $("#search_datas").empty().append('<h4 class="text-success">Search results related to the keyword "' + searchValue + '"</h4>' + searchResult);
            }
        });
        var snippets = $('#snippets div.panel');
            // snippetsTitle = snippets[0].children[0].innerHTML,
            // snippetsContent = snippets[0].children[1].innerHTML;
        console.log(snippets);
        $(document).on("keyup", "input[name='snippets']", function() {
            $('#search_snippets').css({ 'display': 'block', 'margin': '15px 0 30px 0' })
            var searchValue = $(this).val(),
                searchQuery = searchValue.toLowerCase();
            // console.log(searchQuery);
            var searchResult = '';
            if (searchQuery == '') {
                $("#search_snippets").css({ 'display': 'none' }).empty();
            } else {
                $.each(snippets, function(i, item) {
                    var searchTitle = snippets[i].children[0].innerHTML.toLowerCase(),
                        snippetsTitle = snippets[i].children[0].innerHTML,
                        snippetsContent = snippets[i].children[1].innerHTML,
                        sanSolutions = replaceHtmlEntites;
                    // console.log(searchTitle);
                    if (searchTitle.indexOf(searchQuery) != -1) {
                        $('#search_snippets').removeClass('bg-danger').addClass('bg-success');
                        searchResult += '<div class="panel panel-default">\
                        <a data-toggle="collapse" data-parent="#search_snippets" href="#snippet' + i + '">'+ snippetsTitle + '</a>\
                        <div id="snippet' + i + '" class="panel-collapse collapse">'+ snippetsContent +'</div></div></div>';
                    }
                });
                if (searchResult == '') {
                    $('#search_snippets').removeClass('bg-success').addClass('bg-danger');
                    searchResult += '<p style="" class="text-danger">Sorry, No results found. Try something else.</p>';
                }
                $("#search_snippets").empty().append('<h4 class="text-success">Search results related to the keyword "' + searchValue + '"</h4>' + searchResult);
            }
        });
        document.getElementById('dynamic_datas').innerHTML = solutionsList;
    }
    // @include ../../template/js/_scrollTop.js
    //  ../../template/js/_scrollmagic.js
});
