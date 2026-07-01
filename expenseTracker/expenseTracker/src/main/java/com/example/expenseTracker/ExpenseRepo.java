package com.example.expenseTracker;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepo extends JpaRepository<Expense, Integer> {
}
