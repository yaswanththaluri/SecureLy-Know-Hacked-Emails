$(document).ready(function () {


    const search = document.getElementById("submitButton");
    const clear = document.getElementById("clearButton");
    const details = document.getElementsByClassName("secureDetails")[0];
    const about = document.getElementById("aboutIcon");
    const aboutSec = document.getElementById("aboutSection");
    const closeButton = document.getElementById("close");
    const email = document.getElementById("emailInput");

    search.addEventListener("click", function () {

        var loader = document.getElementById("loader");
        loader.style.display = "block";

        email.disabled = true;

        apiRequest(email.value);
    });

    clear.addEventListener("click", function () {
        email.disabled = false;
        search.style.display = "inline";
        clear.style.display = "none";
        details.style.display = "none";

        var org = document.getElementById("orgName");
        org.innerHTML = "org";

        var titleOrg = document.getElementById("titleOrg");
        titleOrg.innerHTML = "title";

        var date = document.getElementById("breachDate");
        date.innerHTML = "breachedDate";

        var domainName = document.getElementById("domain");
        domainName.innerHTML = "domain";

        var desc = document.getElementById("description");
        desc.innerHTML = "descrption";
    });

    about.addEventListener("click", function () {

        aboutSec.style.display = "block";

    });

    closeButton.addEventListener("click", function () {

        aboutSec.style.display = "none";

    });


});

function apiRequest(emailId) {

    var httpObject = new XMLHttpRequest();

    var address = "https://haveibeenpwned.com/unifiedsearch/" + emailId;

    httpObject.open("GET", address, true);

    httpObject.send();

    httpObject.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200)
        {
            updateDetails(this.responseText);
        }

        else
        {
            updateSecureDetails();
        }

    }

}


function updateDetails(response) {

    var loader = document.getElementById("loader");
    loader.style.display = "none";

    var jsonResponse = JSON.parse(response);

    var name = jsonResponse["Breaches"][0]["Name"];

    var title = jsonResponse["Breaches"][0]["Title"];

    var breachedDate = jsonResponse["Breaches"][0]["BreachDate"];

    var domain = jsonResponse["Breaches"][0]["Domain"];

    var descrption = jsonResponse["Breaches"][0]["Description"];

    var div = document.getElementById("isSecuredDetails");
    div.style.display = "block";

    var title = document.getElementById("isSecuredTitle");
    title.innerHTML = "Ohh NO! Your account is Hacked";

    var img = document.getElementById("isSecuredLogo");
    img.src = "unsecured.png";

    var org = document.getElementById("orgName");
    org.innerHTML = name;

    var titleOrg = document.getElementById("titleOrg");
    titleOrg.innerHTML = title;

    var date = document.getElementById("breachDate");
    date.innerHTML = breachedDate;

    var domainName = document.getElementById("domain");
    domainName.innerHTML = domain;

    var desc = document.getElementById("description");
    desc.innerHTML = descrption;

    const search = document.getElementById("submitButton");
    const clear = document.getElementById("clearButton");
    const details = document.getElementsByClassName("secureDetails")[0];

    clear.style.display = "inline";
    search.style.display = "none";
    details.style.display = "block";

}

function updateSecureDetails() {

    var loader = document.getElementById("loader");
    loader.style.display = "none";

    const search = document.getElementById("submitButton");
    const clear = document.getElementById("clearButton");
    const details = document.getElementsByClassName("secureDetails")[0];

    clear.style.display = "inline";
    search.style.display = "none";
    details.style.display = "block";

    var div = document.getElementById("isSecuredDetails");
    div.style.display = "none";

    var title = document.getElementById("isSecuredTitle");
    title.innerHTML = "Hurray! Your account is secured";

    var img = document.getElementById("isSecuredLogo");
    img.src = "secured.png";

}