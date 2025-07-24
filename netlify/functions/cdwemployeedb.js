const fs = require('fs');
const path = require('path');
//skills,terminationDate,ReportingManager,hiringManager,reason,contactnumber,yrsof_experience,designation,payBand
exports.handler = async function() {
  try {
    const dataPath = path.join(__dirname, 'cdw_employee_database_1000.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: jsonData
    };
  } catch (err) {
    console.error('Error reading cdw_employee_database_1000.json:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not read cdw_employee_database_1000.json' })
    };
  }
};