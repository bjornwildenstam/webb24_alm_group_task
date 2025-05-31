const { User } = require("../test-setup");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({ username: "testuser", email: "test@test.com" });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should validate email format", async () => {
    const user = User.build({ username: "testuser", email: "invalid-email" });
    expect(user.validate()).rejects.toThrow();
  });

  it("should not allow duplicate email addresses", async () => {
    expect.assertions(1);
    try {
      await User.create({ username: "user1", email: "duplicate@test.com" });
      await User.create({ username: "user2", email: "duplicate@test.com" });
    } catch (error) {
      expect(error.message).toMatch(/Validation error/);
    }
  });

  it("should not allow null username", async () => {
    expect.assertions(1);
    try {
      await User.create({ email: "nulluser@test.com" });
    } catch (error) {
      expect(error.message).toMatch(/notNull/);
    }
  });
});

