const fs = require('fs');
const path = require('path');
 
exports.handler = async function() {
  try {
    const dataPath = path.join(__dirname, 'cdw_employee_database_1000.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const db = JSON.parse(jsonData);
    const activeHires = (db.employees || []).filter(emp => emp.status === 'Active');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activeHires)
    };
  } catch (err) {
    console.error('Error in newhireedb:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not process newhireedb' })
    };
  }
};  