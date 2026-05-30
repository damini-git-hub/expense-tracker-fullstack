import { useState } from "react";
import axios from "axios";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      title,
      amount,
      category,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post("http://localhost:8080/expenses", newExpense);

      alert("Expense Added Successfully ✅");

      setTitle("");
      setAmount("");
      setCategory("");

      setTitle("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.error(error);
      alert("Error adding expense");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpense;