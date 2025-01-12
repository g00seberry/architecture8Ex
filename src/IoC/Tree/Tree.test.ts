import { Tree } from "./Tree";

test("Tree create", async () => {
  const tree = new Tree<number>(1, 1);
  expect(tree).toEqual({
    root: { key: 1, data: 1, children: [] },
  });
});

test("Tree add", async () => {
  const tree = new Tree<number>(1, 1);
  tree.add(1, 2, 2);
  expect(tree).toEqual({
    root: { key: 1, data: 1, children: [{ key: 2, data: 2, children: [] }] },
  });
});

test("Tree add-remove", async () => {
  const tree = new Tree<number>(1, 1);
  tree.add(1, 2, 2);
  tree.remove(2);
  expect(tree).toEqual({
    root: { key: 1, data: 1, children: [] },
  });
});

test("Tree add-remove root", async () => {
  const tree = new Tree<number>(1, 1);
  tree.add(1, 2, 2);
  tree.remove(1);
  expect(tree).toEqual({
    root: null,
  });
});
