const Separator = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center">
      <div className="flex-grow border-b border-gray-300"></div>
      <p className="mx-4 text-sm font-medium uppercase text-gray-700">
        {title}
      </p>
      <div className="flex-grow border-b border-gray-300"></div>
    </div>
  );
};

export default Separator;
