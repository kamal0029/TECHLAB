const fs = require('fs');
const path = require('path');

exports.handler = async function() {
  try {
    const dataPath = path.join(__dirname, 'cdw_employee_database_1000.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const db = JSON.parse(jsonData);
    const terminated = (db.employees || []).filter(emp => emp.status === 'Terminated');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(terminated)
    };
  } catch (err) {
    console.error('Error in attritiondb:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not process attritiondb' })
    };
  }
}; 