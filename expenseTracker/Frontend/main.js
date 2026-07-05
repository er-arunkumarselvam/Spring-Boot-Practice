document.getElementById('saveTransactionForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const isIncomeType = document.getElementById('income').checked;
    const type = isIncomeType ? 'income' : 'expense';
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    // json data
    const expenseData = {
        type,
        title,
        category,
        description,
        amount,
        date
    };

    console.log(expenseData);
    // post mapping
    fetch('http://localhost:8080/add-expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
    }).then(response => {
        if (response.ok) {
            response.text().then(data => {
                document.getElementById('alert').innerHTML = '<div class="alert alert-success alert-dismissable fade show d-flex justify-content-between align-items-center" role="alert"><p>' + data + '</p><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
            });
            var modelEl = document.getElementById('transactionForm');
            var modalClose = bootstrap.Modal.getInstance(modelEl);
            modalClose.hide();
            getData();
        }
        else {
            document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissable fade show d-flex justify-content-between align-items-center"  role="alert"><p>Something went to wrong.</p><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        }

    });


}

);

function getData() {
    fetch('http://localhost:8080/get-expense', {
        method: 'GET',
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                let tableData = document.getElementById("expenseData");
                tableData.innerHTML = "";
                let totalExpense = 0;
                let totalIncome = 0;
                console.log(data);
                data.forEach(item => {
                    let row = document.createElement("tr");
                    row.className = "border-bottom";
                    row.innerHTML = `
                    <td class="py-3 text-muted">${item.date}</td>
                    ${item.type === 'income' ? `<td class="py-3"><span
                                    class="badge bg-success-subtle text-success px-2.5 py-1.5 fw-semibold">Income</span>
                            </td>` : `<td class="py-3"><span
                                    class="badge bg-danger-subtle text-danger px-2.5 py-1.5 fw-semibold">Expense</span>
                            </td>`}
                            <td class="py-3 fw-semibold text-dark">${item.title}</td>
                            <td class="py-3"><span
                                    class="badge bg-light text-dark border fw-normal px-2.5 py-1.5">${item.category}</span></td>
                                    <td class="py-3 text-muted">${item.description}</td>
                                    ${item.type === 'income' ? `<td class="py-3 fw-bold text-success text-end">+₹${item.amount}</td>` : `<td class="py-3 fw-bold text-danger text-end">₹${item.amount}</td>`}
                                    <td class="text-center">
                                        <button class="btn btn-warning btn-sm"
                                            onclick='openEditModal(${JSON.stringify(item)})'>
                                            Edit
                                        </button>

                                        <button class="btn btn-danger btn-sm"
                                            onclick='deleteExpense(${JSON.stringify(item)})'>
                                            Delete
                                        </button>
                                    </td>
                                 
                    `;
                    tableData.appendChild(row);
                    if (item.type === "income") {
                        totalIncome += Number(item.amount);
                    } else {
                        totalExpense += Number(item.amount);
                    }
                })

                document.getElementById("totalExpense").innerHTML = "₹ " + totalExpense;
                document.getElementById("totalIncome").innerHTML = "₹ " + totalIncome;
                document.getElementById("balanceAmount").innerHTML = "₹ " + (totalIncome - totalExpense);
            })
        } else {
            let row = document.createElement("tr");
            row.className = "border-bottom";
            row.innerHTML = `<td class="py-3 text-muted">NO data found</td>`
        }

    })
}
let editingExpense = null;
function openEditModal(expenseData) {
    editingExpense = expenseData;
    if (expenseData.type === 'income') {
        document.getElementById('income').checked = true;
    } else {
        document.getElementById('income').checked = false;
    }
    document.getElementById('title').value = expenseData.title || '';
    document.getElementById('category').value = expenseData.category || '';
    document.getElementById('description').value = expenseData.description || '';
    document.getElementById('amount').value = expenseData.amount || '';
    document.getElementById('date').value = expenseData.date || '';
    document.querySelector('#transactionForm .modal-title').textContent = 'Edit Transaction';
    const submitButton = document.querySelector('#transactionForm .btn-primary');
    submitButton.textContent = 'Update Transaction';
    var modelEl = document.getElementById('transactionForm');
    var modal = new bootstrap.Modal(modelEl);
    modal.show();
}
document.getElementById('saveTransactionForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const isIncomeType = document.getElementById('income').checked;
    const type = isIncomeType ? 'income' : 'expense';
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const expenseData = {
        id,
        type,
        title,
        category,
        description,
        amount,
        date
    };
    if (editingExpense && editingExpense.id) { 
        console.log(expenseData);
        expenseData.id = editingExpense.id;
            fetch('http://localhost:8080/update-expense', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData)
            }).then(response => {
                if (response.ok) {
                    response.text().then(data => {
                        document.getElementById('alert').innerHTML = '<div class="alert alert-success alert-dismissable fade show d-flex justify-content-between align-items-center" role="alert"><p>' + data + '</p><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
                    });
                    var modelEl = document.getElementById('transactionForm');
                    var modalClose = bootstrap.Modal.getInstance(modelEl);
                    modalClose.hide();
                    getData();
                    editingExpense = null;
                    document.querySelector('#transactionForm .modal-title').textContent = 'Add Transaction';
                    document.querySelector('#transactionForm .btn-primary').textContent = 'Save Transaction';
                } else {
                    document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissable fade show d-flex justify-content-between align-items-center"  role="alert"><p>Something went wrong.</p><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
                }
            });
        }
});
function deleteExpense(expenseData) {
        fetch(`http://localhost:8080/delete-expense`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseData)
        }).then(response => {
            if (response.ok) {
                response.text().then(data => {
                    document.getElementById('alert').innerHTML = '<div class="alert alert-success alert-dismissable fade show d-flex justify-content-between align-items-center" role="alert"><p>' + data + '</p><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
                });
                getData();
            }
        });
}
function refreshData() {
    getData();
}

document.getElementById('transactionForm').addEventListener('hidden.bs.modal', function () {
    editingExpense = null;
    document.querySelector('#transactionForm .modal-title').textContent = 'Add Transaction';
    document.querySelector('#transactionForm .btn-primary').textContent = 'Save Transaction';
    document.getElementById('saveTransactionForm').reset();
});
window.addEventListener('DOMContentLoaded', getData);