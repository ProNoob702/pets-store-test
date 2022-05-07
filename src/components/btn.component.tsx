interface IProps {
  bgColor: string;
  label: string;
  classname?: string;
}

export const NiceBtn: React.FC<IProps> = ({ bgColor, label, classname }) => {
  return (
    <button
      className={`${classname} text-${bgColor}-500 border border-${bgColor}-500 hover:bg-${bgColor}-500 hover:text-white
         active:bg-${bgColor}-600 font-bold uppercase text-sm px-6 py-3 rounded
          outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 `}
      type="button"
    >
      {label}
    </button>
  );
};
