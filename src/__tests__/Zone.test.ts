'use strict';
import Zone from "../Services/Zone"

jest.useFakeTimers();

it("should", () => {
    const zone = new Zone(500)
    zone.computeRadius()
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
})