# SpendWise - Interactive Budgeting App

## What improvements were made this week
Previously SpendWise was static HTML/CSS. This week I made it fully interactive:
- User can set a monthly budget dynamically
- User can add/delete multiple expenses
- Dashboard updates in real-time showing Total Budget, Total Spent, and Balance
- Status feedback warns user about over-spending
- Responsive layout

## How conditionals are used in the project
1. Budget validation: `if (budget <=0)` invalid, `else if (budget < 1000)` low warning, `else` success.
2. Budgeting scenarios: If balance < 0 -> over budget warning, else if balance < 20% of budget -> low balance warning, else -> success message.
3. Form validation for amount <=0.

## How arrays are used to store data
`let expenses = []` stores all expense objects. Each expense is an object `{id, name, amount, category}`. We use `push()` to add, `filter()` to delete, and store multiple records instead of individual variables.

## How the DOM is updated
Using `document.getElementById()` and `textContent` / `innerHTML`. 
- `updateDashboard()` updates the three cards.
- `renderExpenses()` clears tbody and recreates rows with `createElement` and `appendChild` for each expense in the array.

## How user interactions are handled through events
- `setBudgetBtn.addEventListener('click', setBudget)` for setting budget
- `expenseForm.addEventListener('submit', addExpense)` for adding expense
- `clearBtn.addEventListener('click', clearAll)` for clearing
- Inline `onclick="deleteExpense(id)"` for delete buttons

## Any challenges encountered and how they were resolved
- Challenge: Expenses were not persisting on screen. Solution: Created separate `renderExpenses()` function that loops through array each time.
- Challenge: Balance showing NaN when budget not set. Solution: Added condition to check if totalBudget === 0 before calculations.
- Challenge: Form refreshing page on submit. Solution: Used `e.preventDefault()` in the submit handler.

## How to Run
Open index.html in browser. No build needed.