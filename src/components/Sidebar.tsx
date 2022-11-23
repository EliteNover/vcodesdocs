import { StaticQuery } from 'gatsby';
import { navigate } from 'gatsby';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import * as React from 'react';

export default function Sidebar({ currentRoot, setIsShowSidebar, isShowSidebar }: { currentRoot: string, setIsShowSidebar?: any, isShowSidebar?: any }) {

    const getClass = (root: string) => {
        if (root === currentRoot) {
            return "text-sm bg-violet-500/10 -ml-4 px-4 py-2 rounded-xl text-violet-500 text-white hover:opacity-70 cursor-pointer transition-all duration-200";
        } else {
            return "text-sm text-white hover:bg-gray-400/5 rounded-xl hover:opacity-70 -ml-4 px-4 py-2 cursor-pointer transition-all duration-200";
        }
    }

    const GoTo = (root: string) => {
        if (root === currentRoot) {
            return "#";
        } else {
            return navigate(root);
        }
    }

    React.useEffect(() => {
        if (isShowSidebar) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "auto";
        }
    }, [isShowSidebar])

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                document.documentElement.style.overflow = "auto";
                setIsShowSidebar(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])


    return <>
        <div className={`w-full lg:w-64 flex-shrink-0 flex flex-col z-[9999999999] lg:z-[50] fixed lg:relative min-h-screen bg-dark-5 transition-all duration-200 lg:translate-x-0 ${isShowSidebar ? "lg:translate-x-0" : "-translate-x-full"}`}>
            <div className="p-6 lg:p-4 py-6 sticky top-0 left-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 hover:opacity-70 cursor-pointer transition-all duration-200" onClick={() => navigate("/")}>
                        <img src="https://cdn.vcodes.xyz/assets/logo.png" alt="logo" className="w-16 h-16" />
                        <h1 className="text-2xl font-bold text-white">vCodes</h1>
                    </div>
                    <div className="lg:hidden">
                        <button className="text-white hover:opacity-70 cursor-pointer transition-all duration-200" onClick={() => setIsShowSidebar(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <StaticQuery
                    query={graphql`query {
                        allMdx {
                            nodes {
                                frontmatter {
                                    root
                                    sidebar {
                                        parent
                                        label
                                        order
                                    }
                                    order
                                }
                            }
                        }
                    }`}
                    render={data => {
                        const nodes = data.allMdx.nodes.map((node: any) => node.frontmatter);
                        let items: any[] = [];

                        for (let i = 0; i < nodes.length; i++) {
                            const node = nodes[i];
                            const parent = node.sidebar.parent;
                            if (!items.find(el => el.parent === parent)) {
                                items.push({
                                    parent: node.sidebar.parent,
                                    parentOrder: node.order,
                                    items: [
                                        {
                                            label: node.sidebar.label,
                                            order: node.sidebar.order,
                                            root: node.root
                                        }
                                    ]
                                });
                            } else {
                                items.find(el => el.parent === parent).items.push({
                                    label: node.sidebar.label,
                                    order: node.sidebar.order,
                                    root: node.root
                                });
                            }
                        }

                        return items.sort((a, b) => a.parentOrder - b.parentOrder).map((item: any, index: number) => {
                            return <div className="mt-6" key={index}>
                                <h1 className="text-xs font-bold text-gray-400 uppercase tracking-wide">{item.parent}</h1>
                                {item.items.sort((a: any, b: any) => a.order - b.order).map((item: any, index: number) => {
                                    return <div className="mt-2 flex flex-col gap-1" key={index} onClick={() => GoTo(item.root)}>
                                        <div className={getClass(item.root) + " transition-all duration-200"}>
                                            {item.label}
                                        </div>
                                    </div>
                                })}
                            </div>
                        })
                    }}
                />
            </div>
        </div>
    </>
}