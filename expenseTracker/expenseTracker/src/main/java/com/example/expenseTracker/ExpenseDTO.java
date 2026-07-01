package com.example.expenseTracker;

import java.time.LocalTime;

public class ExpenseDTO {

    private int id;
    private String type;
    private String category;
    private String title;
    private String description;
    private double amount;
//    private LocalTime date;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

//    public LocalTime getDate() {
//        return date;
//    }
//
//    public void setDate(LocalTime date) {
//        this.date = date;
//    }




}
