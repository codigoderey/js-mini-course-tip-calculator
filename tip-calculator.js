let amount = document.querySelector("input#tip-amount");
let people = document.querySelector("#tip-people");
let tipOptions = document.querySelectorAll("#tip-percentage");
let customTip = document.querySelector("#tip-custom");
let customTipContainer = document.querySelector("#tip-custom-container");
let submitButton = document.querySelector("#tip-calculate");

// set an onchange function for showing or hide custom tip input
for (let tip of tipOptions) {
	tip.addEventListener("change", function () {
		if (tip.value === "custom") {
			customTipContainer.classList.remove("hide");
		} else {
			customTipContainer.classList.add("hide");
		}
	});
}

submitButton.addEventListener("click", function () {
	// verify that inputs have values
	if (!amount.value || !people.value) {
		alert("Please fill out all fields");
		return;
	}

	// verify if tip is selected
	let checkedTip;
	for (let tip of tipOptions) {
		if (tip.checked) {
			checkedTip = tip.value;
			break;
		}
	}
	// if no tip is selected, check if custom tip is filled out
	if (!checkedTip) {
		alert(
			"Please select a tip percentage, select Skip or add an amount in dollars or select Skip."
		);
		return;
	}

	// calculate tip
	let tipAmount =
		// if custom tip is selected or skip, use custom tip value that can also be $0
		checkedTip === "custom" || checkedTip === "skip"
			? Number(customTip.value)
			: (amount.value * checkedTip) / 100;

	// calculate total amount and amount per person
	let total = Number(amount.value) + tipAmount;
	let perPerson = total / people.value;

	// display results
	document.querySelector("#total-output").innerHTML =
		"Total: " + formatter.format(total);
	document.querySelector("#per-person-output").innerHTML =
		"Por persona: " + formatter.format(perPerson);
});

// function to format currency
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD"
});
