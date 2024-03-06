// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
let totalSalary = 0; // variable for salary total
let numberOfEmployees = 0; // variable for number of employees

// Collect employee data
const collectEmployees = function() { //defining a variable. variable is a FUNCTION.
  let employeesArray = []; // defining a variable within function. variable is an ARRAY.

    let addingEmployees = true; // defining a variable within function. variable is a BOOLEAN.

    while (addingEmployees) { // begin WHILE loop when value for addingEmployees is true.
        const firstName = prompt("Enter the employee's first name:"); // defining a var within loop. user-defined value by way of PROMPT. expected value is a STRING.
        const lastName = prompt("Enter the employee's last name:"); // defining a var within loop. user-defined value by way of second PROMPT. expected value is a STRING.
        let salary;

        do {
          salary = prompt("Enter the employee's salary (numbers only):");
    
          if (isNaN(Number(salary))) {
            alert("Please enter a valid number for the salary.");
          }
        } while (isNaN(Number(salary)));

        const employee = { // defining a new variable within loop; variable is an OBJECT with three user-defined values.
            firstName: firstName, // user-defined STRING.
            lastName: lastName, // user-defined STRING.
            salary: parseFloat(salary) // user-defined NUMBER.
        };

        employeesArray.push(employee); // push employee object into employees ARRAY, which exists outside the present loop.
        totalSalary += employee.salary; // add employee salary to totalSalary
        numberOfEmployees++; // increment number of employees for averaging (later)

        const continueAdding = confirm("Do you want to add another employee?"); // following third prompt CONFIRM to continue or cancel.
        if (!continueAdding) { // begin if statement; if user chooses cancel...
            addingEmployees = false; // change value of addingEmployees to false, ending the loop.
        }
    }
    console.log("Number of employees:", employeesArray.length);
    return employeesArray; // return the employeesArray, so it can be added to table.
}

const displayAverageSalary = function() { // define value; value is a FUNCTION conditional upon employeesArray.
  const averageSalary = totalSalary / numberOfEmployees;
  console.log('Average Salary: ' + averageSalary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  }));
}

// Display random employee information
const getRandomEmployee = function(employeesArray) { // define variable getRandomEmployee. variable is a FUNCTION dependent on employeesArray.

  const randomIndex = Math.floor(Math.random() * employeesArray.length);  // generates a random index by multiplying the length of employee's array by a decimal between 0 and 1. Math floor then rounds the number down to the nearest integer.

  const randomEmployee = employeesArray[randomIndex]; // defines a variable by index number randomly generated in previous line.

  console.log('Random Employee:');
  console.log('First Name: ' + randomEmployee.firstName);
  console.log('Last Name: ' + randomEmployee.lastName);
  console.log('Salary: ' + randomEmployee.salary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD" // logs randomEmployee information, gathered by prompts, to the console.
  }));
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    const formattedSalary = '$' + numberWithCommas(currentEmployee.salary);
    salaryCell.textContent = formattedSalary;

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  displayAverageSalary();

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
