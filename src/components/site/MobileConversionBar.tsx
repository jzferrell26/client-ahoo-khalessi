import { Link } from "@tanstack/react-router";

export function MobileConversionBar() {
  return (
    <div className="ctc-mobile-conversion" aria-label="Quick contact options">
      <a href="tel:+19498777234">Call</a>
      <a href="sms:+19498777234">Text</a>
      <Link to="/get-my-options" className="primary">Get My Options</Link>
    </div>
  );
}
