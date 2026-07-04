document.getElementById('saveTransactionForm').addEventListener('submit', function(e){
    e.preventDefault();
    const isIncomeType = document.getElementById('income').ariaChecked;
    const type = isIncomeType ? 'Income' : 'Expense';
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
    fetch('/add-expense',{
        method: 'POST',
        header: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(expenseData)
    }).then(response => {
        if(response.ok){
            document.getElementById('alert').innerHTML = '<div class="alert alert-success">Data Save Successfully</div>';
        }
        else{
            document.getElementById('alert').innerHTML = '<div class="alert alert-danger">Something went to wrong.</div>';
        }
    });

});
