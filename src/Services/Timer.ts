function delay(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
}
class Timer {
    constructor(public counter = 3) {
        this.doTimer();
    }
    async doTimer() {
        for (let i = 0; i < this.counter; i++) {
            await delay(1000);
            this.counter = this.counter - 1;
            console.log(this.counter);
            if (this.counter == 0) {
                return "le joueur est mort"
            }
        }
    }
}

export default Timer