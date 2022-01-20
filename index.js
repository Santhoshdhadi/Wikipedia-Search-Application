let searchInputElement = document.getElementById("searchInput");
let searchResultsElement = document.getElementById("searchResults");
let spinnerElement = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;
    // Div container ------- result-item
    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");



    //2Anchor title-------result-title
    let titleElement = document.createElement("a");
    titleElement.classList.add("result-title");
    titleElement.textContent = title;
    titleElement.href = link;
    titleElement.target = "_blank";

    resultItemElement.appendChild(titleElement)

    //Title break---------creting break element 
    let titleBreakElement = document.createElement("br");
    resultItemElement.appendChild(titleBreakElement)

    // Anchor url ----creating url element
    let urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;
    resultItemElement.appendChild(urlElement);

    // link break
    let linkBreakElement = document.createElement("br");
    resultItemElement.appendChild(linkBreakElement);

    //paragraph description ----------creating description element
    let descriptionElement = document.createElement("p");
    descriptionElement.classList.add("link-description");
    descriptionElement.textContent = description;
    resultItemElement.appendChild(descriptionElement);

    searchResultsElement.appendChild(resultItemElement)
}


function displayResults(searchResults) {
    spinnerElement.classList.toggle("d-none")
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsElement.textContent = ""
        spinnerElement.classList.toggle("d-none")
        let searchInput = searchInputElement.value;
        //http request 
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputElement.addEventListener("keydown", searchWikipedia);