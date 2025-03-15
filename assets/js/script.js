const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById("customTip");
const numPeopleInput = document.getElementById("numPeople");
const tipAmountDisplay = document.getElementById("tipAmount");
const totalAmountDisplay = document.getElementById("totalAmount");
const resetButton = document.getElementById("resetBtn");

let tipPercentage = 0;

tipButtons.forEach((button) => {
  button.addEventListener("click", function () {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    tipPercentage = parseFloat(this.getAttribute("data-tip"));
    customTipInput.value = "";
    calculateTip();
  });
});

customTipInput.addEventListener("input", function () {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  tipPercentage = parseFloat(this.value) || 0;
  calculateTip();
});

billInput.addEventListener("input", calculateTip);
numPeopleInput.addEventListener("input", calculateTip);
resetButton.addEventListener("click", resetForm);

function calculateTip() {
  const billAmount = parseFloat(billInput.value);
  const numPeople = parseInt(numPeopleInput.value);

  if (
    isNaN(billAmount) ||
    billAmount <= 0 ||
    isNaN(numPeople) ||
    numPeople <= 0
  ) {
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    return;
  }

  const tipAmount = (billAmount * (tipPercentage / 100)) / numPeople;
  const totalAmount = billAmount / numPeople + tipAmount;

  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

function resetForm() {
  billInput.value = "";
  customTipInput.value = "";
  numPeopleInput.value = "";
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  tipPercentage = 0;
}
