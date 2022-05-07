export const Alert: React.FC<{ info: string; color: string }> = ({
  info,
  color,
}) => {
  return (
    <div
      className={
        "text-white px-2 py-2 border-0 rounded relative mt-2 mb-2 bg-" +
        color +
        "-500"
      }
    >
      <span className="inline-block align-middle mr-8">{info}</span>
    </div>
  );
};
