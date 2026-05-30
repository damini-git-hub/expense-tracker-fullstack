package com.damini.expense.tracker.service;

import com.damini.expense.tracker.entity.Expense;
import com.damini.expense.tracker.repository.ExpenseRepository;
import com.damini.expense.tracker.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Get all expenses
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Add expense
    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Delete expense
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {

    Expense existingExpense = expenseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
    existingExpense.setTitle(updatedExpense.getTitle());
    existingExpense.setAmount(updatedExpense.getAmount());
    existingExpense.setCategory(updatedExpense.getCategory());
    existingExpense.setDate(updatedExpense.getDate());

    return expenseRepository.save(existingExpense);
}
}
