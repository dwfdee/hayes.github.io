(function () {
  // Functions to show quantity in the text box

  const amounts = document.querySelectorAll(".amount");
  const buttons = document.querySelectorAll(
    ".btn.btn-outline-primary, .btn.btn-outline-warning, .btn.btn-outline-success"
  );
  const outputValue = document.querySelector(".output");
  const clearButton = document.querySelector(".btn.btn-outline-danger");

  let total = 0;

  function updateTotal() {
    let currentTotal = 0;
    buttons.forEach(function (button, index) {
      const quantity = parseFloat(
        amounts[index] ? amounts[index].value.split(" ")[1] : 1
      );
      const value = parseFloat(button.dataset.value) || 0;
      currentTotal += value * quantity;
    });
    total = currentTotal;
    outputValue.value = "Total: $" + total.toFixed(2);
  }

  // Add click event listeners for all buttons
  buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      if (amounts[index]) {
        let quantity = parseFloat(amounts[index].value.split(" ")[1]) + 1 || 1;
        amounts[index].value = "Quantity: " + quantity;
      }
      // Update the total value only if the button clicked is associated with a value
      if (button.dataset.value) {
        updateTotal();
      }
    });
  });

  // Add click event listener for the danger button to clear all input boxes
  clearButton.addEventListener("click", function () {
    amounts.forEach(function (amount) {
      amount.value = "Quantity: 0";
    });
    total = 0; // Reset the total to 0
    outputValue.value = "Total: $0.00";
  });

  // Add click event listener for the success button to apply discount
  const successButton = document.querySelector(".btn.btn-outline-success");
  successButton.addEventListener("click", function () {
    // Apply a 10% discount
    total *= 0.9;
    outputValue.value = "Total -10%: $" + total.toFixed(2);
  });
})();
