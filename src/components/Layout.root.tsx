import { graphql } from "gatsby";
import * as React from "react";
import { AiFillFilePdf, AiOutlineLink, AiOutlineGithub } from "react-icons/ai";
import createSlug from "../utils/createSlug";
import Search from "./Search";
import Sidebar from "./Sidebar";
import { StaticQuery } from "gatsby";
import { FaBars } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";

export default function LayoutRoot({ sidebarRoot, children, mdx }: {
    sidebarRoot: string;
    children: React.ReactNode;
    mdx: any;
}) {
    let [headlines, setHeadlines] = React.useState<any[]>([]);
    let tableOfContentsRef = React.useRef(null);
    let [currentHeading, setCurrentHeading] = React.useState<any>(null);
    let [isShowSidebar, setIsShowSidebar] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (mdx) {
            let headlinesArr: any[] = [];
            let headings = document.querySelectorAll(".mdx-body h1, .mdx-body h2, .mdx-body h3, .mdx-body h4, .mdx-body h5, .mdx-body h6");
            headings.forEach((heading: any) => {
                let slug = createSlug(heading.innerText);
                heading.id = slug;

                headlinesArr.push({
                    level: heading.tagName.toLowerCase(),
                    text: heading.innerText,
                    slug: slug
                });
            });
            setHeadlines(headlinesArr);
        }
    }, [mdx]);

    React.useEffect(() => {
        if (mdx) {
            const Scroll = () => {
                let headings = document.querySelectorAll(".mdx-body h1, .mdx-body h2, .mdx-body h3, .mdx-body h4, .mdx-body h5, .mdx-body h6");
                let currentHeading = null;
                headings.forEach((heading: any) => {
                    if (heading.offsetTop - 100 <= window.scrollY) {
                        currentHeading = heading;
                    }
                });
                setCurrentHeading(currentHeading);
            };

            window.addEventListener("scroll", Scroll);
            return () => {
                window.removeEventListener("scroll", Scroll);
            };
        }
    }, [mdx]);

    React.useEffect(() => {
        if (mdx) {
            let codeBlocks = document.querySelectorAll(".mdx-body pre");
            codeBlocks.forEach((codeBlock: any) => {
                let code = codeBlock.querySelector("code");
                if (!code) return;
                let codeText = code.innerText;
                codeBlock.classList.add("relative", "group");
                let copyButton = document.createElement("button");
                copyButton.className = "opacity-0 group-hover:opacity-100 hover:bg-zinc-500/10 absolute right-2 top-6 bg-zinc-500/5 text-white px-2 py-1 rounded-lg cursor-pointer transition-all duration-200";
                copyButton.innerText = "Copy";
                copyButton.addEventListener("click", () => {
                    navigator.clipboard.writeText(codeText);
                    copyButton.innerText = "Copied!";
                    setTimeout(() => {
                        copyButton.innerText = "Copy";
                    }, 1000);
                });
                if (codeBlock.querySelector("button")) codeBlock.querySelector("button").remove();
                codeBlock.appendChild(copyButton);
            });
        }
    }, [mdx]);

    return (
        <div className="h-full w-full container">
            <div className="flex h-full lg:p-6">
                <Sidebar currentRoot={sidebarRoot} setIsShowSidebar={setIsShowSidebar} isShowSidebar={isShowSidebar} />
                <div className="min-w-screen w-full">
                    <div className="w-full lg:block hidden">
                        <Search />
                    </div>
                    <div className="flex flex-col w-full lg:hidden w-full mb-6 sticky top-0 bg-dark-1">
                        <div className="flex justify-between items-center gap-4 p-6 border-b border-dark-1">
                            <div className="flex items-center gap-4">
                                <p className="text-white text-xl font-bold">vCodes</p>
                            </div>
                            <div className="flex items-center cursor-pointer">
                                <HiMenuAlt1 className="text-white" size={24} onClick={() => setIsShowSidebar(true)} />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 lg:p-0 h-full">
                        {mdx && (
                            <div className="pb-8 mb-6">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-2xl font-bold text-white">{mdx.frontmatter.title}</h1>
                                </div>
                                <p className="text-gray-400">{mdx.frontmatter.description}</p>
                            </div>
                        )}
                        <div className="flex justify-between min-w-screen w-full h-full gap-24">
                            <div className="mt-4 w-full h-full mdx-body">
                                {children}
                            </div>
                            {mdx && (
                                <div className="hidden lg:block h-full flex-shrink-0 p-4 w-56">
                                    <div className="sticky top-6 left-0 space-y-2">
                                        <button
                                            className="text-white hover:opacity-70 cursor-pointer transition-all duration-200 flex items-center gap-2"
                                            onClick={e => {
                                                navigator.clipboard.writeText(window.location.href);
                                                let text: any = e.currentTarget.querySelector("p");

                                                text.innerText = "Copied!";
                                                setTimeout(() => {
                                                    text.innerText = "Copy Link";
                                                }, 1000);
                                            }}
                                        >

                                            <AiOutlineLink size={24} />
                                            <p className="text-sm">Copy Link</p>
                                        </button>
                                        {headlines && (
                                            <div className="pt-6">
                                                <h1 className="text-sm font-semibold text-gray-400 uppercase">On this page</h1>
                                                <div className="mt-2 flex flex-col gap-1" ref={tableOfContentsRef}>
                                                    {headlines.map((item: any) => {
                                                        return (
                                                            <button
                                                                className="text-white hover:opacity-70 cursor-pointer transition-all duration-200 flex items-center gap-2"
                                                                onClick={() => {
                                                                    const element = document.getElementById(item.slug);
                                                                    if (element) {
                                                                        element.scrollIntoView({
                                                                            behavior: "smooth",
                                                                            block: "start",
                                                                            inline: "nearest"
                                                                        });

                                                                        window.history.pushState({}, "", `#${item.slug}`);
                                                                    }
                                                                }}
                                                            >
                                                                <p
                                                                    className={`text-sm ${currentHeading && currentHeading.id === item.slug ? "font-bold text-violet-600 whitespace-nowrap" : ""}`}
                                                                    style={{
                                                                        marginLeft: `${(parseInt(item.level.replace("h", "")) - 1) * 10}px`
                                                                    }}
                                                                >
                                                                    {item.text}
                                                                </p>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        <StaticQuery
                                            query={graphql`
                                            query {
                                                site {
                                                        siteMetadata {
                                                            siteUrl
                                                        }
                                                }
                                            }
                                        `}
                                            render={(data: any) => (
                                                <a
                                                    className="pt-6 text-white hover:opacity-70 cursor-pointer transition-all duration-200 flex items-center gap-2"
                                                    /* https://github.com/VoidDevsorg/mongoose-backup/blob/main/dist/src/index.js */
                                                    href={`${data.site.siteMetadata.siteUrl}/blob/main/content${mdx.frontmatter.root}.mdx`}
                                                    target="_blank"
                                                >
                                                    <AiOutlineGithub size={24} />
                                                    <p className="text-sm">Edit on GitHub</p>
                                                </a>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
