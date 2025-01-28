/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ScoreBoard from "../src/components/ScoreBoard";

test("renders scoreboard component", () => {
  render(<ScoreBoard />);
  expect(screen.getByText(/Live Football Scoreboard/i)).toBeInTheDocument();
});
