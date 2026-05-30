import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const totalExpense = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const categoryData = [];

    expenses.forEach((expense) => {
        const existingCategory = categoryData.find(
            (item) => item.name === expense.category
        );

        if (existingCategory) {
            existingCategory.value += expense.amount;
        } else {
            categoryData.push({
                name: expense.category,
                value: expense.amount,
            });
        }
    });

    const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b"];
    const filteredExpenses =
        selectedCategory === "All"
            ? expenses
            : expenses.filter(
                (expense) => expense.category === selectedCategory
            );

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/expenses");
            setExpenses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error(error);
        }
    };

    const updateExpense = async (expense) => {
        const updatedTitle = prompt("Enter new title", expense.title);

        if (!updatedTitle) return;

        try {
            await axios.put(`http://localhost:8080/expenses/${expense.id}`, {
                ...expense,
                title: updatedTitle,
            });

            fetchExpenses();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Expense List</h2>

            <h3>Total Expenses: ₹{totalExpense}</h3>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 rounded-lg mb-4"
            >
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
            </select>

            <PieChart width={400} height={300}>
                <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {categoryData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Tooltip />
                <Legend />
            </PieChart>

            {filteredExpenses.map((expense) => (
                <div key={expense.id} className="expense-card">
                    <h3>{expense.title}</h3>

                    <p>
                        <strong>Amount:</strong> ₹{expense.amount}
                    </p>

                    <p>
                        <strong>Category:</strong> {expense.category}
                    </p>

                    <button onClick={() => deleteExpense(expense.id)}>
                        Delete
                    </button>

                    <button onClick={() => updateExpense(expense)}>
                        Update
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;