import { footerItems } from "@/constants/footer-items";
import ComponentLayout from "../component-layout";
import { DfreeLogoWhite } from "@/assets/svg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const { footerAbout, footerPillars, getInvolved, connectWithUs } = footerItems;

const Footer = () => {
  return (
    <ComponentLayout className="bg-primary-500 mt-20 lg:mt-30 text-neutral-100">
      <footer className="py-12 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr_1fr_1fr_1fr]">
          <div className="h-7.25 md:h-11.25 w-fit object-cover">
            <DfreeLogoWhite />
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">About</h4>
            <div className="flex flex-col gap-4 text-sm lg:text-base">
              {footerAbout.map((item, i) => (
                <a href="" key={i}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Our pillars</h4>
            <div className="flex flex-col gap-4 text-sm lg:text-base md:text-nowrap">
              {footerPillars.map((item, i) => (
                <a href="" key={i}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">Get involved</h4>
            <div className="flex flex-col gap-4 text-sm lg:text-base">
              {getInvolved.map(
                (item, i) =>
                  item && (
                    <a href="" key={i}>
                      {item}
                    </a>
                  ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h4 className="text-lg font-bold">Connect with us</h4>

              {connectWithUs.map((connect, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {connect.icons?.map((Icon) => (
                    <a href="" key={Icon.displayName || Icon.name}>
                      <Icon size={20} />
                    </a>
                  ))}
                  {connect.text && (
                    <span className="text-sm lg:text-base">{connect.text}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-lg hidden md:block font-bold">
                Subscribe to newsletter
              </h4>
              <h4 className="text-lg block md:hidden font-bold">Subscribe</h4>

              <p className="block md:hidden font-poppins text-sm leading-[120%] text-neutral-100">
                Stay connected with our latest updates and transformative work
              </p>

              <div className="flex items-center gap-3 md:gap-4 w-full">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  className="w-fit md:flex-1 border border-neutral-100 bg-transparent px-2 md:px-5 py-6 rounded-[100px] placeholder:text-neutral-300 placeholder:text-sm focus:outline-none
               md:w-auto"
                />

                <Button
                  className="font-bold py-6 rouned-[100px]"
                  variant={"secondary"}
                >
                  Submit
                </Button>
              </div>

              <p className="text-xs text-neutral-200">
                By subscribing, you agree to our privacy policy
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <hr className="border-white" />
        </div>

        <div className="mt-6 flex gap-6 flex-col md:flex-row md:items-center justify-center text-sm">
          <span className="text-center">
            © 2024 DFREE® Foundation. All rights reserved.
          </span>

          <div className="flex gap-3 items-center justify-center md:gap-8 underline text-xs">
            <a href="" className="cursor-pointer text-nowrap">
              Privacy policy
            </a>
            <a href="" className="cursor-pointer text-nowrap">
              Terms of service
            </a>
            <a href="" className="cursor-pointer text-nowrap">
              Cookies settings
            </a>
          </div>
        </div>
      </footer>
    </ComponentLayout>
  );
};

export default Footer;
