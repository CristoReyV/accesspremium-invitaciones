import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, fireEvent, screen, act } from "@testing-library/react";
import WeddingCreamSkyblue from "./WeddingCreamSkyblue";
import styles from "./WeddingCreamSkyblue.module.css";

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

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


describe("one-shot invitation reveals", () => {
  it("unobserves revealed blocks and immediately exposes all content when reduced motion changes", () => {
    let notify: IntersectionObserverCallback;
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    });
    let motionChanged: () => void;
    const motion = { matches: false, addEventListener: vi.fn((_event, callback) => { motionChanged = callback; }), removeEventListener: vi.fn() };
    vi.stubGlobal("matchMedia", () => motion);
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    const { container, unmount } = render(<WeddingCreamSkyblue />);
    fireEvent.click(screen.getByRole("button", { name: /Abrir invitación/ }));
    const blocks = Array.from(container.querySelectorAll("[data-reveal]"));
    expect(blocks.length).toBeGreaterThan(0);
    expect(blocks.every(block => block.classList.contains(styles.revealPending))).toBe(true);
    act(() => notify([{ target: blocks[0], isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(unobserve).toHaveBeenCalledWith(blocks[0]);
    expect(blocks[0]).toHaveClass(styles.revealVisible);
    act(() => notify([{ target: blocks[0], isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(unobserve).toHaveBeenCalledTimes(1);
    motion.matches = true;
    act(() => motionChanged());
    expect(disconnect).toHaveBeenCalled();
    expect(blocks.every(block => !block.classList.contains(styles.revealPending))).toBe(true);
    unmount();
    expect(motion.removeEventListener).toHaveBeenCalledWith("change", motionChanged);
  });
});
