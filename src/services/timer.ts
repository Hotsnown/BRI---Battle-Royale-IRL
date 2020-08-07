export class Timer {
    radius:number
    private static instance: Timer;

    private constructor(radius = 140) {
        this.radius = radius
        this.start()
    }

    public static getInstance(): Timer {
        
        if (!Timer.instance) {
            Timer.instance = new Timer();
        }

        return Timer.instance;
    }

    start() {
        for(let i=0;i<1000;i++) //refactor to if this.radius > 10       
            {
            setTimeout(() => {                   
                this.radius -= 2.0833;
            },i* 5000);
        }
    }

    public read() {
        return this.radius
    }
}