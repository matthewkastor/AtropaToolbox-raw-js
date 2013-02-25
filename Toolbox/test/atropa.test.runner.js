if(reportStyle === 'html') {
    atropa.test.functions.report = function(results) {
        function createTd(content) {
            var td = document.createElement('td');
            td.innerHTML = content;
            return td;
        }
        
        function createRow(status, test, notes) {
            var row = document.createElement('tr');
            row.appendChild(createTd(status));
            row.appendChild(createTd(test));
            row.appendChild(createTd(notes));
            row.setAttribute('class', status);
            return row;
        }
        
        var result = document.createElement('table');
        result.appendChild(createRow('Status', 'Test', 'Notes'));
        
        results.fail.forEach(function(item){
            result.appendChild(createRow('Fail', item[0], item[1]));
        });
        
        results.pass.forEach(function(item){
            result.appendChild(createRow('Pass', item[0], item[1]));
        });
        
        var resultDiv = document.getElementById('results');
        resultDiv.innerHTML = '';
        resultDiv.appendChild(result);
    };
} else {
    atropa.test.functions.startTests();
}


