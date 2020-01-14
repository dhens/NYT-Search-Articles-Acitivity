let searchBtn = $("#searchBtn");
let clearResults = $("#clearForm");
let searchResults = $("#searchResults");

clearResults.on("click", function() {
    searchResults.empty();
})


searchBtn.on("click", function(e) {
    e.preventDefault();
    let searchTerm = $("#searchTerm").val();
    let numRecords = $("#numRecords").val();
    let startYear = $("#startDate").val();
    let endDate = $("#endDate").val();

    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=xlM78E1Bd9zOxSZgNG3hvAYrwI7rrupr";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response)
        articleData = response;

        for (let i = 0; i < numRecords; i++) {
            let pubDate = parseInt(articleData.response.docs[i].pub_date)
            console.log(pubDate);

            let sourceEl = $("<h5>");
            let sourceText = articleData.response.docs[i].source;
            sourceEl.text(sourceText);
            searchResults.append(sourceEl);

            let dateEl = $("<h6>");
            let dateText = parseInt(articleData.response.docs[i].pub_date);
            dateEl.text(dateText);
            searchResults.append(dateEl);

            let newArticle = $("<p>")
            let articleTitle = articleData.response.docs[i].abstract;
            newArticle.text(articleTitle);
            searchResults.append(newArticle);
        }

    })
})