import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import { Loading } from "../components/Loading";

const Home = lazy(() => import("../pages/Home/Home"));
const Search = lazy(() => import("../pages/Search/Search"));
const DetailMovie = lazy(() => import("../pages/DetailMovie/DetailMovie"));
const Season = lazy(() => import("../pages/Season/Season"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

type RouteType = {
  path: string;
  element: JSX.Element;
};

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/movie/:id",
    element: <DetailMovie mediaType="movie" />,
  },
  {
    path: "/tv/:id",
    element: <DetailMovie mediaType="tv" />,
  },
  {
    path: "/tv/:id/season/:seasonId",
    element: <Season />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <div id="suspense-child" className="flex flex-col min-h-screen">
          <Routes>
            {routes.map((route: RouteType) => {
              const { path, element } = route;

              return (
                <Route
                  key={path}
                  path={path}
                  element={<MainLayout>{element}</MainLayout>}
                />
              );
            })}
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
