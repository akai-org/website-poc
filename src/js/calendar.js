export class Calendar {
    constructor(parent) {
        this.now = new Date();
        this.day = this.now.getDay();
        this.month = this.now.getMonth();
        this.year = this.now.getFullYear();

        this.parent = parent;
        this.container = null;

        this.highlighted = [1,3,5];

        this.init();
    }
    init() {
        this.container = document.createElement('div')
        this.container.className = 'calendar-container'
        this.parent.appendChild(this.container);
        this.genCalendar();
    }
    genCalendar() {
        // init table
        this.container.innerHTML = '';
        const table = document.createElement('table');
        table.classList.add('calendar-table');
        this.container.appendChild(table);

        // gen day-names
        let tr = document.createElement('tr');
        tr.classList.add('calendar-table-day-names');
        const dayNames = ['pn','wt','śr','cz','pt','sb','n'];
        for (let day of dayNames) {
            let th = document.createElement('th');
            th.innerHTML = day;
            tr.appendChild(th);
        }

        // populate table with days
        const dayInMonth = new Date(this.year, this.month+1, 0).getDate();
        const tempDate = new Date(this.year, this.month, 1);
        let firstMonthDay = tempDate.getDay();

        if (firstMonthDay === 0)
            firstMonthDay = 7;

        const j = dayInMonth + firstMonthDay - 1;

        if (firstMonthDay-1 !== 0) {
            tr = document.createElement('tr');
            table.appendChild(tr);

            // create empty cells
            for (let i=0; i<firstMonthDay-1; i++) {
                const td = document.createElement('td');
                td.innerHTML = '';
                tr.appendChild(td);
            }
        }

        for (let i=firstMonthDay-1; i<j; i++) {
            // create tr when end of space
            if ((i%7) === 0) {
                tr = document.createElement('tr');
                table.appendChild(tr);
            }

            let td = document.createElement('td');
            td.innerHTML = i - firstMonthDay + 2;
            td.dayNr = i - firstMonthDay + 2;

            if (this.highlighted.includes(i - firstMonthDay + 2))
                td.classList.add('highlighted-day');

            td.classList.add('day');

            if (this.year === this.now.getFullYear() && this.month == this.now.getMonth() && this.day === i-firstMonthDay+2)
                td.classList.add('current-day');

            tr.appendChild(td);
        }
    }
    bindEvents() {
        this.container.addEventListener('onmouseover', function(e) {
            if (e.target.tagName.toLower() === 'td' && e.target.clasList.contains('day')) {
                //action
            }
        }.bind(this));
    }
}

