 const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const result = document.getElementById("result");

    // Fetch currency list
    fetch("https://api.frankfurter.app/currencies")
      .then(res => res.json())
      .then(data => {
        const currencies = Object.keys(data);
        currencies.forEach(cur => {
          let option1 = document.createElement("option");
          let option2 = document.createElement("option");
          option1.value = option2.value = cur;
          option1.textContent = option2.textContent = cur;
          fromCurrency.appendChild(option1);
          toCurrency.appendChild(option2);
        });
        fromCurrency.value = "USD";
        toCurrency.value = "INR";
      });

    // Convert function
    function convertCurrency() {
      let amount = document.getElementById("amount").value;
      let from = fromCurrency.value;
      let to = toCurrency.value;

      if (amount === "" || amount <= 0) {
        result.innerText = "Please enter a valid amount!";
        return;
      }

      fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
        .then(res => res.json())
        .then(data => {
          result.innerText = `${amount} ${from} = ${data.rates[to]} ${to}`;
        });
    }