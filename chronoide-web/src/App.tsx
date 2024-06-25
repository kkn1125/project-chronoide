import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import About from "./components/templates/About";
import Home from "./components/templates/Home";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ChronoTree } from "./models/ChronoTree";
import { chronoTreeState } from "./recoils/chrono.state";
import { useQuery } from "@tanstack/react-query";
import { chronoRequest } from "./libs/chrono.request";
import { Path } from "./common/variables";
import { useSnackbar } from "notistack";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [chronoTree, setChronoTree] = useRecoilState(chronoTreeState);
  const { refetch } = useQuery({
    queryKey: ["chronos"],
    queryFn: loadChronos,
    enabled: import.meta.env.VITE_RUN_MODE === "server",
  });

  useEffect(() => {
    function handleSaveKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        chronoTree.saveLocalStorage();
        refetch();
        enqueueSnackbar("저장되었습니다.", { variant: "success" });
        // alert("저장되었습니다.");
      } else if (e.key === "l") {
        chronoTree.loadLocalStorage();
        setChronoTree((chronoTree) => {
          const newChronoTree = new ChronoTree();
          newChronoTree.childrens = [...chronoTree.childrens];
          return newChronoTree;
        });
        alert("데이터를 불러왔습니다.");
      }
    }

    window.addEventListener("keydown", handleSaveKey);
    return () => {
      window.removeEventListener("keydown", handleSaveKey);
    };
  }, [chronoTree, enqueueSnackbar, refetch, setChronoTree]);

  /* api 연동 시 사용 */
  async function loadChronos() {
    const { data } = await chronoRequest.get(Path.ApiPath + "/chronos");
    console.log(data);
    return data;
  }

  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
