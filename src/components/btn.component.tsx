interface IProps {
  bgColor: string;
  textColor?: string;
  label: string;
  classname?: string;
  onClick: (...args: any[]) => any;
}

export const NiceBtn: React.FC<IProps & any> = ({
  bgColor,
  textColor,
  label,
  classname,
  onClick,
}) => {
  const finalTextColor = textColor ? textColor : "black";
  console.log(bgColor, finalTextColor);
  return (
    <button
      className={`hover:bg-${bgColor}-600 ${classname} text-${finalTextColor}-600 border border-${bgColor}-600 hover:text-white
         active:bg-${bgColor}-600 font-bold uppercase text-sm px-6 py-3 rounded
          outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 `}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
