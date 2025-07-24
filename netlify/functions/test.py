import json
import csv
from datetime import datetime
import os

# Path to the JSON file
json_path = os.path.join(os.path.dirname(__file__), 'cdw_employee_database_1000.json')

# Fields to extract
fields = [
    'employee_id', 'name', 'country', 'city', 'department', 'hire_date', 'status',
    'terminationDate', 'ReportingManager', 'hiringManager', 'reason', 'contactnumber',
    'yrsof_experience', 'designation', 'payBand', 'skills', 'gender', 'dob', 'email'
]

# Helper to calculate age from dob (YYYY-MM-DD)
def calculate_age(dob):
    try:
        birth = datetime.strptime(dob, '%Y-%m-%d')
        today = datetime.today()
        return today.year - birth.year - ((today.month, today.day) < (birth.month, birth.day))
    except Exception:
        return None

# Helper to calculate experience at CDW from hire_date
def calculate_cdw_experience(hire_date):
    try:
        hire = datetime.strptime(hire_date, '%Y-%m-%d')
        today = datetime.today()
        return round((today - hire).days / 365.25, 2)
    except Exception:
        return None

# Read JSON data
with open(json_path, 'r') as f:
    data = json.load(f)

employees = data.get('employees', [])

output = []
for emp in employees:
    emp_out = {field: emp.get(field, None) for field in fields}
    # Age
    emp_out['age'] = calculate_age(emp.get('dob', '')) if emp.get('dob') else None
    # CDW experience
    emp_out['cdw_experience_years'] = calculate_cdw_experience(emp.get('hire_date', '')) if emp.get('hire_date') else None
    # Overall experience
    try:
        emp_out['overall_experience_years'] = float(emp.get('yrsof_experience')) if emp.get('yrsof_experience') else None
    except Exception:
        emp_out['overall_experience_years'] = None
    output.append(emp_out)

# Write to JSON
with open(os.path.join(os.path.dirname(__file__), 'employee_output.json'), 'w') as f:
    json.dump(output, f, indent=2)

# Write to CSV
csv_fields = fields + ['age', 'cdw_experience_years', 'overall_experience_years']
with open(os.path.join(os.path.dirname(__file__), 'employee_output.csv'), 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=csv_fields)
    writer.writeheader()
    for row in output:
        writer.writerow(row)

print('Extraction complete. Output written to employee_output.json and employee_output.csv.') 