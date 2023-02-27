describe("Scooter", () => {
  describe("rent", () => {
    it("throws an error if scooter needs to charge", () => {
      const scooter = new Scooter();
      scooter.charge = 10;
      expect(() => {
        scooter.rent(new User());
      }).toThrow("scooter needs to charge");
    });

    it("throws an error if scooter needs repair", () => {
      const scooter = new Scooter();
      scooter.isBroken = true;
      expect(() => {
        scooter.rent(new User());
      }).toThrow("scooter needs repair");
    });

    it("rents the scooter to a user if it's not broken and has enough charge", () => {
      const scooter = new Scooter();
      const user = new User();
      expect(() => {
        scooter.rent(user);
      }).not.toThrow();
      expect(scooter.user).toBe(user);
    });
  });

  describe("dock", () => {
    it("updates the station and clears the user", () => {
      const scooter = new Scooter();
      const station = "station2";
      const user = new User();
      scooter.station = "station1";
      scooter.user = user;
      scooter.dock(station);
      expect(scooter.station).toBe(station);
      expect(scooter.user).toBeNull();
    });
  });

  describe("recharge", () => {
    it("fully charges the scooter", async () => {
      const scooter = new Scooter();
      scooter.charge = 50;
      await scooter.recharge();
      expect(scooter.charge).toBe(100);
    });
  });

  describe("requestRepair", () => {
    it("repairs the scooter after 5 seconds", async () => {
      const scooter = new Scooter();
      scooter.isBroken = true;
      await scooter.requestRepair();
      expect(scooter.isBroken).toBe(false);
    });
  });
});

