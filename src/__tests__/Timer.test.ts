import DeathTimer from '../Services/Timer';

jest.useFakeTimers();


it("should render 15 seconds", () => {
    const timer = new DeathTimer()
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    
    setTimeout(expect (timer).toBe("le joueur est mort"), 5)
    
})