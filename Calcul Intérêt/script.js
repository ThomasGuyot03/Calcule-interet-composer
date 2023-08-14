if (window.navigator.userAgent.indexOf("Chrome") > -1) {
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase();
        var substring = "script error";
        if (string.indexOf(substring) > -1) {
            return true;
        }
        return false;
    };
}

let calculate = () => {
    let p = Number(document.getElementById("principal").value);
    let r = Number(document.getElementById("taux").value);
    let t = Number(document.getElementById("time").value);
    let duration = document.getElementById("duration").value;
    let taxRate = Number(document.getElementById("taxRate").value);

    let years = [];
    let amounts = [];

    let totalAmount = p;
    let totalInterest = 0;

    for (let i = 1; i <= t; i++) {
        let simpleInterest = (totalAmount * r) / 100;
        totalInterest += simpleInterest;
        totalAmount += simpleInterest;

        if (duration === "month") {
            totalInterest /= 12;
        }

        // Appliquer le taux d'imposition au gain d'intérêt
        let taxableInterest = simpleInterest * (1 - taxRate / 100);
        totalInterest += taxableInterest;

        years.push(i);
        amounts.push(totalAmount.toFixed(2));
    }

    let taxableTotalAmount = totalAmount - totalInterest;

    let result = document.getElementById("result");
    result.innerHTML = `
        <div>Montant Principal: <span>${p.toFixed(2)}</span></div>
        <div>Intérêt Total: <span>${totalInterest.toFixed(2)}</span></div>
        <div>Montant Total Avant Impôt: <span>${totalAmount.toFixed(2)}</span></div>
        <div>Montant Total Après Impôt: <span>${taxableTotalAmount.toFixed(2)}</span></div>
    `;

    // Créer un graphique
    // ... Reste du code inchangé
};

document.getElementById("calculate-btn").addEventListener("click", calculate);
