import type { ReactElement } from "react";
import { render } from "react-email";

/** Renders a React Email component to an HTML string for Amazon SES. */
export async function renderEmail(element: ReactElement): Promise<string> {
  return render(element);
}
