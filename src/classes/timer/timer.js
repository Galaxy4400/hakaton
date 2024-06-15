export class Timer {
    constructor(time) {
        this.time = time;
        this.$element = document.createElement('span');
        this.$element.textContent = this.formatTime(this.time);

        this.setTimer();
    }

    formatTime(time) {
        return `00:${time < 10 ? '0' + time : time}`;
    }

    setTimer() {
        document.body.appendChild(this.$element);
    
        const timer = setInterval(() => {
            --this.time;
            this.$element.textContent = this.formatTime(this.time);

            if (this.time === 0) {
                this.$element.remove();
                clearInterval(timer);
            }
        }, 1000);
    }
}