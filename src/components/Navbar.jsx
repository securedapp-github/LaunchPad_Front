"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../logo.png";

const navigation = [
  { name: "Solidity Shield Scan", href: "#" },
  { name: "Our Services", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
  { name: "Blog", href: "#" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="z-[23432423423] ">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8 border-b-2 border-gray-500"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <div className="flex ml-3">
                <img className="h-16 w-auto" src={Logo} alt="" />
              </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-10  lg:flex-1 lg:justify-end lg:mr-7">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[16px] font-normal text-center font-sans whitespace-nowrap leading-6 pt-4 w-max  text-gray-100"
              >
                {item.name}
                {/* <span className="flex flex-wrap px-4"> </span> */}
              </a>
            ))}
            <a
              href="/"
              className="text-sm font-semibold leading-6 text-gray-200"
            >
              <button className="border border-[2px] bg-[#000000]  rounded-full shadow-lg	hover:bg-[#640074] border-white py-2 px-[30px] whitespace-nowrap ">
                Request a quote
              </button>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 bg-black z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <div className="flex">
                  <img className="h-16 w-auto" src={Logo} alt="" />
                </div>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className="h-12 w-17 border rounded-xl p-2 border-white"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-7 flow-root">
              <div className="-my-6 divide-y gray-100/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-7 py-2 text-base font-semibold font-sans leading-7 text-gray-100 hover:bg-gray-800"
                    >
                      <span> {item.name}</span>
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                  >
                    <button className="border  rounded-xl	 border-white p-3 ">
                      Request a quote
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}

export default Navbar;
