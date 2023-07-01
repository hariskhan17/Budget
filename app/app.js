var myMonthlyBudget = 0;
var expenses = [];

function addBudget() {
  var budgetVal = Number(document.getElementById("m-budget").value);
  console.log(budgetVal)
  if (typeof budgetVal === "number"  && budgetVal > 0) {
    myMonthlyBudget = budgetVal;
    updateRemainingBudget();
  } else {
    alert("Enter Valid Value");
  }
}

function addExpense() {
  var description = document.getElementById("e-description").value;
  var amount = Number(document.getElementById("e-amount").value);
  var date = document.getElementById("e-date").value;

  if (description !== "" && typeof amount === "number" && amount > 0 && date !== "") {
    expenses.push({ description:description, amount:amount, date:date });
    updateExpenseList();
    updateRemainingBudget();
  } else {
    alert("Enter Valid Details");
  }
}

function updateExpenseList() {
  var table = document.getElementsByTagName("table")[0];
  console.log(table)
  table.innerHTML =
    "<tr><th>Description</th><th>Amount</th><th>Date</th><th>Action</th></tr>";

  for (var i = 0; i < expenses.length; i++) {
    var description = expenses[i].description;
    var amount = expenses[i].amount;
    var date = expenses[i].date;
    var row = document.createElement("tr");
    row.innerHTML = `<td>${description}</td><td>$${amount}</td><td>${date}</td><td class="none"><button onclick="editExpense(${i})">..</button><button class="none" onclick="removeExpense(${i})">X</button></td>`;
    table.appendChild(row);
  }
}
function editExpense(index) {
  var expense = expenses[index];

  // Prompt the user to enter the updated expense details
  var description = prompt(
    "Enter the updated description:",
    expense.description
  );
  var amount = parseFloat(
    prompt("Enter the updated amount:", expense.amount)
  );
  var date = prompt("Enter the updated date:", expense.date);

  // Update the expense object with the new values
  if (description !== null && !isNaN(amount) && date !== null) {
    expense.description = description.trim();
    expense.amount = amount;
    expense.date = date;
    updateExpenseList();
    updateRemainingBudget();
  } else {
    alert("Invalid expense details. Please check your inputs.");
  }
}

function updateRemainingBudget() {
  var remainingBudget = myMonthlyBudget - getTotalExpenses();
  document.getElementById(
    "remaining-budget-value"
  ).textContent = '$'+remainingBudget;
}

function getTotalExpenses() {
  var totalExpense = 0;
  if(expenses.length === 0){
    return totalExpense
  }else{
    for(var i = 0; i< expenses.length; i++){
      console.log(expenses[i])
      totalExpense += expenses[i].amount
    }
    return totalExpense
  }

}

function removeExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  updateRemainingBudget();
}
