$(document).ready(function () {
    $("#copied-alert").hide();
    $(".password-input").val(generateRandomString(parseInt($(".slider-value").val())));

    $(".generate-btn").click(function () {
        $(".password-input").val(generateRandomString(parseInt($(".slider-value").val())));
    });

    $(".copy-btn").click(function () {
        navigator.clipboard.writeText($(".password-input").val())
            .then(() => showPasswordCopiedAlert())
            .catch(err => console.error('Error in copying text: ', err));
    });

    $(".type-button-collapse").click(function () {
        if($(".type-dropdown-menu").is(':visible'))
            $(".type-dropdown-menu").hide();
        else
            $(".type-dropdown-menu").show();
    });
    
    $(".numbers-toggle").change(function () {
        $(".password-input").val(generateRandomString(parseInt($(".slider-value").val())));
    });

    $(".symbols-toggle").change(function () {
        $(".password-input").val(generateRandomString(parseInt($(".slider-value").val())));
    });

    $('input[type=range]').on('input', function () {
        $(".slider-value").val($(this).val());
        $(".password-input").val(generateRandomString(parseInt($(this).val())));
    });
});

function showPasswordCopiedAlert() {
    $("#copied-alert").show();
    setTimeout(function() {
        $("#copied-alert").fadeOut(500, function() {
            $(this).hide();
        });
    }, 1500);
}

function generateRandomString(length) {
    var includeNumbers = $(".numbers-toggle").is(':checked');
    var includeSymbols = $(".symbols-toggle").is(':checked');
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(includeNumbers)
        characters += "0123456789";

    if(includeSymbols)
        characters += "!@#$%^&*()_+{}:\"<>?[];,./\'";

    var result = "";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
