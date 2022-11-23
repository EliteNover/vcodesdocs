import * as React from "react";
import { BiCommand, BiSearch } from "react-icons/bi";
import { AiFillControl } from "react-icons/ai";
import { TiTimes } from "react-icons/ti";
import { graphql, useStaticQuery, navigate } from "gatsby";

export default function Search() {
    let [focus, setFocus] = React.useState(false);
    let [isWindows, setIsWindows] = React.useState(false);
    let [search, setSearch] = React.useState("");
    let [results, setResults] = React.useState<any[]>([]);
    let ref = React.useRef<HTMLInputElement>(null);
    let modal = React.useRef<HTMLDivElement>(null);
    const data = (useStaticQuery(graphql`
        query {
            allMdx {
                nodes {
                    frontmatter {
                        title
                        root
                        sidebar {
                            label
                        }
                    }
                    body
                }
            }
        }
    `)).allMdx.nodes;

    React.useEffect(() => {
        setIsWindows(navigator.platform.indexOf("Win") > -1);
    }, []);

    React.useEffect(() => {
        if (focus) {
            ref.current?.focus();
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "auto";
        }
    }, [focus]);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                document.documentElement.style.overflow = "auto";
                setFocus(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    React.useEffect(() => {
        const ListenKeyup = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setFocus(false);
            } else if (e.key === "/") {
                e.preventDefault();
                setFocus(true);
            }
        };

        window.addEventListener("keyup", ListenKeyup);

        return () => {
            window.removeEventListener("keyup", ListenKeyup);
        };
    }, []);

    React.useEffect(() => {
        const ClickOutside = (e: MouseEvent) => {
            if (!modal.current?.contains(e.target as Node)) {
                if (focus) {
                    setFocus(false);
                }
            }

            return;
        };

        document.addEventListener("click", ClickOutside);

        return () => {
            document.removeEventListener("click", ClickOutside);
        }
    }, []);

    const Search = (query: string) => {
        setSearch(query);
        const results: any[] = data.map((e: any) => {
            try {
                return {
                    title: e.frontmatter.title,
                    sidebar: e.frontmatter.sidebar,
                    root: e.frontmatter.root,
                    related: e.body.split(/\r|\n/g).filter((e: string) => e.toLowerCase().includes(query.toLowerCase()))
                }
            } catch {
                return {
                    title: e.frontmatter.title,
                    related: []
                }
            }
        }).filter((e: any) => {
            return e.related !== null;
        });

        setResults(results.filter(e => e.related.length > 0));
    }

    return <>
        <button className="input-group cursor-pointer" isFocused={"false"} onClick={() => setFocus(true)}>
            <input placeholder="Search in vCodes Documentation" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} disabled={true} />
            <div id="focus-ring" className="absolute right-2 top-0 bottom-0 flex items-center">
                <div className="w-auto w-8 h-8 rounded-lg bg-zinc-500/10 flex items-center justify-center text-gray-400">
                    <p className="text-sm uppercase font-semibold">/</p>
                </div>
            </div>
        </button>

        <div
            className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
            style={{
                pointerEvents: focus ? "all" : "none",
            }}
            ref={modal}
        >
            <div
                className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-filter backdrop-blur-sm flex items-center justify-center cursor-pointer"
                style={{
                    pointerEvents: focus ? "all" : "none",
                    opacity: focus ? 1 : 0,
                    transition: "opacity 0.2s ease-in-out"
                }}
                onClick={() => setFocus(false)}
            />
            <div
                className="w-full max-w-2xl h-full lg:h-3/4"
                style={{
                    pointerEvents: focus ? "all" : "none",
                    transform: focus ? "translateY(0)" : "translateY(-100%)",
                    transition: "all 0.5s cubic-bezier(.71, 0, .33, 1.08) 0ms"
                }}
            >
                <div tabIndex={-1} aria-hidden="true" className="lg:p-4 w-full md:inset-0 h-full overflow-x-hidden overflow-y-auto lg:overflow-hidden">
                    <div className="relative w-full lg:max-w-2xl h-full md:h-auto">
                        <div className="relative bg-dark-1 rounded-lg">
                            <div className="sticky top-0 bg-dark-1 flex justify-between items-start p-4 rounded-t border-b border-dark-4">
                                <div className="flex items-center space-x-2">
                                    <BiSearch className="text-gray-400" size={24} />
                                    <input
                                        placeholder="Search something..."
                                        className="w-full bg-transparent pl-10 absolute h-full left-0 text-gray-400 focus:outline-none"
                                        onChange={(e) => Search(e.target.value)}
                                        value={search}
                                    />
                                </div>
                            </div>

                            <div className="p-2 space-y-2 lg:h-96 overflow-auto">
                                {search.length > 0 ? (
                                    results.length > 0 ? (
                                        results.map((e: any, i: number) => {
                                            return <div key={i}>
                                                <div
                                                    key={i}
                                                    className="flex items-center space-x-4 hover:bg-dark-2 rounded-lg p-4 transition-all duration-200 cursor-pointer"
                                                    onClick={() => {
                                                        setFocus(false);
                                                        setSearch("");
                                                        navigate(`${e.root}`);
                                                    }}
                                                >
                                                    <div className="w-12 h-12 rounded-lg bg-zinc-500/10 flex items-center justify-center text-gray-400">
                                                        <p className="text-xl uppercase font-semibold">{e.sidebar.label[0]}</p>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-gray-400">{e.sidebar.label}</p>
                                                        <p className="text-gray-500">
                                                            Total {e.related.length} results for <span className="text-gray-400">{search}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    ) : (
                                        <div className="flex items-center space-x-4 hover:bg-dark-2 rounded-lg p-4 transition-all duration-200 cursor-pointer">
                                            <div className="w-12 h-12 rounded-lg bg-zinc-500/10 flex items-center justify-center text-gray-400">
                                                <p className="text-xl uppercase font-semibold">?</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-400">No results found</p>
                                                <p className="text-gray-500">
                                                    Try searching for something else
                                                </p>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex items-center justify-center text-center w-full h-full">
                                        <p className="text-gray-400">
                                            Nothing to show here. Try searching something.
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        isFocused?: string;
    }
}