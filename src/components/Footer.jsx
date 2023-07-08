import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from "react-icons/fa";
import logo from "../images/logo.png";
const Footer = () => {
  return (
    <footer class="bg-black">
      <div class="container px-6 py-8 mx-auto">
        <div class="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <h3 class="text-xl font-bold text-white leading-[110%]">Company</h3>

            <div class="flex flex-col items-start mt-4 space-y-4">
              <a
                href="/"
                class="text-[#5F5F5F] font-sans font-normal leading-[170%] text-lg transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Team
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                About Us
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Request a quote
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Referral
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Career
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold text-white leading-[110%]">
              Resource
            </h3>

            <div class="flex flex-col items-start mt-4 space-y-4">
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Solidity Shield
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Audit Process
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Our Services
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Privacy Policy
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Workplace Policy
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Our Mission & Core values
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold text-white leading-[110%]">
              Products{" "}
            </h3>

            <div class="flex flex-col items-start mt-4 space-y-4">
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Search
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Rewards
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Wallet
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Firewall + VPN
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Talk
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                News
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Playlist
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                All features
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold text-white leading-[110%]">
              Participate
            </h3>

            <div class="flex flex-col items-start mt-4 space-y-4">
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Community
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Contributors
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Events
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Newsletters
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold text-white leading-[110%]">Explore</h3>

            <div class="flex flex-col items-start mt-4 space-y-4">
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Tokens
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Apps & Services
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Wallets
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Interchain security
              </a>
              <a
                href="/"
                class="text-[#5F5F5F] transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 hover:underline hover:text-blue-600"
              >
                Blog
              </a>
            </div>
          </div>
        </div>

        <hr class="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div class="flex flex-col items-center justify-between sm:flex-row px-[10px] ">
          <div className="pl-[50px] sm:py-[20px]">
            <img src={logo} alt="logo" />
          </div>
          <div className="flex items-center space-x-4 sm:py-[20px] text-white">
            <a
              href="/terms"
              className="text-gray-300 px-[20px] hover:text-blue-600 transition-colors duration-200"
            >
              Terms of Condition
            </a>{" "}
            |
            <a
              href="/privacy"
              className="text-gray-300 px-[20px] hover:text-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </a>{" "}
            |
            <a
              href="/litepaper"
              className="text-gray-300 hover:text-blue-600 transition-colors duration-200"
            >
              Lite Paper
            </a>
          </div>
          <div className="flex items-center justify-center pr-[50px] space-x-4 sm:justify-end">
            <a
              href="https://www.facebook.com"
              className="text-gray-300 hover:text-blue-600 transition-colors duration-200"
            >
              <FaFacebook className="w-[30px] h-[30px]" />
            </a>
            <a
              href="https://www.twitter.com"
              className="text-gray-300 hover:text-blue-600 transition-colors duration-200"
            >
              <FaTwitter className="w-[30px] h-[30px]" />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-gray-300 hover:text-blue-600 transition-colors duration-200"
            >
              <FaInstagram className="w-[30px] h-[30px]" />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-gray-300 hover:text-blue-600 transition-colors duration-200"
            >
              <FaTelegram className="w-[30px] h-[30px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
