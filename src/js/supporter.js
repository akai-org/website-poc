export class Supporter {
    constructor(parent) {
        this.parent = parent;
        this.partners = Array.from(this.parent.children);
        this.logos = null;
        this.elems = null;

        this.sponsorsDisplayed = 6;
        this.changetime = 10000;

        this.init();
        this.display();
        this.time = setInterval(function() {
            this.display();
        }.bind(this), this.changetime);
    }
    init() {
        this.logos = this.partners.map(p => p.src.replace(p.baseURI,''));
        this.parent.innerHTML = '';
        for (let i=0; i<this.sponsorsDisplayed; i++ ) {
            const img = document.createElement('img');
            img.classList.add('supporter-img');
            img.setAttribute('src',this.logos[i]);
            this.parent.appendChild(img);
        }
        this.elems = Array.from(this.parent.getElementsByTagName('img'));
    }
    changeSponsor(elem) {
        const nextIndex = (this.logos.indexOf(elem.getAttribute('src')) + this.sponsorsDisplayed)%this.logos.length;
        elem.classList.add('supporter-img-hidden');
        setTimeout(function() {
            elem.setAttribute('src',this.logos[nextIndex]);
            elem.classList.remove('supporter-img-hidden');
        }.bind(this), 750);
    }
    display() {
        for (let i=0; i<this.sponsorsDisplayed; i++) {
            setTimeout(function() {
                this.changeSponsor(this.elems[i]);
            }.bind(this), i*1500);
        }
    }
}