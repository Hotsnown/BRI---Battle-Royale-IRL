import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// On peut se passer d'un serveur :
//1) l'admin écrit la date du début dans la BDD
//2) tous les clients déduisent le rayon du cercle à partir de rayon initiale / temps écoulé

// On peut pas reset le timer pour une seconde game
class Timer {
    radius:number
    private static instance: Timer;

    private constructor(radius = 200) {
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
        for(let i=0;i<1000;i++)       
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



export const Starttimer = functions.https.onRequest((request, response) => {
    const data = JSON.stringify({"data":Timer.getInstance().read()})
    response.send(data);
});