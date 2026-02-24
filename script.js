let matrix = [];
let reducedRows = [];
let reducedCols = [];
let highlightedRows = [];
let highlightedCols = [];


function createDefaultMatrix() {
    const size = 3; 
    matrix = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.floor(Math.random() * 20) + 1)
    );

    highlightedRows = new Array(size).fill(false);
    highlightedCols = new Array(size).fill(false);
    reducedRows = new Array(size).fill(false);
    reducedCols = new Array(size).fill(false);
    renderMatrix();
}

function createRandomMatrixFromInput() {

    const size = Number(document.getElementById("matrix-size").value);
    if (size < 1 || size > 10) {
        alert("Matrix size must be between 1 and 10.");
        return;
    }
    matrix = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.floor(Math.random() * 20) + 1)
    );

    highlightedRows = new Array(size).fill(false);
    highlightedCols = new Array(size).fill(false);
    reducedRows = new Array(size).fill(false);
    reducedCols = new Array(size).fill(false);
    renderMatrix();
}

function createEmptyMatrixFromInput() {

    const size = Number(document.getElementById("matrix-size").value);
    if (size < 1 || size > 10) {
        alert("Matrix size must be between 1 and 10.");
        return;
    }
    matrix = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

    highlightedRows = new Array(size).fill(false);
    highlightedCols = new Array(size).fill(false);
    reducedRows = new Array(size).fill(false);
    reducedCols = new Array(size).fill(false);
    renderMatrix();
}

function renderMatrix() {
    const container = document.getElementById("matrix-container");
    container.innerHTML = "";

    const table = document.createElement("table");

    const headerRow = document.createElement("tr");


    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement("tr");

        if (highlightedRows[i]) {
            row.style.backgroundColor = "#fff3b0"; 
        }


        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement("td");
            if (highlightedCols[j]) {
            cell.style.backgroundColor = "#cce5ff"; 
            }

            const input = document.createElement("input");
            input.value = matrix[i][j];
            input.onchange = () => matrix[i][j] = Number(input.value);
            cell.appendChild(input);
            row.appendChild(cell);
        }

        const reductionCell = document.createElement("td");
        const reductionInput = document.createElement("input");
        reductionInput.placeholder = "Row min";
        reductionInput.id = `row-reduction-${i}`;
        reductionInput.disabled = reducedRows[i];
        reductionCell.appendChild(reductionInput);
        row.appendChild(reductionCell);

        const buttonCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Submit";
        button.disabled = reducedRows[i];
        button.onclick = () => applySingleRowReduction(i);
        buttonCell.appendChild(button);
        row.appendChild(buttonCell);

        const highlightCell = document.createElement("td");
        const highlightButton = document.createElement("button");
        highlightButton.textContent = highlightedRows[i] ? "Unhighlight" : "Highlight";
        highlightButton.onclick = () => toggleRowHighlight(i);
        highlightCell.appendChild(highlightButton);
        row.appendChild(highlightCell);

        table.appendChild(row);
    }
    
    const inputRow = document.createElement("tr");
        for (let j = 0; j < matrix[0].length; j++) {
            const colCell = document.createElement("td");
            const colInput = document.createElement("input");
            colInput.placeholder = "Col min";
            colInput.id = `col-reduction-${j}`;
            colInput.disabled = reducedCols[j];
            colCell.appendChild(colInput);
            inputRow.appendChild(colCell);
        }
        table.appendChild(inputRow);

        const buttonRow = document.createElement("tr");
        for (let j = 0; j < matrix[0].length; j++) {
            const buttonCell = document.createElement("td");
            const button = document.createElement("button");
            button.textContent = "Submit";
            button.disabled = reducedCols[j];
            button.onclick = () => applySingleColumnReduction(j);
            buttonCell.appendChild(button);
            buttonRow.appendChild(buttonCell);
        }
        table.appendChild(buttonRow);
    

    for (let j = 0; j < matrix[0].length; j++) {
        const headerCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = highlightedCols[j] ? "Unhighlight" : "Highlight";
        button.onclick = () => toggleColumnHighlight(j);
        headerCell.appendChild(button);
        headerRow.appendChild(headerCell);
    }

    table.appendChild(headerRow);

    container.appendChild(table);
}

function applySingleRowReduction(rowIndex) {

    if (reducedRows[rowIndex]) return;

    const studentValue = Number(document.getElementById(`row-reduction-${rowIndex}`).value);
    if (isNaN(studentValue)) { alert("Please enter a value."); return; }

    const actualMin = Math.min(...matrix[rowIndex]);
    if (studentValue !== actualMin) {
        alert(`Row ${rowIndex + 1} is incorrect. Try again.`);
        return;
    }

    for (let j = 0; j < matrix[rowIndex].length; j++) {
        matrix[rowIndex][j] -= studentValue;
    }

    renderMatrix();
}

function applySingleColumnReduction(colIndex) {

    if (reducedCols[colIndex]) return;

    const studentValue = Number(document.getElementById(`col-reduction-${colIndex}`).value);
    if (isNaN(studentValue)) { alert("Please enter a value."); return; }

    const columnValues = matrix.map(row => row[colIndex]);
    const actualMin = Math.min(...columnValues);
    if (studentValue !== actualMin) {
        alert(`Column ${colIndex + 1} is incorrect. Try again.`);
        return;
    }

    for (let i = 0; i < matrix.length; i++) {
        matrix[i][colIndex] -= studentValue;
    }

    renderMatrix();
}

function toggleRowHighlight(rowIndex) {
    highlightedRows[rowIndex] = !highlightedRows[rowIndex];
    renderMatrix();
}

function toggleColumnHighlight(colIndex) {
    highlightedCols[colIndex] = !highlightedCols[colIndex];
    renderMatrix();
}

window.onload = createDefaultMatrix;
