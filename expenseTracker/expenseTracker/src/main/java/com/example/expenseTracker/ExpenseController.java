package com.example.expenseTracker;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
public class ExpenseController {
//  Constructor Injection or @Autowired annotation used
    private final ExpenseRepo expenseRepo;

    public ExpenseController(ExpenseRepo expenseRepo) {
        this.expenseRepo = expenseRepo;
    }

    @GetMapping("/get-expense")
    public List<Expense> getExpense(){
        return expenseRepo.findAll();
    }

    @PostMapping("/add-expense")
    public String addExpense(@RequestBody ExpenseDTO expenseDTO){
        //Entity Object
        Expense expense = new Expense();
//        expense.setId(expenseDTO.getId());
        expense.setType(expenseDTO.getType());
        expense.setCategory(expenseDTO.getCategory());
        expense.setTitle(expenseDTO.getTitle());
        expense.setDescription(expenseDTO.getDescription());
        expense.setAmount(expenseDTO.getAmount());
        expense.setDate(expenseDTO.getDate());

        // Save Repo - Entity pass
        expenseRepo.save(expense);

        return "Data Stored Successfully";

    }

    @PutMapping("/update-expense")
    public String updateExpense(@RequestBody ExpenseDTO expenseDTO){

//        Value Check in Repo
        Expense expenseData = expenseRepo.findById(expenseDTO.getId()).orElseThrow(()->new RuntimeException("No Data Found"));

        expenseData.setType(expenseDTO.getType());
        expenseData.setCategory(expenseDTO.getCategory());
        expenseData.setTitle(expenseDTO.getTitle());
        expenseData.setDescription(expenseDTO.getDescription());
        expenseData.setAmount(expenseDTO.getAmount());
        expenseData.setDate(expenseDTO.getDate());

        // Save Repo - Entity pass
        expenseRepo.save(expenseData);

        return "Data Update Successfully";

    }
    @DeleteMapping("delete-expense")
    public String deleteExpense(@RequestBody ExpenseDTO expenseDTO){

        Expense expenseData = expenseRepo.findById(expenseDTO.getId()).orElseThrow(()->new RuntimeException("No Data found"));
        expenseRepo.delete(expenseData);
        return "Data Deleted Successfully";
    }
}
