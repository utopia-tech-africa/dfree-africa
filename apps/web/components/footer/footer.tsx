import { footerItems } from "../../lib/footer-items";
import { ComponentLayout } from "../component-layout";
import { LogoWhite } from "../dfree-logo";

const { footerAbout, footerPillars, getInvolved, connectWithUs } = footerItems;

const Footer = () => {
  return (
    <ComponentLayout className="bg-primary-500 text-neutral-100">
      <footer className="flex justify-between items-center gap-4">
        <LogoWhite />
        <ul className="border border-red-700">
          <h4>About</h4>
          {footerAbout.map((about, idx) => (
            <li key={idx}>{about}</li>
          ))}
        </ul>

        <ul className="border border-red-700">
          <h4>Our pillars</h4>
          {footerPillars.map((pillar, idx) => (
            <li key={idx}>{pillar}</li>
          ))}
        </ul>

        <ul className="border border-red-700">
          <h4>Get Involved</h4>
          {getInvolved.map(
            (involve, idx) => involve && <li key={idx}>{involve}</li>,
          )}
        </ul>

        <ul className="border border-red-700">
          <h4>Connect with us</h4>
          {connectWithUs.map((connect, idx) => (
            <ul className="flex gap-4" key={idx}>
              {connect.icons?.map((Icon, iconIdx) => (
                <Icon key={iconIdx} size={18} />
              ))}

              {connect.text && <li>{connect.text}</li>}
            </ul>
          ))}
        </ul>
      </footer>
    </ComponentLayout>
  );
};

export default Footer;
