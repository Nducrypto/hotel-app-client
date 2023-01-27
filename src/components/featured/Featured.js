import "./featured.css";
import useFetch from "../../Hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";

const Featured = () => {
  let navigate = useNavigate();
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=Portharcourt,Enugu,Abuja"
  );

  const featuredInfo = [
    {
      city: "Ph City",
      destination: "Portharcourt",
      count: data[0],
      img: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      city: "Enugu",
      destination: "Enugu",
      count: data[1],
      img: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      city: "Abuja",
      destination: "Abuja",
      count: data[2],
      img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      city: "Lagos",
      destination: "Lagis",
      count: 0,
      img: "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return (
    <div className="p-container">
      <h2 style={{ textAlign: "center" }}>Featured</h2>

      {loading ? (
        <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
          Loading....
        </div>
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          modules={[Pagination, Navigation]}
          loopFillGroupWithBlank={true}
          slidesPerGroup={1}
          loop={true}
          navigation={true}
        >
          {featuredInfo?.map((p, i) => (
            <SwiperSlide key={i}>
              <div
                className="featuredItem"
                onClick={() => {
                  navigate(`/${p.destination}`, {
                    state: { destination: p.destination },
                  });
                }}
              >
                <img src={p.img} alt="" className="featuredImg" />
                <div className="featuredTitles">
                  <div className="cityName">{p.city}</div>
                  <div className="countCity">{p.count} Propertie(s)</div>
                  {/* THIS IS FOR SECOND PATTERN IN THE BACKEND */}
                  {/* <h1>{data[0]?.city}</h1>
              <h2>{data[0]?.count} Properties</h2> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Featured;
