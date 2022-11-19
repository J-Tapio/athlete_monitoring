import ReadinessQ from "./components/Questionnaire/ReadinessQ";
import "./App.css";

//============================================================================//
function Layout({ children }: { children: React.ReactNode }) {
  return <div style={{ maxWidth: "1300px", margin: "0 auto" }}>{children}</div>;
}
//============================================================================//
export default function App() {
  return (
    <Layout>
      <ReadinessQ />
    </Layout>
  );
}
