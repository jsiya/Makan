import AdventureCard from "../components/AdventureCard/AdventureCard";
import LargeCarousel from "../components/LargeCarousel/LargeCarousel";

const HomePage: React.FC = () => {

    return (
      <div>
        <div className="home-top-sec">
          <LargeCarousel/>
        </div>
        <div className="popular-activities-sec">
          <div className="popular-activites-top-sec">
            <div className="popular-activites-top-inner">
              Popular Activities
            </div>
          </div>
          <div className="popular-activites-desc-sec">
            Explore Real Adventure
          </div>
          <div className="popular-activites-card-sec">
            <AdventureCard/>
            <AdventureCard/>
            <AdventureCard/>
            <AdventureCard/>
          </div>
        </div>
      </div>
    );
  }
  
  export default HomePage;
  