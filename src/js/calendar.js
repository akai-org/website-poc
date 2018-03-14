export class Calendar {
    constructor(parent) {
        this.now = new Date();
        this.day = this.now.getDay();
        this.month = this.now.getMonth();
        this.year = this.now.getFullYear();

        this.parent = parent;
        this.container = null;

        this.highlighted = [
            {day: 1, desc: 'dzień pierwszy'},
            {day: 13, desc: 'dzień trzynasty'},
            {day: 17, desc: 'lorem ipsum'}
        ]

        this.init();
    }
    init() {
        this.container = document.createElement('div')
        this.container.className = 'calendar-container'
        this.parent.appendChild(this.container);
        this.genCalendar();
        this.bindEvents();
    }
    genCalendar() {
        // init table
        this.container.innerHTML = '';
        const table = document.createElement('table');
        table.classList.add('calendar-table');
        table.id = 'calendar-table';
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
        table.appendChild(tr);

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

            // create day element
            let td = document.createElement('td');
            td.innerHTML = i - firstMonthDay + 2;
            td.dayNr = i - firstMonthDay + 2;

            // add classes in order to style element properly
            td.classList.add('day');

            if (this.highlighted.map(elem => elem.day).includes(i - firstMonthDay + 2)) {
                td.classList.add('highlighted-day');
                td.setAttribute('title',this.highlighted.filter(elem => elem.day === i - firstMonthDay + 2)[0].desc);
            }

            if (this.year === this.now.getFullYear() && this.month == this.now.getMonth() && this.day === i-firstMonthDay+2)
                td.classList.add('current-day');

            tr.appendChild(td);
        }
    }
    bindEvents() {
        this.container.addEventListener('click', function(e) {
            if (e.target.tagName.toLowerCase() === 'td' && e.target.classList.contains('highlighted-day')) {
                // action
            }
        }.bind(this));
    }
}

