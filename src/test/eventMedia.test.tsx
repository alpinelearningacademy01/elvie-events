import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, test, vi } from "vitest";
import ElvieHero from "@/components/ElvieHero";
import Events from "@/pages/Events";
import { pressConferenceEvent, showMomentsVideo } from "@/data/eventVideos";

vi.mock("@/components/ElvieNavbar", () => ({ default: () => null }));
vi.mock("@/components/ElvieFooter", () => ({ default: () => null }));
vi.mock("@/components/ScrollToTop", () => ({ default: () => null }));

afterEach(() => vi.restoreAllMocks());

test("starts the hero with Show Moments and switches both ways", () => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  const { container } = render(<MemoryRouter><ElvieHero /></MemoryRouter>);
  const source = () => container.querySelector("video source");

  expect(source()).toHaveAttribute("src", showMomentsVideo.videoUrl);
  fireEvent.click(screen.getByRole("button", { name: "Next hero video" }));
  expect(source()).toHaveAttribute("src", "/hero-video.mp4");
  fireEvent.click(screen.getByRole("button", { name: "Previous hero video" }));
  expect(source()).toHaveAttribute("src", showMomentsVideo.videoUrl);
});

test("opens the second event with its own video, photos and gallery controls", async () => {
  render(<MemoryRouter initialEntries={["/events"]}><Events /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: /Get Get Aww/ })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("link", { name: pressConferenceEvent.title }));
  expect(screen.getByRole("heading", { name: pressConferenceEvent.title })).toBeInTheDocument();
  expect(await screen.findByLabelText(pressConferenceEvent.title)).toHaveAttribute("src", pressConferenceEvent.videoUrl);
  expect(screen.getAllByRole("img", { name: /^Press Conference \d+$/ })).toHaveLength(62);

  fireEvent.click(screen.getByRole("button", { name: "Videos" }));
  expect(screen.getByLabelText(pressConferenceEvent.title)).toBeInTheDocument();
  expect(screen.queryByRole("img", { name: "Press Conference 01" })).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Images" }));
  fireEvent.click(screen.getByRole("img", { name: "Press Conference 01" }));
  expect(screen.getByText("1 / 62")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Previous image" }));
  expect(screen.getByText("62 / 62")).toBeInTheDocument();
}, 15000);
