// import React from "react";
// import GoogleMapReact from "google-map-react";

// interface MarkerProps {
//   lat: number;
//   lng: number;
//   text: string;
// }

// const AnyReactComponent: React.FC<MarkerProps> = ({ text }) => (
//   <div>{text}</div>
// );

// const ShowMapBranch = () => {
//   const defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33,
//     },
//     zoom: 11,
//   };

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "YOUR_API_KEY" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
//       </GoogleMapReact>
//     </div>
//   );
// };

// export default ShowMapBranch;
