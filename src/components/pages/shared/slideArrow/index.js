const SlideArrow = (props) => {
  const { className, style, onClick, Comp, themes } = props;
  return (
    <Comp
      className={className}
      style={{
        ...style,
        display: "block",
        color: themes == "dark" ? "#fff" : "#000",
        fontSize: "8rem",
        borderRadius: "50px",
        // backgroundColor: "green",
      }}
      onClick={onClick}
    />
  );
};

export default SlideArrow;
