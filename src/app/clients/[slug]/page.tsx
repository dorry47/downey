'use client';
import { useEffect } from 'react';
import QuickLink from '../../../../components/Slug/QuickLink';
import quickLinks from '../../../data/quickLinks.json';
import useAuthMiddleware from '../../../.././middleware/authMiddleware';

type Props = {};

const page = (props: Props) => {
  useAuthMiddleware();

  return (
    <div>
      <header
        className="bg-center bg-cover"
        style={{
          backgroundImage:
            'url(https://planning.downeystreetevents.com/assets/client-banner-10-956d8de47062998b50be5d42950573275481b0b2aac7e841228e2807f50a3aee.jpg)',
        }}>
        <div className="max-w-7xl sm:px-6 lg:px-8 p-4 mx-auto text-white">
          <div className="md:items-center md:py-16 md:border-none border-[rgba(238,217,212)] grid grid-cols-12 gap-6 py-8 text-center border">
            <div className="md:col-span-3 md:order-1 order-2 col-span-6">
              <h1 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                404 Days
              </h1>
              <h2 className="text-xxs tracking-extrawide font-normal uppercase">
                until the big day
              </h2>
            </div>
            <div className="md:col-span-6 md:py-16 md:border border-[rgba(238,217,212)] md:order-2 order-1 col-span-12 mx-8 border-b border-solid">
              <h1 className="font-display text-3xl font-normal leading-tight tracking-widest uppercase">
                Lauren + John
              </h1>
              <h2 className="font-display tracking-extrawide lining-nums pt-2 pb-4 text-base font-normal leading-tight uppercase">
                August 17, 2024
              </h2>
            </div>
            <div className="md:col-span-3 order-3 col-span-6">
              <h1 className="font-display tracking-extrawide text-base font-normal leading-tight uppercase">
                Cavallo Point Lodge
              </h1>
              <h2 className="font-cursive -rotate-6 text-lg tracking-wider transform">
                Sausalito, California
              </h2>
            </div>
          </div>
        </div>
      </header>

      <section className="sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="sm:grid-cols-3 md:grid-cols-4 sm:gap-6 sm:py-10 grid grid-cols-2 gap-2 py-4 text-center">
          {quickLinks.map((quickLink, id) => {
            const { title, subtitle, href, imageSrc, active } = quickLink;
            return (
              <QuickLink
                key={id}
                title={title}
                subtitle={subtitle}
                href={href}
                imageSrc={imageSrc}
                active={active}
              />
            );
          })}
          {/* <div className="col-span-1 mb-4">
            <a href="/questionnaires/1133">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-catering-6d23d10a8ddc68d520a15e6501c827ef59eee6bc0c58d2ae45d94ff4ee559c82.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                let’s begin
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                catering
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="/questionnaires/1134">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-design-ebbb76f48a19ab32aeb1153bf733153f9548fa4508b3bf5adbc99aedcc71621f.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                let’s begin
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                design
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="/questionnaires/1135">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-guest-services-4910571cbc35824ce55b9a35dc65c747075a9f90e08e5221526910ac27226098.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                let’s begin
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                guest services
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="/questionnaires/1136">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-music-632ee7f94323f19d42d8114587f299b005af2ac37528649ed3902c6ee5bfa2d5.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                let’s begin
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                music
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="https://docs.google.com/spreadsheets/d/1UlJPaWHgCAgrYf5WysDXkBQad9ZFeL0OR8H2xFByFoE/edit#gid=2050384383">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-workflow-876008c04fd9a05369403931d1f98581dbdc5e59dcb2f95663c119ea06583d31.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                quick link
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Workflow
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="https://docs.google.com/spreadsheets/d/1UlJPaWHgCAgrYf5WysDXkBQad9ZFeL0OR8H2xFByFoE/edit#gid=2050384383">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-design-boards-b654ab511128f8d2d5e1ccdfd11dbd75e1481504bebddca7386d6e48a5fcd3ff.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase"></h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Design Boards<br></br>+ Documents
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="https://docs.google.com/spreadsheets/d/1UlJPaWHgCAgrYf5WysDXkBQad9ZFeL0OR8H2xFByFoE/edit#gid=2050384383">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-guest-info-13c02750042e6c063ff507db7ffb81f9d80ee59313265a6b5577013f0d841927.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase"></h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Guest<br></br>Information
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="https://docs.google.com/spreadsheets/d/1UlJPaWHgCAgrYf5WysDXkBQad9ZFeL0OR8H2xFByFoE/edit#gid=2050384383">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-budget-431e9344d92f7b3f09a021e3994b9c2741cac36a39307918d9027bc231f19c3f.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                quick link
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Budget
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="https://docs.google.com/spreadsheets/d/1UlJPaWHgCAgrYf5WysDXkBQad9ZFeL0OR8H2xFByFoE/edit#gid=2050384383">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-vendor-proposals-cc4fde94fac5e778974ef9e7b264635998aa76d4f0b36e59c49bacec3536b16e.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                quick link
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Vendor Proposals<br></br>+ Contracts
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="https://docs.google.com/spreadsheets/d/1UlJPaWHgCAgrYf5WysDXkBQad9ZFeL0OR8H2xFByFoE/edit#gid=2050384383">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-client-docs-d88146af2b20b22d2fb32d7be105230dc8e084e12d367496819579c23f6fc265.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase"></h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Client<br></br>Documents
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="https://docs.google.com/spreadsheets/d/1UlJPaWHgCAgrYf5WysDXkBQad9ZFeL0OR8H2xFByFoE/edit#gid=2050384383">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-address-b2590d86b5351a64f12b3208f18f922f87f008f17fc41f2a331185308ff7b5cf.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                quick link
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Address Book
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="/test-and-test2/agreement">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-contract-a9fcbfb3031a0db20c866b4504ae5d490e826b081565befb1f68429229cd59f9.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
                quick link
              </h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Contract
              </h2>
            </a>
          </div>

          <div className="col-span-1 mb-4">
            <a href="https://docs.google.com/spreadsheets/d/1UlJPaWHgCAgrYf5WysDXkBQad9ZFeL0OR8H2xFByFoE/edit#gid=2050384383">
              <img
                className="md:w-11/12 w-10/12 mx-auto"
                src="/assets/icon-vendor-contact-075a66f4760539b887b8b3898072522c270c148dd2ddfeb3a3fdc57d2abbd200.jpg"></img>
              <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase"></h4>
              <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
                Vendor Contact +<br></br>Payment Log
              </h2>
            </a>
          </div> */}
        </div>
      </section>

      <section className="bg-[rgba(238,217,212)]">
        <div className="sm:px-6 lg:px-8 md:py-10 max-w-6xl px-4 py-6 mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="md:col-span-2 col-span-3 font-serif text-left">
              <h4 className="text-left text-[rgba(217,142,72)] pt-3 mb-1 font-sans font-normal uppercase text-xxs tracking-extrawide">
                couple's details
              </h4>
              <div className="grid grid-cols-2">
                <div className="md:col-span-1 col-span-2 pb-6">
                  <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                    test testt
                  </h2>
                  <p className="lining-nums mb-1 font-serif">t. </p>
                  <p className="mb-1 font-serif">
                    kelsey@downeystreetevents.com
                  </p>
                  <p className="lining-nums pt-2 font-serif leading-relaxed">
                    <br></br>
                    <br></br>,{' '}
                  </p>
                </div>
                <div className="col-span-1">
                  <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                    test2 test22
                  </h2>
                  <p className="lining-nums mb-1 font-serif">t. </p>
                  <p className="mb-1 font-serif"></p>
                  <p className="lining-nums pt-2 font-serif leading-relaxed">
                    <br></br>
                    <br></br>,{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 col-span-3 text-left">
              <h4 className="text-left text-[rgba(217,142,72)] pt-3 mb-1 font-sans font-normal uppercase text-xxs tracking-extrawide">
                planner's details
              </h4>
              <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                Kelsey Connely
              </h2>
              <p className="lining-nums mb-1 font-serif">t. 724.877.6966</p>
              <p className="mb-1 font-serif">kelsey@downeystreetevents.com</p>
              <p className="lining-nums pt-2 font-serif leading-relaxed">
                3366 Sacramento Street<br></br>
                Attn: Kelsey Connely<br></br>
                San Francisco, CA 90001
              </p>
            </div>
            <div className="col-span-3">
              <a href="/test-and-test2/edit">
                <h4 className="text-xxs tracking-extrawide pt-3 mb-1 font-sans font-normal text-black uppercase">
                  edit event details
                </h4>
              </a>{' '}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
