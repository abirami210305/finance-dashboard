import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import './App.css';

// Mock data
const mockTransactions = [
  { id: 1, date: '2024-01-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: 2, date: '2024-01-05', amount: -200, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2024-01-10', amount: -100, category: 'Utilities', type: 'expense' },
  { id: 4, date: '2024-01-15', amount: 3000, category: 'Freelance', type: 'income' },
  { id: 5, date: '2024-01-20', amount: -150, category: 'Entertainment', type: 'expense' },
  { id: 6, date: '2024-02-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: 7, date: '2024-02-05', amount: -250, category: 'Groceries', type: 'expense' },
  { id: 8, date: '2024-02-10', amount: -120, category: 'Utilities', type: 'expense' },
  { id: 9, date: '2024-02-15', amount: -300, category: 'Travel', type: 'expense' },
  { id: 10, date: '2024-02-20', amount: -200, category: 'Entertainment', type: 'expense' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('viewer'); // 'viewer' or 'admin'
  const [filter, setFilter] = useState({ category: '', type: '' });
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ date: '', amount: '', category: '', type: 'expense' });

  // Calculate summary
  const summary = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const balance = income - expenses;
    return { balance, income, expenses };
  }, [transactions]);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesCategory = !filter.category || t.category.toLowerCase().includes(filter.category.toLowerCase());
      const matchesType = !filter.type || t.type === filter.type;
      const matchesSearch = !search || t.category.toLowerCase().includes(search.toLowerCase()) || t.date.includes(search);
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [transactions, filter, search]);

  // Balance trend data
  const balanceTrend = useMemo(() => {
    const monthly = {};
    transactions.forEach(t => {
      const month = t.date.slice(0, 7); // YYYY-MM
      if (!monthly[month]) monthly[month] = 0;
      monthly[month] += t.amount;
    });
    return Object.entries(monthly).map(([month, change]) => ({ month, balance: change }));
  }, [transactions]);

  // Spending by category
  const spendingByCategory = useMemo(() => {
    const categories = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      if (!categories[t.category]) categories[t.category] = 0;
      categories[t.category] += Math.abs(t.amount);
    });
    return Object.entries(categories).map(([category, amount]) => ({ name: category, value: amount }));
  }, [transactions]);

  // Insights
  const insights = useMemo(() => {
    const highestSpending = spendingByCategory.reduce((max, cat) => cat.value > max.value ? cat : max, { value: 0 });
    const monthlyComparison = balanceTrend.length > 1 ? balanceTrend[balanceTrend.length - 1].balance - balanceTrend[balanceTrend.length - 2].balance : 0;
    return {
      highestSpending: highestSpending.name || 'None',
      monthlyComparison: monthlyComparison > 0 ? 'Increased' : monthlyComparison < 0 ? 'Decreased' : 'Same'
    };
  }, [spendingByCategory, balanceTrend]);

  const addTransaction = (newTrans) => {
    setTransactions([...transactions, { ...newTrans, id: Date.now() }]);
  };

  const editTransaction = (id, updated) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ date: new Date().toISOString().slice(0, 10), amount: '', category: '', type: 'expense' });
    setShowModal(true);
  };

  const openEditModal = (transaction) => {
    setEditingId(transaction.id);
    setFormData({
      date: transaction.date,
      amount: Math.abs(transaction.amount),
      category: transaction.category,
      type: transaction.type
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ date: '', amount: '', category: '', type: 'expense' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const amount = formData.type === 'income' ? parseFloat(formData.amount) : -parseFloat(formData.amount);
    
    if (editingId) {
      editTransaction(editingId, {
        date: formData.date,
        amount: amount,
        category: formData.category,
        type: formData.type
      });
    } else {
      addTransaction({
        date: formData.date,
        amount: amount,
        category: formData.category,
        type: formData.type
      });
    }
    closeModal();
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <h1 className="title-styled">
          <span className="icon-purse">📈</span>
          <span className="title-text">Finance</span>
          <span className="title-text">Dashboard</span>
         
        </h1>
        <div className="controls">
          <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="role-toggle">
            <label>Role: </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </header>

      <div className="dashboard">
        <div className="summary-cards">
          <div className="card balance-card">
            <h3><span className="card-icon">💰</span> Total Balance</h3>
            <p className="amount">${summary.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="card income-card">
            <h3><span className="card-icon">📈</span> Total Income</h3>
            <p className="amount">${summary.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="card expense-card">
            <h3><span className="card-icon">📉</span> Total Expenses</h3>
            <p className="amount">${summary.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="charts">
          <div className="chart">
            <h3>📊 Balance Trend</h3>
            <LineChart width={400} height={300} data={balanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#8884d8" />
            </LineChart>
          </div>
          <div className="chart">
            <h3>🍰 Spending Breakdown</h3>
            <PieChart width={400} height={300}>
              <Pie data={spendingByCategory} cx={200} cy={150} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {spendingByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>

      <div className="transactions">
        <h2>💳 Transactions</h2>
        <div className="filters">
          <input type="text" placeholder="Search by category or date" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
            <option value="">All Categories</option>
            {[...new Set(transactions.map(t => t.category))].map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {role === 'admin' && <button onClick={openAddModal} className="add-btn">➕ Add Transaction</button>}
        </div>
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📊</p>
            <p className="empty-title">No transactions found</p>
            <p className="empty-msg">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                {role === 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td className={t.type === 'income' ? 'income-amount' : 'expense-amount'}>${Math.abs(t.amount)}</td>
                  <td>{t.category}</td>
                  <td><span className={`badge ${t.type}`}>{t.type}</span></td>
                  {role === 'admin' && (
                    <td className="actions-cell">
                      <button onClick={() => openEditModal(t)} className="edit-btn">✏️ Edit</button>
                      <button onClick={() => setTransactions(transactions.filter(x => x.id !== t.id))} className="delete-btn">🗑️ Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="insights">
        <h2>📈 Insights</h2>
        {spendingByCategory.length === 0 ? (
          <p className="insight-item">No spending data available yet</p>
        ) : (
          <>
            <p className="insight-item">💰 <strong>Highest spending category:</strong> {insights.highestSpending}</p>
            <p className="insight-item">📊 <strong>Monthly balance:</strong> {insights.monthlyComparison}</p>
          </>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? '✏️ Edit Transaction' : '➕ Add New Transaction'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleFormSubmit} className="transaction-form">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Groceries"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={closeModal} className="btn-cancel">✕ Cancel</button>
                <button type="submit" className="btn-submit">{editingId ? '💾 Update' : '✅ Add'} Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
