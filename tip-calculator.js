let amount = document.querySelector("input#tip-amount");
let people = document.querySelector("#tip-people");
let tipOptions = document.querySelectorAll("#tip-percentage");
let customTip = document.querySelector("#tip-custom");
let customTipContainer = document.querySelector("#tip-custom-container");
let submitButton = document.querySelector("#tip-calculate");

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD"
});

// set an onchange function for tipOptions
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

	let checkedTip;

	for (let tip of tipOptions) {
		if (tip.checked) {
			checkedTip = tip.value;
			break;
		}
	}

	if (!checkedTip) {
		alert(
			"Please select a tip percentage, select Skip or add an amount in dollars or select Skip."
		);
		return;
	}

	// calculate tip
	let tipAmount =
		checkedTip === "custom" || checkedTip === "skip"
			? Number(customTip.value)
			: (amount.value * checkedTip) / 100;

	let total = Number(amount.value) + tipAmount;
	let perPerson = total / people.value;

	document.querySelector("#total-output").innerHTML =
		"Total: " + formatter.format(total);
	document.querySelector("#per-person-output").innerHTML =
		"Por persona: " + formatter.format(perPerson);
});
