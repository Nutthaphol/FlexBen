const SlideArrow = (props) => {
  const { className, style, onClick, Comp, themes } = props;
  return (
    <Comp
      className={className}
      style={{
        ...style,
        display: "block",
        color: themes == "dark" ? "#fff" : "#000",
        fontSize: "16rem",
        borderRadius: "50px",
        position: "absolute",
        // backgroundColor: "green",
      }}
      onClick={onClick}
    />
  );
};

export default SlideArrow;
