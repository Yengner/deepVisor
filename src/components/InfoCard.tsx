interface InfoCardProps {
    message: string;
    link: string;
    buttonText: string
}

const InfoCard = ({ message, link, buttonText }: InfoCardProps) => {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">{message}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {buttonText}
        </a>
      </div>
    );
  };
  
  export default InfoCard;
  