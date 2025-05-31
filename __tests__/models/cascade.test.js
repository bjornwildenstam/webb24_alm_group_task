const { sequelize, User, Accommodation } = require("../test-setup");

describe("Cascade delete", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should delete accommodations when user is deleted", async () => {
    const user = await User.create({ username: "deleteuser", email: "delete@test.com" });

    await Accommodation.create({
      address: "Testgatan 10",
      city: "Malmö",
      country: "Sverige",
      postalCode: "12345",
      rent: 9000,
      rooms: 2,
      userId: user.id
    });

    await user.destroy();

    const accommodations = await Accommodation.findAll({ where: { userId: user.id } });
    expect(accommodations.length).toBe(0);
  });
});