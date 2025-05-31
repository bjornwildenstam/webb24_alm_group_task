const { User, Accommodation, sequelize } = require("../test-setup");

describe("Accommodation Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Rensa och skapa om databasen inför test
  });

  it("should create an accommodation with required fields", async () => {
    const user = await User.create({ username: "testuser", email: "test@example.com" });

    const accommodation = await Accommodation.create({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sverige",
      postalCode: "12345",
      rent: 12000,
      rooms: 3,
      userId: user.id
    });

    await accommodation.reload();

    expect(accommodation).toBeDefined();
    expect(accommodation.city).toBe("Stockholm");
    expect(accommodation.userId).toBe(user.id);
  });

  it("should not allow accommodation without required fields", async () => {
    const accommodation = Accommodation.build({
      city: "Göteborg" // saknar t.ex. address, country, rent, etc.
    });

    await expect(accommodation.validate()).rejects.toThrow();
  });
});