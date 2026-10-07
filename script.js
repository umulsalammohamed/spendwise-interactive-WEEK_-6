// Requirement 2: Work with Multiple Records - Use arrays
let expenses = [];
let totalBudget = 0;

// DOM Elements
const budgetInput = document.getElementById('budgetInput');
const setBudgetBtn = document.getElementById('setBudgetBtn');
const totalBudgetEl = document.getElementById('totalBudget');
const totalSpentEl = document.getElementById('totalSpent');
const balanceEl = document.getElementById('balance');
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const statusMessage = document.getElementById('statusMessage');
const budgetFeedback = document.getElementById('budgetFeedback');

// Requirement 5: Handle User Interactions - Event Listeners
setBudgetBtn.addEventListener('click', setBudget);
expenseForm.addEventListener('submit', addExpense);
document.getElementById('clearBtn').addEventListener('click', clearAll);

// Requirement 1: Implement Decision Making - Conditionals
function setBudget() {
    const budget = parseFloat(budgetInput.value);
    
    if (isNaN(budget) || budget <= 0) {
        budgetFeedback.textContent = "Please enter a valid budget amount.";
        budgetFeedback.style.color = "red";
        return;
    } else if (budget < 1000) {
        budgetFeedback.textContent = "Budget is very low. Are you sure?";
        budgetFeedback.style.color = "orange";
    } else {
        budgetFeedback.textContent = `Budget set to KES ${budget}`;
        budgetFeedback.style.color = "green";
    }

    totalBudget = budget;
    updateDashboard();
}

function addExpense(e) {
    e.preventDefault();
    
    const name = document.getElementById('expenseName').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    if (amount <= 0) {
        alert("Amount must be greater than 0");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense); // Adding to array
    expenseForm.reset();
    updateDashboard();
    renderExpenses();
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    renderExpenses();
    updateDashboard();
}

function clearAll() {
    if (confirm("Clear all expenses?")) {
        expenses = [];
        renderExpenses();
        updateDashboard();
    }
}

// Requirement 3: Process Data with Loops
function calculateTotalSpent() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    return total;
}

// Requirement 4: Update Dashboard Dynamically - DOM Manipulation
function updateDashboard() {
    const totalSpent = calculateTotalSpent();
    const balance = totalBudget - totalSpent;

    totalBudgetEl.textContent = `KES ${totalBudget}`;
    totalSpentEl.textContent = `KES ${totalSpent}`;
    balanceEl.textContent = `KES ${balance}`;

    // Requirement 1 continued: Conditional feedback based on budget scenarios
    if (totalBudget === 0) {
        statusMessage.textContent = "Please set your budget to start tracking.";
        statusMessage.className = "status info";
    } else if (balance < 0) {
        statusMessage.textContent = `Over budget by KES ${Math.abs(balance)}! You need to cut expenses.`;
        statusMessage.className = "status warning";
    } else if (balance < totalBudget * 0.2) {
        statusMessage.textContent = `Warning: You have less than 20% of your budget left (KES ${balance}).`;
        statusMessage.className = "status info";
    } else {
        statusMessage.textContent = `Great job! You are within budget. Balance: KES ${balance}`;
        statusMessage.className = "status success";
    }
}

function renderExpenses() {
    expenseList.innerHTML = "";
    
    // Loop through array to display
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${expense.name}</td>
            <td>${expense.category}</td>
            <td>KES ${expense.amount}</td>
            <td><button onclick="deleteExpense(${expense.id})" style="background:red;padding:5px 10px;">Delete</button></td>
        `;
        expenseList.appendChild(row);
    });
}

// Initial load
updateDashboard();