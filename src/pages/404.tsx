import * as React from "react";
import LayoutRoot from "../components/Layout.root";
import SEO from "../components/SEO";

export default function Error() {
    return <LayoutRoot mdx={false} sidebarRoot={"false"}>
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-800">404</h1>
            <h1 className="text-3xl font-bold text-white">Page not found</h1>
        </div>
    </LayoutRoot>
}

export const Head = () => <SEO title="404" />