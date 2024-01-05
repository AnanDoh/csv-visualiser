let dropArea = document.getElementById('dropArea');

dropArea.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    let file = event.dataTransfer.files[0];
    processCSV(file);
});

function processCSV(file) {
    let reader = new FileReader();
    reader.onload = (event) => {
        let data = event.target.result;
        let parsedData = parseCSV(data);
        displayData(parsedData);
    };
    reader.readAsText(file);
}

function parseCSV(data) {
    let rows = data.split("\n").map(row => row.split(","));
    let maxLength = rows.reduce((max, row) => Math.max(max, row.length), 0);
    return rows.map(row => {
        while (row.length < maxLength) row.push('');
        return row;
    });
}

function displayData(data) {
    $('#dataTable').DataTable({
        data: data.slice(1),
        columns: data[0].map(header => ({ title: header })),
        destroy: true
    });
}
