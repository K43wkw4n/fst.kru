import { Card } from "antd";
import { observer } from "mobx-react-lite";

interface props {
  name: string;
  path: string;
  image: string | null;
  noImage: string;
}

const MyCard = ({ name, path, image, noImage }: props) => {
  return (
    <Card
      hoverable
      cover={
        <center>
          <img
            style={{
              maxWidth: "90%",
              marginTop: 10,
              borderRadius: 15,
            }}
            src={image ? `${path + image}` : noImage}
          />
        </center>
      }
    >
      <div>{name}</div>
    </Card>
  );
};

export default observer(MyCard);

// <li>
//   <a href="" className="card">
//     <img
//       src={image ? `${path + image}` : noImage}
//       className="card__image"
//       alt=""
//     />
//     <div className="card__overlay">
//       <div className="card__header">
//         <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
//           <path />
//         </svg>
//         <img
//           className="card__thumb"
//           src="https://i.imgur.com/7D7I6dI.png"
//           alt=""
//         />
//         <div className="card__header-text">
//           <h3 className="card__title">{name}</h3>
//           <span className="card__status">1 hour ago</span>
//         </div>
//       </div>
//     </div>
//   </a>
// </li>
