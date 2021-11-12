const SlideArrow = (props) => {
  const { className, style, onClick, Comp } = props;
  return (
    <Comp
      className={className}
      style={{
        ...style,
        display: "block",
        color: "#000000",
        fontSize: "2rem",
        borderRadius: "50px",
        // backgroundColor: "green",
      }}
      onClick={onClick}
    />
  );
};

export default SlideArrow;
