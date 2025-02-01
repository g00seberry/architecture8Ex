import { getUserService } from "../service/UserService/UserService";

test("create, update and delete user", async () => {
  const userService = await getUserService();
  await userService.createUser({ login: "my-ass", password: "so-sweet" });
  const user = await userService.getUser("my-ass");
  expect(!!user).toEqual(true);
  await userService.updateUser({ login: "my-ass", password: "just-honey" });
  const user2 = await userService.getUser("my-ass");
  expect(user.password === user2.password).toEqual(false);
  await userService.deleteUser("my-ass");
  const user3 = await userService.getUser("my-ass");
  expect(!!user3).toEqual(false);
});
