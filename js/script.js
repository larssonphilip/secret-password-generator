$(document).ready(function () {
    $("#copied-alert").hide();
    $(".password-input").val(generateRandomString(parseInt($(".slider-value").val())));

    $(".generate-btn").click(function () {
        if($(".password-item-container").is(":visible")) {
            $(".password-input").val(generateRandomString(parseInt($(".slider-value").val())));
        } else if ($(".pin-item-container").is(":visible")) {
            $(".password-input").val(generateRandomPin(parseInt($(".pin-number-slider-value").val())));
        } else if ($(".uuid-item-container").is(":visible")) {
            $(".password-input").val(generateUUID()); 
        } else if ($(".secret-info-txt").is(":visible")) {
            generateSHA256HashOfRandomArray().then(hashHex => {
                $(".password-input").val(hashHex);
            });
        }
    });

    $(".copy-btn").click(function () {
        navigator.clipboard.writeText($(".password-input").val())
            .then(() => showPasswordCopiedAlert())
            .catch(err => console.error('Error in copying text: ', err));
    });

    $(".type-dropdown-menu").on("click", "a", function (event) {
        $(".type-dropdown-menu").hide();
        $("#dropdown-title").text($(this).text());
        var id = $(this).attr("id");

        $(".password-item-container").hide();
        $(".pin-item-container").hide();
        $(".uuid-item-container").hide();
        $(".secret-info-txt").hide();

        if(id === "password-menu-item") {
            $(".password-item-container").show();
        } else if (id === "secret-menu-item") {
            $(".secret-info-txt").show();
            generateSHA256HashOfRandomArray().then(hashHex => {
                $(".password-input").val(hashHex);
            });
        } else if (id === "pin-menu-item") {
            $(".pin-item-container").show();
        } else if (id === "uuid-menu-item") {
            $(".uuid-item-container").show();
            $(".password-input").val(generateUUID()); 
        }
    });

    $(".type-button-collapse").click(function () {
        if($(".type-dropdown-menu").is(':visible'))
            $(".type-dropdown-menu").hide();
        else
            $(".type-dropdown-menu").show();
    });

    $(".format-button-collapse").click(function () {
        if($(".uuid-format-dropdown-menu").is(':visible'))
            $(".uuid-format-dropdown-menu").hide();
        else
            $(".uuid-format-dropdown-menu").show();
    });

    $(".version-button-collapse").click(function () {
        if($(".uuid-version-dropdown-menu").is(':visible'))
            $(".uuid-version-dropdown-menu").hide();
        else
            $(".uuid-version-dropdown-menu").show();
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

function generateRandomPin(length) {
    var characters = "0123456789";
    var result = "";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function generateSHA256HashOfRandomArray() {
    let randomArray = new Uint8Array(24);
    window.crypto.getRandomValues(randomArray);
    
    let hashBuffer = await window.crypto.subtle.digest('SHA-256', randomArray);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateCUID() {
    const timestamp = Date.now().toString(36);
    
    const counter = ((function() {
        let count = 0;
        return function() {
            count = (count < Number.MAX_SAFE_INTEGER) ? count + 1 : 0;
            return count.toString(36).padStart(4, '0');
        }
    })())();
    
    const randomPart = () => 
        Math.random().toString(36).substr(2, 9) +
        Math.random().toString(36).substr(2, 9);
    
    return `c${timestamp}${counter}${randomPart()}`;
}

function generateNanoId(size = 21) {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
    const bytes = crypto.getRandomValues(new Uint8Array(size));
    let id = '';
  
    while (0 < size--) {
        id += alphabet[bytes[size] & 63];
    }
  
    return id;
}


