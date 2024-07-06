import dynamic from "next/dynamic";
import { MapProvider } from "@/context/MapContext";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: false,
});

function DashboardPage({ pageProps }) {
  return (
    <Suspense>
      <MapProvider>
        <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
          <ToastContainer />
          <Sidebar {...pageProps} />
          <LazyMap {...pageProps} />
        </section>
      </MapProvider>
    </Suspense>
  );
}
export default DashboardPage;
