const SlideArrow = (props) => {
  const { className, style, onClick, icon } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#000000" }}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default SlideArrow;
