import "./propertytype.css";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const { data } = useFetch("/hotels/countByType");
  const navigate = useNavigate();
  const images = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://media.istockphoto.com/id/1351133579/photo/south-shore-of-kauai-hawaii.jpg?b=1&s=170667a&w=0&k=20&c=5XMJFwZEFmGvZetAcYl-L2CDwIg7gSrzPpxEotYS7UI=",
  ];

  return (
    <main className="pContainer">
      <h3>Explore Property Type</h3>

      <div className="pList">
        {data &&
          images.map((img, i) => (
            <div
              className="pListItem"
              key={i}
              onClick={() => {
                navigate(`/${data[i]?.type}`, {
                  state: { type: data[i]?.type },
                });
              }}
            >
              <img loading="lazy" src={img} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>
                  {data[i]?.count} {data[i]?.type}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default PropertyList;
