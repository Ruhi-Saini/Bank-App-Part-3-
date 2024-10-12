const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

let transactions = [];

function updateUI() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, amount) => acc + amount, 0);
    const incomeAmount = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0);
    const expenseAmount = amounts.filter(item => item < 0).reduce((acc, item) => acc + Math.abs(item), 0);

    balance.innerText = `₹${total.toFixed(2)}`;
    income.innerText = `₹${incomeAmount.toFixed(2)}`;
    expense.innerText = `₹${expenseAmount.toFixed(2)}`;
}

function addTransaction(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amountValue = +document.getElementById('amount').value;
    const transactionType = document.querySelector('input[name="type"]:checked').value;

    // If expense, make the amount negative
    const amount = transactionType === 'expense' ? -amountValue : amountValue;

    const transaction = { description, amount };

    transactions.push(transaction);
    updateUI();
    updateTransactionList();
}

function updateTransactionList() {
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `${transaction.description} <span>₹${transaction.amount}</span>`;
        transactionList.appendChild(li);
    });
}

transactionForm.addEventListener('submit', addTransaction);
