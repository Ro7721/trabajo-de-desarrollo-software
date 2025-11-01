function filterTable(){
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('usersTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const noResults = document.getElementById('noResults');
    let visibleRows =0;
    for(let i =0; i<rows.length; i++){
        const cells = rows[i].getElementsByTagName('td');
        let rowText = '';
        for (let j = 0; j < cells.length; j++) {
            rowText += cells[j].textContent.toLowerCase() + ' ';
        }
        rows[i].style.display = rowText.includes(filter) ? '' : 'none';
        if(rowText.includes(filter)){
            visibleRows++;
        }
    }
    noResults.style.display = visibleRows ===0 && filter ? 'block' : 'none';
}