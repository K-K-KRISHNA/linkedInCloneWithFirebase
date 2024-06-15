// const protectedRoute = (OriginalComponent: React.FC) => {
//   class ProtectedRoute extends React.Component {
//     render() {
//       if (localStorage.getItem("activeUser") === null) {
//         return <Navigate to={"/auth"} />;
//       }
//       return <OriginalComponent />;
//     }
//   }
//   return ProtectedRoute;
// };

// export default protectedRoute;
