export class Slider {
    constructor(slider) {
        this.slider = slider;
        this.slides = Array.from(this.slider.children);
        this.currentSlide = 0;
        this.dots = [];
        this.time = null;
        this.pauseTime = 6000;
        
        this.createDots();
        this.changeSlide(this.currentSlide);
    }
    createDots() {
        const ulDots = document.createElement('ul');
        ulDots.classList.add('slider-dots');

        for (let i=0; i<this.slides.length; i++) {
            const li = document.createElement('li');
            li.classList.add('slider-dot');
            
            const button = document.createElement('button');
            button.classList.add('slider-dots-button');
            button.type = 'button';
            button.addEventListener('click', function() {
                this.changeSlide(i);
            }.bind(this));
            li.appendChild(button);
            ulDots.appendChild(li);
            this.dots.push(li);
        }
        this.slider.appendChild(ulDots);
    }
    changeSlide(index) {
        // set active slide
        this.slides.forEach(slide => {
            slide.classList.remove('slider-slide-active');
        });
        this.slides[index].classList.add('slider-slide-active');

        // update dots
        this.dots.forEach(dot => {
            dot.classList.remove('slider-dots-button-active');
        })
        this.dots[index].classList.add('slider-dots-button-active');

        // change background-image
        const images = [
            'https://images.pexels.com/photos/175274/pexels-photo-175274.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            'https://images.pexels.com/photos/808510/pexels-photo-808510.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            'https://images.pexels.com/photos/784927/pexels-photo-784927.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        ]
        this.slider.setAttribute('style', `background: url(${images[index]});background-size: cover; background-position: center center;`);
        
        // next slide event
        clearInterval(this.time);
        this.time = setTimeout(function() {
            this.currentSlide += 1;
            if (this.currentSlide > this.slides.length - 1)
                this.currentSlide = 0;
            this.changeSlide(this.currentSlide);
        }.bind(this), this.pauseTime);
    }
}