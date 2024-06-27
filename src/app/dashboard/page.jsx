import dynamic from "next/dynamic";
import { MapProvider } from "@/context/MapContext";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: false,
});

function DashboardPage({ pageProps }) {
  return (
    <MapProvider>
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <Sidebar {...pageProps} />
        <LazyMap {...pageProps} />
      </section>
    </MapProvider>
  );
}
export default DashboardPage;
