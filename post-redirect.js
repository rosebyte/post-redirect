;(function () {
    var getField = function (name, value) {
        var field = document.createElement('input');
        field.type = "hidden";
        field.name = name;
        field.value = value;
        return field;
    };

    var getToken = function(forgeryTokenField){
        forgeryTokenField = forgeryTokenField || "__RequestVerificationToken";
        var tokenSource = document.getElementsByName(forgeryTokenField);
        if(tokenSource != null && tokenSource.length > 0){
            return tokenSource[0].value;
        }
    };

    var getForm = function(url){
        var form = document.createElement('form');
        form.action = url;
        form.method = "POST";
        form.style = "display:none";
        form.target = "_blank";
        return form;
    };

    window.PostRedirect = function (url, body, forgeryTokenField) {
        forgeryTokenField = forgeryTokenField || "__RequestVerificationToken";

        var form = getForm(url);
        form.appendChild(getField("body", JSON.stringify(body)));

        var token = getToken(forgeryTokenField);
        if(token != null){
            form.appendChild(getField(forgeryTokenField, token));
        }

        document.body.appendChild(form);
        form.submit()
    }
})();