export interface BoulderBadgeProps {
  /** Image URL shown inside the badge (boulder cover or setter avatar). Optional: a neutral circle is shown when absent. */
  avatarUrl?: string;
  /**
   * Boulder grade (0–30). Determines the color of the active SVG dashes:
   * 0–5 yellow, 6–10 green, 11–15 blue, 16–20 red, 21–25 black, 26–30 purple.
   */
  grade: number;
}
