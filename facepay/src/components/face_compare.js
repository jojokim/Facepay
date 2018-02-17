$(function() {
        var params = {
            // Request parameters
            "name":"users",
        };

        $.ajax({
            url: "https://eastus.api.cognitive.microsoft.com/face/v1.0/facelists/{faceListId}?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
            },
            type: "PUT",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });
