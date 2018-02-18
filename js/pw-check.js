
var pwInput = document.querySelector("#pwInput");
var outputArea = document.querySelector("#outputArea");


// based on https://en.wikipedia.org/wiki/Password_strength
function PasswordCheck (passwordValue) {
    var password, length, symbol, entropy;

    init(passwordValue);
    calculate(this);

    function init(passwordValue) {
        password = String(passwordValue);

        if (password == 'null') {
            throw 'No password provided!';
        }
    }

    // get length of the password
    this.getLength = function() {
        return length;
    };

    // get count of symbols, that are (potentially) used in password
    this.getSymbolCount = function() {
        return symbol.count;
    };
    this.getSymbolLabel = function() {
        return symbol.label;
    };

    // get entropy in bits
    this.getEntropyBits = function(decimals) {
        if (decimals) {
            return entropy.toFixed(decimals);
        }

        return entropy;
    };

    this.getEntropyQualityLabel = function() {
        return getQuality(entropy).label;
    };

    this.getEntropyQualityColorClass = function() {
        return getQuality(entropy).class;
    };

    this.getPossibleVariations = function() {
        var variations = Math.pow(2, this.getEntropyBits());
        return Math.round(variations).toLocaleString();
    };


    function calculate(self) {
        length = password.length;
        symbol = getSymbol(password);

        entropy = length * (Math.log(symbol.count) / Math.log(2));
    }

    function getSymbol(pw) {

        if (pw.match(/^[0-9]*$/) != null) {
            return {count: 10, label: 'only digits (0-9)'};
        }

        if (pw.match(/^[0-9A-F]*$/) != null) {
            return {count: 16, label: 'hex code (a-f, 0-9)'};
        }

        if (pw.match(/^[a-z]*$/) != null) {
            return {count: 26, label: 'only lowercase characters (a-z)'};
        }

        if (pw.match(/^[A-Z]*$/) != null) {
            return {count: 26, label: 'only uppercase characters (A-Z)'};
        }

        if (pw.match(/^[a-z0-9]*$/) != null) {
            return {count: 36, label: 'only lowercase characters and digits (a-z, 0-9)'};
        }

        if (pw.match(/^[A-Z0-9]*$/) != null) {
            return {count: 36, label: 'only uppercase chacracters and digits (A-Z, 0-9)'};
        }

        if (pw.match(/^[a-zA-Z]*$/) != null) {
            return {count: 52, label: 'uppper- and lowercase characters (a-z, A-Z)'};
        }

        if (pw.match(/^[a-zA-Z0-9]*$/) != null) {
            return {count: 62, label: 'uppper- and lowercase characters and digits (a-z, A-Z, 0-9)'};
        }

        if (pw.match(/[\ ]/) == null) {
            return {count: 94, label: 'all characters and digits (except whitespace)'};
        }

        return {count: 95, label: 'all characters'};
    }

    function getQuality(entropy) {
        // based on https://keepass.info/help/kb/pw_quality_est.html

        if (entropy >= 128) {
            return {label: 'Very good', class: 'entropy-quality-very-good'};
        } else if (entropy >= 112) {
            return {label: 'Strong', class: 'entropy-quality-strong'};
        } else if (entropy >= 80) {
            return {label: 'Moderate', class: 'entropy-quality-moderate'};
        } else if (entropy >= 64) {
            return {label: 'Weak', class: 'entropy-quality-weak'};
        }else {
            return {label: 'Very weak', class: 'entropy-quality-very-weak'};
        }
    }
}



var outputEntropy =  document.querySelector("#outputEntropy");
var outputoutputEntropyQualityLabel =  document.querySelector("#outputEntropyQualityLabel");
var outputGuesses =  document.querySelector("#outputGuesses");
var outputLength =  document.querySelector("#outputLength");
var outputSymbolCount =  document.querySelector("#outputSymbolCount");
var outputSymbolLabel =  document.querySelector("#outputSymbolLabel");



function updatePasswordCheck(e) {
    e.preventDefault();

    var password = pwInput.value;
    var pwCheck = new PasswordCheck(password);

    outputEntropy.innerHTML = pwCheck.getEntropyBits(1);
    outputoutputEntropyQualityLabel.innerHTML = pwCheck.getEntropyQualityLabel();
    outputoutputEntropyQualityLabel.setAttribute('class', 'badge ' + pwCheck.getEntropyQualityColorClass());
    outputGuesses.innerHTML = pwCheck.getPossibleVariations();
    outputLength.innerHTML = pwCheck.getLength();
    outputSymbolCount.innerHTML = pwCheck.getSymbolCount();
    outputSymbolLabel.innerHTML = pwCheck.getSymbolLabel();
}


pwInput.addEventListener('keyup', updatePasswordCheck, false);
