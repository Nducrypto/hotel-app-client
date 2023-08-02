import Destinations from "../../components/Destinations/Destinations";
import Features from "../../components/Features/Features";
import Header from "../../components/header/Header";
import PropertyType from "../../components/propertyType/PropertyType";

const Home = () => {
  return (
    <div>
      <Header />
      <Features />
      <Destinations />
      <PropertyType />
    </div>
  );
};

export default Home;
