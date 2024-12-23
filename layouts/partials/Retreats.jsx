import AnimatedText from "@components/AnimatedText";
import ReactPlayerWrapper from "@components/ReactPlayerWrapper";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import { useRef, useState } from "react";

const retreats = ({ retreats }) => {
  const { enable, title, subtitle, list } = retreats.frontmatter;
  const [activeListItem, setActiveListItem] = useState(list[0]);
  const largeScreenRef = useRef(null);

  return enable ? (
    <>
      <section
        id={retreats.slug}
        className="section bg-dark-primary py-24 overflow-hidden relative isolate scroll-mt-5"
      >
        <div className="container relative ">
          <div className="relative z-10 ">
            <div className="mb-20 text-center">
              <div data-aos="fade-up-sm">
                <AnimatedText
                  tag="h2"
                  className="mb-4 text-white font-semibold text-center lg:col-8 mx-auto"
                  content={title}
                />
              </div>
              {subtitle && (
                <div data-aos="fade-up-sm" data-aos-delay="100">
                  {markdownify(subtitle, "p", "text-light-secondary md:text-xl")}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-10" data-aos="fade-up-sm" data-aos-delay="100">
              {/* BIG SCREEN */}
              <div className="relative" ref={largeScreenRef}>
                <div className="bg-dark-quaternary rounded-2xl overflow-hidden">
                  <ReactPlayerWrapper
                    url={activeListItem.mediaLink_supports_youtube_vimeo}
                    playing={false}
                    customThumbnail={activeListItem.thumbnail}
                  />

                  <div className="py-6 px-8 ">
                    {markdownify(
                      activeListItem.title,
                      "h3",
                      "text-light-primary text-3xl tex font-medium leading-tight mb-4"
                    )}
                    {markdownify(activeListItem.description, "h3", "mb-4 text-base text-light-secondary font-normal  ")}
                  </div>
                </div>
              </div>
              {/* HORIZONTAL LIST */}
              <div className="flex gap-7 overflow-x-scroll pb-4">
                {list.length &&
                  list
                    .filter((item) => item.title !== activeListItem.title)
                    .map(
                      (item, index) =>
                        item.enable && (
                          <div
                            onClick={() => {
                              largeScreenRef.current.scrollIntoView({ behavior: "instant" });
                              // Add 40px offset after scrolling to the element
                              setTimeout(() => {
                                window.scrollBy({
                                  top: -100,
                                  behavior: "instant",
                                });
                              }, 0); // Small delay to ensure scrollIntoView completes
                              setActiveListItem(list.find((video) => video.title === item.title));
                            }}
                            key={item.title}
                            className="flex flex-col items-center cursor-pointer bg-dark-quaternary rounded-2xl min-w-[255px] overflow-hidden"
                            data-aos="fade-in"
                            data-aos-delay={index * 100}
                          >
                            {/* IMAGE */}
                            <div className="relative ">
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                width={200 * 2}
                                height={128 * 2}
                                className=" w-full object-cover aspect-square"
                              />
                              <div className="absolute inset-0 grid place-items-center">
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect width="32" height="32" rx="16" fill="#00B2F5" fillOpacity="0.7" />
                                  <path
                                    d="M13.5609 10.0611C13.5045 10.0218 13.4402 10.0007 13.3747 10C13.3091 9.99934 13.2446 10.0191 13.1876 10.0573C13.1306 10.0955 13.0833 10.1508 13.0503 10.2175C13.0174 10.2842 13 10.36 13 10.4372V20.5628C13 20.64 13.0174 20.7158 13.0503 20.7825C13.0833 20.8492 13.1306 20.9045 13.1876 20.9427C13.2446 20.9809 13.3091 21.0007 13.3747 21C13.4402 20.9993 13.5045 20.9782 13.5609 20.9389L20.8181 15.876C20.8735 15.8373 20.9194 15.7823 20.9513 15.7164C20.9832 15.6504 21 15.5759 21 15.5C21 15.4241 20.9832 15.3496 20.9513 15.2836C20.9194 15.2177 20.8735 15.1627 20.8181 15.124L13.5609 10.0611Z"
                                    fill="#FAFAFA"
                                    stroke="#FAFAFA"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            {/* CONTENT */}
                            <div className="p-4">
                              <p className="text-light-primary text-h6 font-medium  leading-tight text-center">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        )
                    )}
              </div>
            </div>
          </div>
          {/* Shapes */}
          <div className="absolute inset-0 -z-10">
            <img
              src="/images/chakra.svg"
              draggable="false"
              alt=""
              className="absolute w-[160px] xl:w-[260px] top-[15%] right-0 translate-x-[55%] rotate-45 z-10"
            />
            <img
              src="/images/chakra.svg"
              draggable="false"
              alt=""
              className="absolute w-[160px] xl:w-[260px] top-[35%] left-0 -translate-x-[55%] z-10 rotate-45"
            />
            <img
              src="/images/chakra.svg"
              draggable="false"
              alt=""
              className="absolute w-[60px] top-[5%] right-0 translate-x-[55%] z-10 rotate-45"
            />
            <img
              src="/images/chakra.svg"
              draggable="false"
              alt=""
              className="absolute w-[60px] top-[30%] left-0 -translate-x-[110%] z-10 rotate-45"
            />
          </div>
        </div>
      </section>
    </>
  ) : null;
};

export default retreats;
