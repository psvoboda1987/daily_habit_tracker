window.onload = () => {

    setActualDate();

    showRecords();

    showStatistics();

    submitForm();

    initExpandRecords();
    
}

function setActualDate() {

    Date.prototype.toDateInputValue = (function() {

        let local = new Date(this);

        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());

        return local.toJSON().slice(0, 10);

    });

    let datePicker = document.getElementById('datepicker');

    let today = new Date().toDateInputValue();

    datePicker.value = today;

}

function showRecords() {

    let records = document.getElementById('records');
    if (! records) return;

    document.getElementById('records-submit').addEventListener('click', (e) => {

        e.preventDefault();

        postAjax('ajax/tracker.php', 'action=showRecords', (reply) => {

            records.innerHTML = reply;

        });

        initExpandRecords();

    });

}

function initExpandRecords() {

    let records = document.getElementById('records');
    if (! records) return;

    let expandButton = document.getElementById('expand');
    if (! expandButton) return;

    expandButton.addEventListener('click', (e) => {

        e.preventDefault();

        console.log('expand');

        if (! records.classList.contains('expanded')) {

            records.classList.add('expanded');

            expandButton.innerHTML = 'Reduce list';
            expandButton.classList.replace('bg-blue', 'bg-red');

        }
        else {

            records.classList.remove('expanded');

            expandButton.innerHTML = 'Expand list';
            expandButton.classList.replace('bg-red', 'bg-blue');

        }

    });

}

function showStatistics() {

    document.getElementById('statistics-submit').addEventListener('click', (e) => {

        e.preventDefault();

        postAjax('ajax/tracker.php', 'action=showStatistics', (reply) => {

            document.getElementById('statistics').innerHTML = reply;

        });

    });

}

function submitForm() {

    document.getElementById('habit-form').addEventListener('submit', (e) => {

        e.preventDefault();

        let form = document.getElementById('habit-form');
        let formData = new URLSearchParams(new FormData(form)).toString();

        postAjax(
            'ajax/save_records.php',

            formData,
            
            (reply) => {

                document.getElementById('habit_1').checked = false;
                document.getElementById('habit_2').checked = false;
                document.getElementById('habit_3').checked = false;

                console.log(reply);

                alert('Thanks. Data has been sent.');

            },

            () => {
                alert('Oh oh, there is some problem. Try again later.');
            }
        );


    });

}

function postAjax(url, data, success = null, fail = null) {

    let params = typeof data == 'string' ? data : Object.keys(data).map(
  
		function (k) {

            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])

        }

    ).join('&');

    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    xhr.open('POST', url, false);
    xhr.onreadystatechange = function () {

        if (this.status == 200) {
            if (typeof success !== 'function') return;
            success(xhr.responseText);
        }
        else {
            if (typeof fail !== 'function') return;
            fail();
        }

    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);

    return xhr;

}