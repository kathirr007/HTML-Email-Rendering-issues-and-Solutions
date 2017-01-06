/*jshint multistr: true */
window.onload = (function() {
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
        function formatPrice(n) { return n > 9 ? "" + n : "0" + n; }


        function sum(itemPrices){
             
         if (toString.call(itemPrices) !== "[object Array]")
            return false;
            var total =  0;
            for(i=0; i<itemPrices.length; i++)
              {                  
                if(isNaN(itemPrices[i])){
                continue;
                 }
                  total += Number(itemPrices[i]);
               }
             return total;
            }
        function calcDiscount(subTotal, totalQnty){
            var discount = 0;
            if (totalQnty == 3) {
                discount = ((subTotal/100)*5);
            } else if (totalQnty > 3 && totalQnty <= 6) {
                discount = ((subTotal/100)*10);
            } else if (totalQnty >= 7 ) {
                discount = ((subTotal/100)*25);
            } else {
                discount = 0;
            }
            return discount;
        }
        function calcShipping(subTotal){
            var shipping = 0;
            if (subTotal >= 50) {
                shipping = 0;
            } else if (subTotal < 50 ) {
                shipping = ((subTotal/100)*5);
            } else {
                shipping = ((subTotal/100)*5);
            }
            return shipping;
        }        


    function myFunction(response) {
        var issues_n_solutions = JSON.parse(response),
            issuesNSolutionsList = issues_n_solutions.issuesAndSolutions,
            i, solutionsList = "",
            subTotal, discount, estimatedTotal, shipping, shippingPrice="", subTotalPrice="", discountPrice="", estimatedTotalPrice="", pricearray = [], quantityarray = [];

console.log(issuesNSolutionsList);

$.each(issuesNSolutionsList, function(idx) {
            var issueId = issuesNSolutionsList[idx].issue_id,
                issueName = issuesNSolutionsList[idx].issue_name,
                solutions = issuesNSolutionsList[idx].solutions,
                codepenUrl = issuesNSolutionsList[idx].codpen_url;
console.log(solutions);
console.log(typeof(solutions));
               
            solutionsList += '<div class="panel panel-default">\
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse'+issueId+'">\
                            <div class="panel-heading">\
                                <h4 class="panel-title">'+issueName+'</h4>\
                            </div>\
                        </a>\
                        <div id="collapse'+issueId+'" class="panel-collapse collapse">\
                            <div class="panel-body">';
//             $.each(solutions, function(item){
//                 solutionsList += '<p>'+item+'</p>';
//             });
            for(i=0; i<solutions.length; i++){
                solutionsList += '<p>'+solutions+'</p>';
            }
            
                solutionsList += '</div></div></div>';
} );





        document.getElementById('accordion').innerHTML = solutionsList;
        // document.getElementById('subTotal').innerHTML = subTotalPrice;
        // document.getElementById('discountTotal').innerHTML = discountPrice;
        // document.getElementById('shippingTotal').innerHTML = shippingPrice;
        // document.getElementById('estimatedTotal').innerHTML = estimatedTotalPrice;
        // totalItems = $(".cart-items").length;
        // $('.total-items').html($('<div/>', { class: 'total-items' }).html(totalItems + ' items'));
    }


})();
