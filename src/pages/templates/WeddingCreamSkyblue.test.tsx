import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import WeddingCreamSkyblue from "./WeddingCreamSkyblue";
import styles from "./WeddingCreamSkyblue.module.css";

afterEach(cleanup);

describe("Ayde invitation scroll isolation", () => {
  it("restores document ancestors when leaving the invitation", () => {
    const root = document.createElement("div");
    root.id = "root";
    root.classList.add("existing-host-class");
    document.body.append(root);
    const { unmount } = render(<WeddingCreamSkyblue />, { container: root });
    for (const element of [document.documentElement, document.body, root]) {
      expect(element).toHaveClass(styles.scrollRoot);
    }
    unmount();
    for (const element of [document.documentElement, document.body, root]) {
      expect(element).not.toHaveClass(styles.scrollRoot);
    }
    expect(root).toHaveClass("existing-host-class");
    root.remove();
  });
});
