// Prevent user from typing 'e', 'E', or other characters like '+' and '-'
document.querySelectorAll('input[type="number"]').forEach(function (input) {
  input.addEventListener("keydown", function (event) {
    if (event.key === "e" || event.key === "E" || event.key === "+" || event.key === "-") {
      event.preventDefault();
    }
  });


  input.addEventListener('blur', function () {
    formatToTwoDecimal(input);
  });

  input.addEventListener('wheel', function (event) {
    event.preventDefault(); // prevent scroll changing the value
  });




});

// Form submit calculations

document.getElementById('hraForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent page refresh on submit

    // Get values
    const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
    const daReceived = parseFloat(document.getElementById('daReceived').value) || 0;
    const hraReceived = parseFloat(document.getElementById('hraReceived').value) || 0;
    const rentPaid = parseFloat(document.getElementById('rentPaid').value) || 0;
    const cityType = document.getElementById('cityType').value;

    // Calculate salary (basic + DA)
    const salary = basicSalary + daReceived;

    // Calculate 50% or 40% of salary depending on city type
    let cityPercentage = cityType === "metro" ? 0.5 : 0.4;
    const percentageOfSalary = salary * cityPercentage;

    // Calculate (Rent Paid - 10% of salary)
    const rentMinusTenPercentSalary = rentPaid - (0.10 * salary);

    // Find minimum of three amounts
    const hraExemption = Math.min(hraReceived, percentageOfSalary, rentMinusTenPercentSalary);

    // Ensure hraExemption is not negative
    const finalHraExemption = hraExemption > 0 ? hraExemption : 0;

    // Calculate taxable HRA (HRA Received - Exempted Amount)
    const taxableHRA = hraReceived - finalHraExemption;

    // Show result
    document.getElementById('result').innerHTML = `
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Exempted House Rent Allowance:</h4>
        <p>₹ ${finalHraExemption.toFixed(2)}</p>
        <h4 class="alert-heading">Taxable House Rent Allowance:</h4>
        <p>₹ ${taxableHRA.toFixed(2)}</p>
      </div>
    `;
});


// Function to format the value to 2 decimal places
function formatToTwoDecimal(input) {
  let value = parseFloat(input.value);
  if (!isNaN(value)) {
      input.value = value.toFixed(2);
  }
}

