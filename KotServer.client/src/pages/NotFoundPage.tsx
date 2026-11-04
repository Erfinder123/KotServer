import notFoundImg from "../assets/404.png";

function NotFoundPage() {
    return (
        <img src={notFoundImg}
             alt={"404"}
             style={{
                 display: "block",
                 width: "100%",
                 height: "100%",
                 objectFit: "contain"
             }}
        />
    )
}

export default NotFoundPage;