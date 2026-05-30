package com.damini.expense.tracker.controller;

import com.damini.expense.tracker.entity.Expense;
import com.damini.expense.tracker.service.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@CrossOrigin("*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // GET all expenses
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // POST new expense
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    // DELETE expense
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    // UPDATE expense
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
            @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }
}