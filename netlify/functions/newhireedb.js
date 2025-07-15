const fs = require('fs');
const path = require('path');

function isRecentHire(hireDateStr) {
  const hireDate = new Date(hireDateStr);
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return hireDate >= startOfLastMonth && hireDate <= now;
}

exports.handler = async function() {
  try {
    const dataPath = path.join(__dirname, 'cdw_employee_database_1000.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const db = JSON.parse(jsonData);
    const recentHires = (db.employees || []).filter(emp => isRecentHire(emp.hire_date));
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recentHires)
    };
  } catch (err) {
    console.error('Error in newhireedb:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not process newhireedb' })
    };
  }
}; 